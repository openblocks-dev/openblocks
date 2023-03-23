package com.openblocks.api.home;

import static com.openblocks.domain.permission.model.ResourceAction.READ_APPLICATIONS;
import static com.openblocks.infra.util.MonoUtils.emptyIfNull;
import static com.openblocks.sdk.util.StreamUtils.collectList;
import static java.util.Objects.isNull;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.annotation.Nullable;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import com.openblocks.api.application.view.ApplicationInfoView;
import com.openblocks.api.application.view.ApplicationInfoView.ApplicationInfoViewBuilder;
import com.openblocks.api.usermanagement.OrgDevChecker;
import com.openblocks.api.usermanagement.view.OrgAndVisitorRoleView;
import com.openblocks.api.usermanagement.view.UserProfileView;
import com.openblocks.domain.application.model.Application;
import com.openblocks.domain.application.model.ApplicationStatus;
import com.openblocks.domain.application.model.ApplicationType;
import com.openblocks.domain.application.service.ApplicationService;
import com.openblocks.domain.interaction.UserApplicationInteraction;
import com.openblocks.domain.interaction.UserApplicationInteractionService;
import com.openblocks.domain.organization.model.OrgMember;
import com.openblocks.domain.organization.model.Organization;
import com.openblocks.domain.organization.service.OrgMemberService;
import com.openblocks.domain.organization.service.OrganizationService;
import com.openblocks.domain.permission.model.ResourcePermission;
import com.openblocks.domain.permission.model.ResourceRole;
import com.openblocks.domain.permission.service.ResourcePermissionService;
import com.openblocks.domain.user.model.User;
import com.openblocks.domain.user.model.UserStatus;
import com.openblocks.domain.user.service.UserService;
import com.openblocks.domain.user.service.UserStatusService;
import com.openblocks.infra.util.NetworkUtils;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


@Component
public class UserHomeApiServiceImpl implements UserHomeApiService {


    @Autowired
    private SessionUserService sessionUserService;

    @Autowired
    private OrganizationService organizationService;

    @Autowired
    private OrgMemberService orgMemberService;

    @Autowired
    private ApplicationService applicationService;

    @Autowired
    private ResourcePermissionService resourcePermissionService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserStatusService userStatusService;

    @Autowired
    private OrgDevChecker orgDevChecker;
    @Autowired
    private FolderApiService folderApiService;
    @Autowired
    private UserApplicationInteractionService userApplicationInteractionService;

    @Override
    public Mono<UserProfileView> buildUserProfileView(User user, ServerWebExchange exchange) {

        if (user.isAnonymous()) {
            return Mono.just(UserProfileView.builder()
                    .isAnonymous(true)
                    .username(user.getName())
                    .ip(NetworkUtils.getRemoteIp(exchange))
                    .build()
            );
        }

        Mono<UserStatus> userStatusMono = userStatusService.findByUserId(user.getId());

        return Mono.zip(userStatusMono, orgMemberService.getUserOrgMemberInfo(user.getId()))
                .flatMap(tuple -> {
                    UserStatus userStatus = tuple.getT1();
                    OrgMember currentOrgMember = tuple.getT2().currentOrgMember();
                    List<OrgMember> orgMembers = tuple.getT2().orgMembers();
                    List<String> orgIds = collectList(orgMembers, OrgMember::getOrgId);
                    Mono<List<OrgAndVisitorRoleView>> orgAndRolesMono = organizationService.getByIds(orgIds)
                            .collectMap(Organization::getId, Function.identity())
                            .map(map -> orgMembers.stream()
                                    .map(member -> {
                                        String orgId = member.getOrgId();
                                        Organization organization = map.get(orgId);
                                        if (organization == null) {
                                            return null;
                                        }
                                        return new OrgAndVisitorRoleView(organization, member.getRole().getValue());
                                    })
                                    .filter(Objects::nonNull)
                                    .collect(Collectors.toList()));

                    String currentOrgId = currentOrgMember.getOrgId();

                    return Mono.zip(orgAndRolesMono, orgDevChecker.isCurrentOrgDev())
                            .map(tuple2 -> {
                                List<OrgAndVisitorRoleView> orgAndRoles = tuple2.getT1();
                                boolean isOrgDev = tuple2.getT2();
                                return UserProfileView.builder()
                                        .id(user.getId())
                                        .username(user.getName())
                                        .isAnonymous(user.isAnonymous())
                                        .avatarUrl(user.getAvatarUrl())
                                        .avatar(user.getAvatar())
                                        .connections(user.getConnections())
                                        .currentOrgId(currentOrgId)
                                        .orgAndRoles(orgAndRoles)
                                        .hasPassword(StringUtils.isNotBlank(user.getPassword()))
                                        .hasSetNickname(user.isHasSetNickname())
                                        .userStatus(userStatus.getStatusMap())
                                        .isOrgDev(isOrgDev)
                                        .createdTimeMs(user.getCreatedAt().toEpochMilli())
                                        .ip(NetworkUtils.getRemoteIp(exchange))
                                        .build();
                            });
                });
    }

    @Override
    public Mono<Boolean> markNewUserGuidanceShown(String userId) {
        return userStatusService.markNewUserGuidanceShown(userId);
    }

    public Mono<UserHomepageView> getUserHomePageView(ApplicationType applicationType) {

        Mono<User> userMono = sessionUserService.getVisitor();

        Mono<String> currentOrgIdMono = sessionUserService.getVisitorOrgMemberCache()
                .map(OrgMember::getOrgId);

        return Mono.zip(userMono, currentOrgIdMono)
                .flatMap(tuple -> {
                    User user = tuple.getT1();
                    String currentOrgId = tuple.getT2();

                    UserHomepageView userHomepageVO = new UserHomepageView();
                    userHomepageVO.setUser(user);

                    if (StringUtils.isBlank(currentOrgId)) {
                        return Mono.just(userHomepageVO);
                    }

                    return organizationService.getById(currentOrgId)
                            .zipWith(folderApiService.getElements(null, applicationType).collectList())
                            .map(tuple2 -> {
                                Organization organization = tuple2.getT1();
                                List<?> list = tuple2.getT2();
                                List<ApplicationInfoView> applicationInfoViews = list.stream()
                                        .map(o -> {
                                            if (o instanceof ApplicationInfoView applicationInfoView) {
                                                return applicationInfoView;
                                            }
                                            return null;
                                        })
                                        .filter(Objects::nonNull)
                                        .toList();
                                List<FolderInfoView> folderInfoViews = list.stream()
                                        .map(o -> {
                                            if (o instanceof FolderInfoView folderInfoView) {
                                                return folderInfoView;
                                            }
                                            return null;
                                        })
                                        .filter(Objects::nonNull)
                                        .toList();
                                userHomepageVO.setOrganization(organization);
                                userHomepageVO.setHomeApplicationViews(applicationInfoViews);
                                userHomepageVO.setFolderInfoViews(folderInfoViews);
                                return userHomepageVO;
                            });
                });
    }

    @Override
    public Flux<ApplicationInfoView> getAllAuthorisedApplications4CurrentOrgMember(@Nullable ApplicationType applicationType,
            @Nullable ApplicationStatus applicationStatus, boolean withContainerSize) {

        return sessionUserService.getVisitorOrgMemberCache()
                .flatMapMany(orgMember -> {
                    String visitorId = orgMember.getUserId();
                    String currentOrgId = orgMember.getOrgId();
                    // application flux
                    Flux<Application> applicationFlux = Flux.defer(() -> {
                                if (withContainerSize) {
                                    return applicationService.findByOrganizationIdWithDsl(currentOrgId);
                                }
                                return applicationService.findByOrganizationIdWithoutDsl(currentOrgId);
                            })
                            .filter(application -> isNull(applicationType) || application.getApplicationType() == applicationType.getValue())
                            .filter(application -> isNull(applicationStatus) || application.getApplicationStatus() == applicationStatus)
                            .cache()
                            .collectList()
                            .flatMapIterable(Function.identity());

                    // last view time
                    Mono<Map<String, Instant>> applicationLastViewTimeMapMono = userApplicationInteractionService.findByUserId(visitorId)
                            .collectMap(UserApplicationInteraction::applicationId, UserApplicationInteraction::lastViewTime)
                            .cache();

                    Mono<Map<String, ResourcePermission>> resourcePermissionMapMono = applicationFlux
                            .mapNotNull(Application::getId)
                            .collectList()
                            .flatMap(applicationIds -> resourcePermissionService.getMaxMatchingPermission(visitorId, applicationIds,
                                    READ_APPLICATIONS))
                            .cache();

                    // user map
                    Mono<Map<String, User>> userMapMono = applicationFlux
                            .flatMap(application -> emptyIfNull(application.getCreatedBy()))
                            .collectList()
                            .flatMap(creatorIds -> userService.getByIds(creatorIds))
                            .cache();

                    return applicationFlux
                            .flatMap(application -> Mono.zip(Mono.just(application), resourcePermissionMapMono, userMapMono,
                                    applicationLastViewTimeMapMono))
                            .filter(tuple -> {
                                // filter by permission
                                Application application = tuple.getT1();
                                Map<String, ResourcePermission> resourcePermissionMap = tuple.getT2();
                                return resourcePermissionMap.containsKey(application.getId());
                            })
                            .map(tuple -> {
                                // build view
                                Application application = tuple.getT1();
                                Map<String, ResourcePermission> resourcePermissionMap = tuple.getT2();
                                Map<String, User> userMap = tuple.getT3();
                                Map<String, Instant> applicationLastViewTimeMap = tuple.getT4();
                                ResourceRole resourceRole = resourcePermissionMap.get(application.getId()).getResourceRole();
                                return buildView(application, resourceRole, userMap, applicationLastViewTimeMap.get(application.getId()),
                                        withContainerSize);
                            });
                });
    }

    private ApplicationInfoView buildView(Application application, ResourceRole maxRole, Map<String, User> userMap, @Nullable Instant lastViewTime,
            boolean withContainerSize) {
        ApplicationInfoViewBuilder applicationInfoViewBuilder = ApplicationInfoView.builder()
                .applicationId(application.getId())
                .orgId(application.getOrganizationId())
                .name(application.getName())
                .createBy(Optional.ofNullable(userMap.get(application.getCreatedBy()))
                        .map(User::getName)
                        .orElse(""))
                .createAt(application.getCreatedAt().toEpochMilli())
                .role(maxRole.getValue())
                .applicationType(application.getApplicationType())
                .applicationStatus(application.getApplicationStatus())
                .lastModifyTime(application.getUpdatedAt())
                .lastViewTime(lastViewTime)
                .publicToAll(application.isPublicToAll());
        if (withContainerSize) {
            return applicationInfoViewBuilder
                    .containerSize(application.getLiveContainerSize())
                    .build();
        }
        return applicationInfoViewBuilder.build();
    }

}
