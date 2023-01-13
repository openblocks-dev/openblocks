package com.openblocks.api.home;

import static com.openblocks.infra.event.EventType.APPLICATION_MOVE;
import static com.openblocks.sdk.exception.BizError.INVALID_PARAMETER;
import static com.openblocks.sdk.util.ExceptionUtils.ofError;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.openblocks.api.application.view.ApplicationPermissionView;
import com.openblocks.api.framework.view.ResponseView;
import com.openblocks.api.util.BusinessEventPublisher;
import com.openblocks.domain.application.model.ApplicationType;
import com.openblocks.domain.folder.model.Folder;
import com.openblocks.domain.folder.service.FolderService;
import com.openblocks.domain.permission.model.ResourceRole;
import com.openblocks.infra.constant.NewUrl;
import com.openblocks.infra.event.EventType;

import reactor.core.publisher.Mono;

@RestController
@RequestMapping(NewUrl.FOLDER_URL)
public class FolderController {

    @Autowired
    private FolderService folderService;
    @Autowired
    private FolderApiService folderApiService;
    @Autowired
    private BusinessEventPublisher businessEventPublisher;

    @PostMapping
    public Mono<ResponseView<FolderInfoView>> create(@RequestBody Folder folder) {
        return folderApiService.create(folder)
                .delayUntil(folderInfoView -> folderApiService.upsertLastViewTime(folderInfoView.getFolderId()))
                .delayUntil(f -> businessEventPublisher.publishFolderCommonEvent(f.getFolderId(), f.getName(), EventType.FOLDER_CREATE))
                .map(ResponseView::success);
    }

    @DeleteMapping("/{id}")
    public Mono<ResponseView<Void>> delete(@PathVariable("id") String folderId) {
        return folderApiService.delete(folderId)
                .delayUntil(f -> businessEventPublisher.publishFolderCommonEvent(f.getId(), f.getName(), EventType.FOLDER_DELETE))
                .then(Mono.fromSupplier(() -> ResponseView.success(null)));
    }

    /**
     * update name only.
     */
    @PutMapping
    public Mono<ResponseView<FolderInfoView>> update(@RequestBody Folder folder) {
        return folderService.findById(folder.getId())
                .zipWhen(__ -> folderApiService.update(folder))
                .delayUntil(tuple2 -> {
                    Folder old = tuple2.getT1();
                    return businessEventPublisher.publishFolderCommonEvent(folder.getId(), old.getName() + " => " + folder.getName(),
                            EventType.FOLDER_UPDATE);
                })
                .map(tuple2 -> ResponseView.success(tuple2.getT2()));
    }

    /**
     * get all files under folder
     */
    @GetMapping("/elements")
    public Mono<ResponseView<List<?>>> getElements(@RequestParam(value = "id", required = false) String folderId,
            @RequestParam(value = "applicationType", required = false) ApplicationType applicationType) {
        return folderApiService.getElements(folderId, applicationType)
                .collectList()
                .delayUntil(__ -> folderApiService.upsertLastViewTime(folderId))
                .map(ResponseView::success);
    }

    @PutMapping("/move/{id}")
    public Mono<ResponseView<Void>> move(@PathVariable("id") String applicationLikeId,
            @RequestParam(value = "targetFolderId", required = false) String targetFolderId) {
        return folderApiService.move(applicationLikeId, targetFolderId)
                .then(businessEventPublisher.publishApplicationCommonEvent(applicationLikeId, targetFolderId, APPLICATION_MOVE))
                .then(Mono.fromSupplier(() -> ResponseView.success(null)));
    }

    @PutMapping("/{folderId}/permissions/{permissionId}")
    public Mono<ResponseView<Void>> updatePermission(@PathVariable String folderId,
            @PathVariable String permissionId,
            @RequestBody UpdatePermissionRequest updatePermissionRequest) {
        ResourceRole role = ResourceRole.fromValue(updatePermissionRequest.role());
        if (role == null) {
            return ofError(INVALID_PARAMETER, "INVALID_PARAMETER", updatePermissionRequest);
        }

        return folderApiService.updatePermission(folderId, permissionId, role)
                .then(Mono.fromSupplier(() -> ResponseView.success(null)));
    }

    @DeleteMapping("/{folderId}/permissions/{permissionId}")
    public Mono<ResponseView<Void>> removePermission(
            @PathVariable String folderId,
            @PathVariable String permissionId) {

        return folderApiService.removePermission(folderId, permissionId)
                .then(Mono.fromSupplier(() -> ResponseView.success(null)));
    }

    @PostMapping("/{folderId}/permissions")
    public Mono<ResponseView<Void>> grantPermission(
            @PathVariable String folderId,
            @RequestBody BatchAddPermissionRequest request) {
        ResourceRole role = ResourceRole.fromValue(request.role());
        if (role == null) {
            return ofError(INVALID_PARAMETER, "INVALID_PARAMETER", request.role());
        }
        return folderApiService.grantPermission(folderId, request.userIds(), request.groupIds(), role)
                .then(Mono.fromSupplier(() -> ResponseView.success(null)));
    }

    @GetMapping("/{folderId}/permissions")
    public Mono<ResponseView<ApplicationPermissionView>> getApplicationPermissions(@PathVariable String folderId) {
        return folderApiService.getPermissions(folderId)
                .map(ResponseView::success);
    }

    private record BatchAddPermissionRequest(String role, Set<String> userIds, Set<String> groupIds) {
    }

    private record UpdatePermissionRequest(String role) {
    }
}
