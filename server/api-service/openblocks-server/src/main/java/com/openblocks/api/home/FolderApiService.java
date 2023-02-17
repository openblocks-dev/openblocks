package com.openblocks.api.home;

import static com.openblocks.infra.util.MonoUtils.emptyIfNull;
import static com.openblocks.sdk.exception.BizError.FOLDER_OPERATE_NO_PERMISSION;
import static com.openblocks.sdk.exception.BizError.FOLDER_NOT_EXIST;
import static com.openblocks.sdk.exception.BizError.ILLEGAL_FOLDER_PERMISSION_ID;
import static com.openblocks.sdk.util.ExceptionUtils.ofError;
import static org.apache.commons.collections4.CollectionUtils.isNotEmpty;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.function.ToLongFunction;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openblocks.api.application.view.ApplicationInfoView;
import com.openblocks.api.application.view.ApplicationPermissionView;
import com.openblocks.api.permission.PermissionHelper;
import com.openblocks.api.permission.view.PermissionItemView;
import com.openblocks.api.usermanagement.OrgDevChecker;
import com.openblocks.domain.application.model.ApplicationStatus;
import com.openblocks.domain.application.model.ApplicationType;
import com.openblocks.domain.folder.model.Folder;
import com.openblocks.domain.folder.model.FolderElement;
import com.openblocks.domain.folder.service.ElementNode;
import com.openblocks.domain.folder.service.FolderElementRelationService;
import com.openblocks.domain.folder.service.FolderNode;
import com.openblocks.domain.folder.service.FolderService;
import com.openblocks.domain.folder.service.Node;
import com.openblocks.domain.folder.service.Tree;
import com.openblocks.domain.group.service.GroupService;
import com.openblocks.domain.interaction.UserFolderInteraction;
import com.openblocks.domain.interaction.UserFolderInteractionService;
import com.openblocks.domain.organization.model.OrgMember;
import com.openblocks.domain.organization.model.Organization;
import com.openblocks.domain.organization.service.OrganizationService;
import com.openblocks.domain.permission.model.ResourceAction;
import com.openblocks.domain.permission.model.ResourcePermission;
import com.openblocks.domain.permission.model.ResourceRole;
import com.openblocks.domain.permission.model.ResourceType;
import com.openblocks.domain.permission.service.ResourcePermissionService;
import com.openblocks.domain.user.model.User;
import com.openblocks.domain.user.service.UserService;
import com.openblocks.sdk.exception.BizError;
import com.openblocks.sdk.exception.BizException;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class FolderApiService {

    private static final Comparator<Node<ApplicationInfoView, FolderInfoView>> DEFAULT_COMPARATOR =
            // compare by last view time reversed.
            Comparator.comparingLong((ToLongFunction<Node<ApplicationInfoView, FolderInfoView>>) node -> {
                        if (node instanceof ElementNode<ApplicationInfoView, FolderInfoView> elementNode) {
                            return elementNode.getSelf().getLastViewTime();
                        }
                        return ((FolderNode<ApplicationInfoView, FolderInfoView>) node).getSelf().getLastViewTime();
                    })
                    .reversed()
                    // compare by name.
                    .thenComparing(node -> {
                        if (node instanceof ElementNode<ApplicationInfoView, FolderInfoView> elementNode) {
                            return elementNode.getSelf().getName();
                        }
                        return ((FolderNode<ApplicationInfoView, FolderInfoView>) node).getSelf().getName();
                    });

    @Autowired
    private FolderService folderService;
    @Autowired
    private SessionUserService sessionUserService;
    @Autowired
    private OrgDevChecker orgDevChecker;
    @Autowired
    private UserHomeApiService userHomeApiService;
    @Autowired
    private FolderElementRelationService folderElementRelationService;
    @Autowired
    private ResourcePermissionService resourcePermissionService;
    @Autowired
    private PermissionHelper permissionHelper;
    @Autowired
    private GroupService groupService;
    @Autowired
    private UserService userService;
    @Autowired
    private OrganizationService organizationService;
    @Autowired
    private UserFolderInteractionService userFolderInteractionService;

    public Mono<FolderInfoView> create(Folder folder) {
        if (StringUtils.isBlank(folder.getName())) {
            return Mono.error(new BizException(BizError.INVALID_PARAMETER, "FOLDER_NAME_EMPTY"));
        }
        return orgDevChecker.checkCurrentOrgDev()
                .then(sessionUserService.getVisitorOrgMemberCache())
                .delayUntil(orgMember -> {
                    if (StringUtils.isBlank(folder.getParentFolderId())) {
                        return Mono.empty();
                    }
                    return checkFolderExist(folder.getParentFolderId())
                            .flatMap(parent -> checkFolderCurrentOrg(parent, orgMember.getOrgId()));
                })
                .delayUntil(orgMember -> checkFolderNameUnique(folder.getParentFolderId(), folder.getName(), orgMember.getOrgId()))
                .flatMap(orgMember -> {
                    folder.setOrganizationId(orgMember.getOrgId());
                    folder.setCreatedBy(orgMember.getUserId());
                    return folderService.create(folder);
                })
                .flatMap(f -> buildFolderInfoView(f, true, true));
    }

    public Mono<Folder> checkFolderExist(String folderId) {
        return folderService.findById(folderId)
                .switchIfEmpty(Mono.defer(() -> Mono.error(new BizException(FOLDER_NOT_EXIST, "FOLDER_NOT_EXIST", folderId))));
    }

    public Mono<Void> checkFolderCurrentOrg(Folder folder, String currentOrgId) {
        if (currentOrgId.equals(folder.getOrganizationId())) {
            return Mono.empty();
        }
        return Mono.error(new BizException(FOLDER_NOT_EXIST, "FOLDER_NOT_EXIST", folder.getId()));
    }

    private Mono<Void> checkFolderNameUnique(@Nullable String parentFolderId, String name, String orgId) {
        return folderService.findByOrganizationId(orgId)
                .filter(folder -> StringUtils.equals(parentFolderId, folder.getParentFolderId()))
                .map(Folder::getName)
                .collectList()
                .flatMap(list -> {
                    if (list.contains(name)) {
                        return Mono.error(new BizException(BizError.FOLDER_NAME_CONFLICT, "FOLDER_NAME_CONFLICT"));
                    }
                    return Mono.empty();
                });
    }

    /**
     * only org admin and folder creator can delete a folder, when folder is deleted,
     * all sub folders will be deleted, all sub files will be moved to root folder
     */
    public Mono<Folder> delete(@Nonnull String folderId) {
        return checkManagePermission(folderId)
                .flatMap(orgMember -> buildFolderTree(orgMember.getOrgId()))
                .flatMap(tree -> {
                    FolderNode<Object, Folder> folderNode = tree.get(folderId);
                    if (folderNode == null) {
                        return Mono.error(new BizException(FOLDER_NOT_EXIST, "FOLDER_NOT_EXIST", folderId));
                    }
                    @SuppressWarnings("ConstantConditions")
                    List<String> folderIds = folderNode.getAllFolderChildren().stream().map(Folder::getId).toList();
                    List<String> all = new ArrayList<>(folderIds);
                    all.add(folderId);

                    return folderService.deleteAllById(all)
                            .then(removePermissions(folderId))
                            .then(folderElementRelationService.deleteByFolderIds(all))
                            .thenReturn(folderNode.getSelf());
                });
    }

    private Mono<Void> removePermissions(String folderId) {
        return resourcePermissionService.getByResourceTypeAndResourceId(ResourceType.FOLDER, folderId)
                .flatMapIterable(Function.identity())
                .flatMap(resourcePermission -> resourcePermissionService.removeById(resourcePermission.getId()))
                .then();
    }

    public Mono<FolderInfoView> update(Folder folder) {
        Folder newFolder = new Folder();
        newFolder.setName(folder.getName());
        return checkManagePermission(folder.getId())
                .then(folderService.updateById(folder.getId(), newFolder))
                .then(folderService.findById(folder.getId()))
                .flatMap(f -> buildFolderInfoView(f, true, true));
    }

    /**
     * @param targetFolderId null means root folder
     */
    public Mono<Void> move(String applicationLikeId, @Nullable String targetFolderId) {
        return sessionUserService.getVisitorId()
                // check permissions
                .delayUntil(userId -> resourcePermissionService.checkResourcePermissionWithError(userId, applicationLikeId,
                        ResourceAction.MANAGE_APPLICATIONS))
                // remove old relations
                .then(folderElementRelationService.deleteByElementId(applicationLikeId))
                .flatMap(b -> {
                    if (StringUtils.isBlank(targetFolderId)) {
                        return Mono.empty();
                    }
                    return folderElementRelationService.create(targetFolderId, applicationLikeId);
                })
                .then();
    }

    public Mono<Void> upsertLastViewTime(@Nullable String folderId) {
        if (StringUtils.isBlank(folderId)) {
            return Mono.empty();
        }
        return sessionUserService.getVisitorId()
                .flatMap(userId -> userFolderInteractionService.upsert(userId, folderId, Instant.now()));
    }

    /**
     * get the sub elements of a folder or root.
     *
     * @return flux of {@link ApplicationInfoView} or {@link FolderInfoView}
     */
    public Flux<?> getElements(@Nullable String folderId, @Nullable ApplicationType applicationType) {
        return buildApplicationInfoViewTree(applicationType)
                .flatMap(tree -> {
                    FolderNode<ApplicationInfoView, FolderInfoView> folderNode = tree.get(folderId);
                    if (folderNode == null) {
                        return Mono.error(new BizException(FOLDER_NOT_EXIST, "FOLDER_NOT_EXIST", folderId));
                    }
                    return Mono.just(folderNode);
                })
                .zipWith(Mono.zip(sessionUserService.getVisitorOrgMemberCache(), orgDevChecker.isCurrentOrgDev()))
                .doOnNext(tuple -> {
                    FolderNode<ApplicationInfoView, FolderInfoView> node = tuple.getT1();
                    OrgMember orgMember = tuple.getT2().getT1();
                    boolean devOrAdmin = tuple.getT2().getT2();
                    // father folder's visibility depends on child nodes
                    node.postOrderIterate(n -> {
                        if (n instanceof FolderNode<ApplicationInfoView, FolderInfoView> folderNode) {
                            FolderInfoView folderInfoView = folderNode.getSelf();
                            if (folderInfoView == null) {
                                return;
                            }
                            folderInfoView.setManageable(orgMember.isAdmin() || orgMember.getUserId().equals(folderInfoView.getCreateBy()));

                            List<FolderInfoView> folderInfoViews = folderNode.getFolderChildren().stream().filter(FolderInfoView::isVisible).toList();
                            folderInfoView.setSubFolders(folderInfoViews);
                            folderInfoView.setSubApplications(folderNode.getElementChildren());
                            folderInfoView.setVisible(devOrAdmin || isNotEmpty(folderInfoViews) || isNotEmpty(folderInfoView.getSubApplications()));
                        }
                    });
                })
                .flatMapIterable(tuple -> tuple.getT1().getChildren())
                .map(node -> {
                    if (node instanceof ElementNode<ApplicationInfoView, FolderInfoView> elementNode) {
                        return elementNode.getSelf();
                    }
                    return ((FolderNode<ApplicationInfoView, FolderInfoView>) node).getSelf();
                });
    }

    private Mono<Tree<Object, Folder>> buildFolderTree(String orgId) {
        return folderService.findByOrganizationId(orgId)
                .collectList()
                .map(folders -> new Tree<>(folders, Folder::getId, Folder::getParentFolderId, Collections.emptyList(), null, null));
    }

    private Mono<Tree<ApplicationInfoView, FolderInfoView>> buildApplicationInfoViewTree(@Nullable ApplicationType applicationType) {

        Mono<OrgMember> orgMemberMono = sessionUserService.getVisitorOrgMemberCache()
                .cache();

        Flux<ApplicationInfoView> applicationInfoViewFlux =
                userHomeApiService.getAllAuthorisedApplications4CurrentOrgMember(applicationType, ApplicationStatus.NORMAL, false)
                        .cache();

        Mono<Map<String, String>> application2FolderMapMono = applicationInfoViewFlux
                .map(ApplicationInfoView::getApplicationId)
                .collectList()
                .flatMapMany(applicationIds -> folderElementRelationService.getByElementIds(applicationIds))
                .collectMap(FolderElement::elementId, FolderElement::folderId);

        Flux<Folder> folderFlux = orgMemberMono.flatMapMany(orgMember -> folderService.findByOrganizationId(orgMember.getOrgId()))
                .cache();

        Mono<Map<String, Instant>> folderId2LastViewTimeMapMono = orgMemberMono
                .flatMapMany(orgMember -> userFolderInteractionService.findByUserId(orgMember.getUserId()))
                .collectMap(UserFolderInteraction::folderId, UserFolderInteraction::lastViewTime)
                .cache();

        Mono<Map<String, User>> userMapMono = folderFlux
                .flatMap(folder -> emptyIfNull(folder.getCreatedBy()))
                .collectList()
                .flatMap(list -> userService.getByIds(list))
                .cache();

        Flux<FolderInfoView> folderInfoViewFlux = folderFlux
                .flatMap(folder -> Mono.zip(orgMemberMono, userMapMono, folderId2LastViewTimeMapMono)
                        .map(tuple -> {
                            OrgMember orgMember = tuple.getT1();
                            Map<String, User> userMap = tuple.getT2();
                            Map<String, Instant> folderId2LastViewTimeMap = tuple.getT3();
                            User creator = userMap.get(folder.getCreatedBy());
                            return FolderInfoView.builder()
                                    .orgId(orgMember.getOrgId())
                                    .folderId(folder.getId())
                                    .parentFolderId(folder.getParentFolderId())
                                    .name(folder.getName())
                                    .createAt(folder.getCreatedAt().toEpochMilli())
                                    .createBy(creator == null ? null : creator.getName())
                                    .createTime(folder.getCreatedAt())
                                    .lastViewTime(folderId2LastViewTimeMap.get(folder.getId()))
                                    .build();
                        }));

        return Mono.zip(applicationInfoViewFlux.collectList(),
                        application2FolderMapMono,
                        folderInfoViewFlux.collectList())
                .map(tuple -> {
                    List<ApplicationInfoView> applicationInfoViews = tuple.getT1();
                    Map<String, String> application2FolderMap = tuple.getT2();
                    List<FolderInfoView> folderInfoViews = tuple.getT3();
                    return new Tree<>(folderInfoViews,
                            FolderInfoView::getFolderId,
                            FolderInfoView::getParentFolderId,
                            applicationInfoViews,
                            application -> application2FolderMap.get(application.getApplicationId()),
                            DEFAULT_COMPARATOR);
                });
    }

    /**
     * only org admin and folder creator has manage permissions
     */
    private Mono<OrgMember> checkManagePermission(String folderId) {
        return sessionUserService.getVisitorOrgMemberCache()
                .flatMap(orgMember -> {
                    if (orgMember.isAdmin()) {
                        return Mono.just(orgMember);
                    }
                    return isCreator(folderId)
                            .flatMap(isCreator -> isCreator ? Mono.just(orgMember)
                                                            : ofError(FOLDER_OPERATE_NO_PERMISSION, "FOLDER_OPERATE_NO_PERMISSION"));
                });
    }

    private Mono<Boolean> isCreator(String folderId) {
        return folderService.findById(folderId)
                .flatMap(folder -> sessionUserService.getVisitorId().map(s -> s.equals(folder.getCreatedBy())));
    }

    public Mono<Void> grantPermission(String folderId, Set<String> userIds, Set<String> groupIds, ResourceRole role) {
        if (CollectionUtils.isEmpty(userIds) && CollectionUtils.isEmpty(groupIds)) {
            return Mono.empty();
        }
        return Mono.from(checkManagePermission(folderId))
                .then(checkFolderExist(folderId))
                .then(Mono.defer(() -> resourcePermissionService.insertBatchPermission(ResourceType.FOLDER, folderId, userIds, groupIds, role)))
                .then();
    }

    public Mono<Void> updatePermission(String folderId, String permissionId, ResourceRole role) {
        return Mono.from(checkManagePermission(folderId))
                .then(checkPermissionResource(permissionId, folderId))
                .then(resourcePermissionService.updateRoleById(permissionId, role))
                .then();
    }

    public Mono<Void> removePermission(String folderId, String permissionId) {
        return Mono.from(checkManagePermission(folderId))
                .then(checkPermissionResource(permissionId, folderId))
                .then(resourcePermissionService.removeById(permissionId))
                .then();
    }

    private Mono<Void> checkPermissionResource(String permissionId, String folderId) {
        return resourcePermissionService.getById(permissionId)
                .switchIfEmpty(Mono.defer(() -> Mono.error(new BizException(ILLEGAL_FOLDER_PERMISSION_ID, "PERMISSION_NOT_EXIST"))))
                .flatMap(resourcePermission -> {
                    if (!folderId.equals(resourcePermission.getResourceId())) {
                        return Mono.error(new BizException(ILLEGAL_FOLDER_PERMISSION_ID, "NO_PERMISSION_TO_OPERATE_FOLDER"));
                    }
                    return Mono.empty();
                })
                .then();
    }

    public Mono<ApplicationPermissionView> getPermissions(String folderId) {

        Mono<List<ResourcePermission>> folderPermissions =
                resourcePermissionService.getByResourceTypeAndResourceId(ResourceType.FOLDER, folderId).cache();

        Mono<List<PermissionItemView>> groupPermissionPairsMono = folderPermissions
                .flatMap(permissionHelper::getGroupPermissions);

        Mono<List<PermissionItemView>> userPermissionPairsMono = folderPermissions
                .flatMap(permissionHelper::getUserPermissions);

        return folderService.findById(folderId)
                .flatMap(folder -> {
                    Mono<Organization> orgMono = organizationService.getById(folder.getOrganizationId());
                    return Mono.zip(groupPermissionPairsMono, userPermissionPairsMono, orgMono)
                            .map(tuple -> {
                                List<PermissionItemView> groupPermissionPairs = tuple.getT1();
                                List<PermissionItemView> userPermissionPairs = tuple.getT2();
                                Organization organization = tuple.getT3();
                                return ApplicationPermissionView.builder()
                                        .groupPermissions(groupPermissionPairs)
                                        .userPermissions(userPermissionPairs)
                                        .creatorId(folder.getCreatedBy())
                                        .orgName(organization.getName())
                                        .build();
                            });
                });
    }

    public Mono<FolderInfoView> buildFolderInfoView(Folder folder, boolean visible, boolean manageable) {
        return userService.findById(folder.getCreatedBy())
                .map(user -> FolderInfoView.builder()
                        .orgId(folder.getOrganizationId())
                        .folderId(folder.getId())
                        .parentFolderId(folder.getParentFolderId())
                        .name(folder.getName())
                        .createAt(folder.getCreatedAt() == null ? 0 : folder.getCreatedAt().toEpochMilli())
                        .createBy(user.getName())
                        .createTime(folder.getCreatedAt())
                        .isVisible(visible)
                        .isManageable(manageable)
                        .build());
    }
}
