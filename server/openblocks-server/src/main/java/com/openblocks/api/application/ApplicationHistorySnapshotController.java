package com.openblocks.api.application;

import static com.openblocks.api.util.ViewBuilder.multiBuild;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.common.collect.ImmutableMap;
import com.openblocks.api.application.view.HistorySnapshotDslView;
import com.openblocks.api.framework.view.ResponseView;
import com.openblocks.api.home.SessionUserService;
import com.openblocks.api.util.Pagination;
import com.openblocks.domain.application.model.Application;
import com.openblocks.domain.application.model.ApplicationHistorySnapshot;
import com.openblocks.domain.application.service.ApplicationHistorySnapshotService;
import com.openblocks.domain.application.service.ApplicationService;
import com.openblocks.domain.permission.model.ResourceAction;
import com.openblocks.domain.permission.service.ResourcePermissionService;
import com.openblocks.domain.user.service.UserService;
import com.openblocks.infra.constant.NewUrl;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Slf4j
@RestController
@RequestMapping(value = {NewUrl.APPLICATION_HISTORY_URL})
public class ApplicationHistorySnapshotController {

    @Autowired
    private ResourcePermissionService resourcePermissionService;

    @Autowired
    private ApplicationHistorySnapshotService applicationHistorySnapshotService;

    @Autowired
    private SessionUserService sessionUserService;

    @Autowired
    private UserService userService;

    @Autowired
    private ApplicationService applicationService;

    @PostMapping
    public Mono<ResponseView<Boolean>> create(@RequestBody ApplicationHistorySnapshotRequest request) {
        return sessionUserService.getVisitorId()
                .delayUntil(visitor -> resourcePermissionService.checkResourcePermissionWithError(visitor, request.applicationId(),
                        ResourceAction.EDIT_APPLICATIONS))
                .flatMap(visitorId -> applicationHistorySnapshotService.createHistorySnapshot(request.applicationId(),
                        request.dsl(),
                        request.context(),
                        visitorId)
                )
                .map(ResponseView::success);
    }

    @GetMapping("/{applicationId}")
    public Mono<ResponseView<Map<String, Object>>> listAllHistorySnapshotBriefInfo(@PathVariable String applicationId,
            @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {

        Pagination pagination = Pagination.of(page, size).check();

        return sessionUserService.getVisitorId()
                .delayUntil(visitor -> resourcePermissionService.checkResourcePermissionWithError(visitor, applicationId,
                        ResourceAction.EDIT_APPLICATIONS))
                .flatMap(__ -> applicationHistorySnapshotService.listAllHistorySnapshotBriefInfo(applicationId,
                        pagination.toPageRequest()))
                .flatMap(snapshotList -> {
                    Mono<List<ApplicationHistorySnapshotBriefInfo>> snapshotBriefInfoList = multiBuild(snapshotList,
                            ApplicationHistorySnapshot::getCreatedBy,
                            userService::getByIds,
                            (applicationHistorySnapshot, user) -> new ApplicationHistorySnapshotBriefInfo(
                                    applicationHistorySnapshot.getId(),
                                    applicationHistorySnapshot.getContext(),
                                    applicationHistorySnapshot.getCreatedBy(),
                                    user.getName(),
                                    user.getAvatarUrl(),
                                    applicationHistorySnapshot.getCreatedAt().toEpochMilli()
                            )
                    );

                    Mono<Long> applicationHistorySnapshotCount = applicationHistorySnapshotService.countByApplicationId(applicationId);

                    return Mono.zip(snapshotBriefInfoList, applicationHistorySnapshotCount)
                            .map(tuple -> ImmutableMap.of("list", tuple.getT1(), "count", tuple.getT2()));
                })
                .map(ResponseView::success);
    }

    @GetMapping("/{applicationId}/{snapshotId}")
    public Mono<ResponseView<HistorySnapshotDslView>> getHistorySnapshotDsl(@PathVariable String applicationId,
            @PathVariable String snapshotId) {
        return sessionUserService.getVisitorId()
                .delayUntil(visitor -> resourcePermissionService.checkResourcePermissionWithError(visitor, applicationId,
                        ResourceAction.EDIT_APPLICATIONS))
                .flatMap(__ -> applicationHistorySnapshotService.getHistorySnapshotDetail(snapshotId))
                .map(ApplicationHistorySnapshot::getDsl)
                .zipWhen(dsl -> applicationService.getAllDependentModulesFromDsl(dsl))
                .map(tuple -> {
                    Map<String, Object> applicationDsl = tuple.getT1();
                    List<Application> dependentModules = tuple.getT2();
                    Map<String, Map<String, Object>> dependentModuleDsl = dependentModules.stream()
                            .collect(Collectors.toMap(Application::getId, Application::getLiveApplicationDsl, (a, b) -> b));
                    return HistorySnapshotDslView.builder()
                            .applicationsDsl(applicationDsl)
                            .moduleDSL(dependentModuleDsl)
                            .build();
                })
                .map(ResponseView::success);
    }

    private record ApplicationHistorySnapshotBriefInfo(String snapshotId, Map<String, Object> context,
                                                       String userId, String userName,
                                                       String userAvatar, long createTime) {
    }

    private record ApplicationHistorySnapshotRequest(String applicationId, Map<String, Object> dsl, Map<String, Object> context) {
    }

}
