package com.openblocks.api.datasource;

import static com.openblocks.infra.event.EventType.DATA_SOURCE_CREATE;
import static com.openblocks.infra.event.EventType.DATA_SOURCE_DELETE;
import static com.openblocks.infra.event.EventType.DATA_SOURCE_PERMISSION_DELETE;
import static com.openblocks.infra.event.EventType.DATA_SOURCE_PERMISSION_GRANT;
import static com.openblocks.infra.event.EventType.DATA_SOURCE_PERMISSION_UPDATE;
import static com.openblocks.infra.event.EventType.DATA_SOURCE_UPDATE;
import static com.openblocks.sdk.exception.BizError.INVALID_PARAMETER;
import static com.openblocks.sdk.util.ExceptionUtils.ofError;
import static com.openblocks.sdk.util.LocaleUtils.getLocale;

import java.util.Collections;
import java.util.List;
import java.util.Locale;
import java.util.Set;

import javax.annotation.Nullable;
import javax.validation.Valid;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.BooleanUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.openblocks.api.framework.view.ResponseView;
import com.openblocks.api.permission.view.CommonPermissionView;
import com.openblocks.api.util.BusinessEventPublisher;
import com.openblocks.domain.datasource.model.Datasource;
import com.openblocks.domain.datasource.service.DatasourceService;
import com.openblocks.domain.datasource.service.DatasourceStructureService;
import com.openblocks.domain.permission.model.ResourceRole;
import com.openblocks.domain.plugin.client.DatasourcePluginClient;
import com.openblocks.domain.plugin.client.dto.GetPluginDynamicConfigRequestDTO;
import com.openblocks.infra.constant.NewUrl;
import com.openblocks.infra.constant.Url;
import com.openblocks.sdk.config.SerializeConfig.JsonViews;
import com.openblocks.sdk.exception.BizError;
import com.openblocks.sdk.models.DatasourceStructure;
import com.openblocks.sdk.models.DatasourceTestResult;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Slf4j
@RestController
@RequestMapping(value = {Url.DATASOURCE_URL, NewUrl.DATASOURCE_URL})
public class DatasourceController {

    private final DatasourceStructureService datasourceStructureService;
    private final DatasourceApiService datasourceApiService;
    private final UpsertDatasourceRequestMapper upsertDatasourceRequestMapper;
    private final BusinessEventPublisher businessEventPublisher;
    private final DatasourceService datasourceService;
    private final DatasourcePluginClient datasourcePluginClient;

    @Autowired
    public DatasourceController(
            DatasourceStructureService datasourceStructureService,
            DatasourceApiService datasourceApiService,
            UpsertDatasourceRequestMapper upsertDatasourceRequestMapper,
            BusinessEventPublisher businessEventPublisher,
            DatasourceService datasourceService, DatasourcePluginClient datasourcePluginClient) {
        this.datasourceStructureService = datasourceStructureService;
        this.datasourceApiService = datasourceApiService;
        this.upsertDatasourceRequestMapper = upsertDatasourceRequestMapper;
        this.businessEventPublisher = businessEventPublisher;
        this.datasourceService = datasourceService;
        this.datasourcePluginClient = datasourcePluginClient;
    }

    @JsonView(JsonViews.Public.class)
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<ResponseView<Datasource>> create(@Valid @RequestBody UpsertDatasourceRequest request) {
        return datasourceApiService.create(upsertDatasourceRequestMapper.resolve(request))
                .delayUntil(datasourceService::removePasswordTypeKeysFromJsDatasourcePluginConfig)
                .delayUntil(datasource -> businessEventPublisher.publishDatasourceEvent(datasource, DATA_SOURCE_CREATE))
                .map(ResponseView::success);
    }

    @JsonView(JsonViews.Public.class)
    @GetMapping("/{id}")
    public Mono<ResponseView<Datasource>> getById(@PathVariable String id) {
        return datasourceApiService.findByIdWithPermission(id)
                .delayUntil(datasourceService::removePasswordTypeKeysFromJsDatasourcePluginConfig)
                .map(ResponseView::success);
    }

    @JsonView(JsonViews.Public.class)
    @PutMapping("/{id}")
    public Mono<ResponseView<Datasource>> update(@PathVariable String id,
            @RequestBody UpsertDatasourceRequest request) {
        Datasource resolvedDatasource = upsertDatasourceRequestMapper.resolve(request);
        return datasourceApiService.update(id, resolvedDatasource)
                .delayUntil(datasourceService::removePasswordTypeKeysFromJsDatasourcePluginConfig)
                .delayUntil(datasource -> businessEventPublisher.publishDatasourceEvent(datasource, DATA_SOURCE_UPDATE))
                .map(ResponseView::success);
    }

    @DeleteMapping("/{id}")
    public Mono<ResponseView<Boolean>> delete(@PathVariable String id) {
        return datasourceApiService.delete(id)
                .delayUntil(result -> {
                    if (BooleanUtils.isTrue(result)) {
                        return businessEventPublisher.publishDatasourceEvent(id, DATA_SOURCE_DELETE);
                    }
                    return Mono.empty();
                })
                .map(ResponseView::success);
    }

    @PostMapping("/test")
    public Mono<ResponseView<Boolean>> testDatasource(@RequestBody UpsertDatasourceRequest request) {
        Datasource resolvedDatasource = upsertDatasourceRequestMapper.resolve(request);
        return Mono.deferContextual(ctx -> {
            Locale locale = getLocale(ctx);
            return datasourceApiService.testDatasource(resolvedDatasource)
                    .map(datasourceTestResult -> toResponseView(datasourceTestResult, locale));
        });
    }

    private ResponseView<Boolean> toResponseView(DatasourceTestResult datasourceTestResult, Locale locale) {
        if (datasourceTestResult.isSuccess()) {
            return ResponseView.success(true);
        }
        return ResponseView.error(500, datasourceTestResult.getInvalidMessage(locale));
    }

    @GetMapping("/{datasourceId}/structure")
    public Mono<ResponseView<DatasourceStructure>> getStructure(@PathVariable String datasourceId,
            @RequestParam(required = false, defaultValue = "false") boolean ignoreCache) {
        return datasourceStructureService.getStructure(datasourceId, ignoreCache)
                .map(ResponseView::success);
    }

    /**
     * Returns the information of all the js data source plugins by the org id which we get by the applicationId, including the data source id,
     * name, type... and the plugin definition of it, excluding the detail configs such as the connection uri, password...
     */
    @GetMapping("/jsDatasourcePlugins")
    public Mono<ResponseView<List<Datasource>>> listJsDatasourcePlugins(@RequestParam("appId") String applicationId) {
        return datasourceApiService.listJsDatasourcePlugins(applicationId)
                .collectList()
                .map(ResponseView::success);
    }

    /**
     * Proxy the request to the node service, besides, add the "extra" information from the data source config stored in the mongodb if exists to
     * the request dto. And then return the response from the node service.
     */
    @PostMapping("/getPluginDynamicConfig")
    public Mono<ResponseView<List<Object>>> getPluginDynamicConfig(
            @RequestBody List<GetPluginDynamicConfigRequestDTO> getPluginDynamicConfigRequestDTOS) {
        if (CollectionUtils.isEmpty(getPluginDynamicConfigRequestDTOS)) {
            return Mono.just(ResponseView.success(Collections.emptyList()));
        }
        return datasourceApiService.getPluginDynamicConfig(getPluginDynamicConfigRequestDTOS)
                .map(ResponseView::success);
    }

    @JsonView(JsonViews.Public.class)
    @GetMapping("/listByOrg")
    public Mono<ResponseView<List<DatasourceView>>> listOrgDataSources(@RequestParam(name = "orgId") String orgId) {
        if (StringUtils.isBlank(orgId)) {
            return ofError(BizError.INVALID_PARAMETER, "ORG_ID_EMPTY");
        }
        return datasourceApiService.listOrgDataSources(orgId)
                .collectList()
                .map(ResponseView::success);
    }

    @Deprecated
    @JsonView(JsonViews.Public.class)
    @GetMapping("/listByApp")
    public Mono<ResponseView<List<DatasourceView>>> listAppDataSources(@RequestParam(name = "appId") String applicationId) {
        if (StringUtils.isBlank(applicationId)) {
            return ofError(BizError.INVALID_PARAMETER, "INVALID_APP_ID");
        }
        return datasourceApiService.listAppDataSources(applicationId)
                .collectList()
                .map(ResponseView::success);
    }

    @GetMapping("/{datasourceId}/permissions")
    public Mono<ResponseView<CommonPermissionView>> getPermissions(@PathVariable("datasourceId") String datasourceId) {
        return datasourceApiService.getPermissions(datasourceId)
                .map(ResponseView::success);
    }

    @PutMapping("/{datasourceId}/permissions")
    public Mono<ResponseView<Boolean>> grantPermission(@PathVariable String datasourceId,
            @RequestBody BatchAddPermissionRequest request) {
        ResourceRole role = ResourceRole.fromValue(request.role());
        if (role == null) {
            return ofError(INVALID_PARAMETER, "INVALID_PARAMETER", request.role());
        }
        return datasourceApiService.grantPermission(datasourceId, request.userIds(), request.groupIds(), role)
                .delayUntil(result -> {
                    if (BooleanUtils.isTrue(result)) {
                        return businessEventPublisher.publishDatasourcePermissionEvent(datasourceId, request.userIds,
                                request.groupIds(), request.role(), DATA_SOURCE_PERMISSION_GRANT);
                    }
                    return Mono.empty();
                })
                .map(ResponseView::success);
    }

    @PutMapping("/permissions/{permissionId}")
    public Mono<ResponseView<Boolean>> updatePermission(@PathVariable("permissionId") String permissionId,
            @RequestBody UpdatePermissionRequest request) {
        if (request.getResourceRole() == null) {
            return ofError(INVALID_PARAMETER, "INVALID_PARAMETER", request.role());
        }
        return datasourceApiService.updatePermission(permissionId, request.getResourceRole())
                .delayUntil(result -> {
                    if (BooleanUtils.isTrue(result)) {
                        return businessEventPublisher.publishDatasourcePermissionEvent(permissionId, DATA_SOURCE_PERMISSION_UPDATE);
                    }
                    return Mono.empty();
                })
                .map(ResponseView::success);
    }

    @DeleteMapping("/permissions/{permissionId}")
    public Mono<ResponseView<Boolean>> deletePermission(@PathVariable("permissionId") String permissionId) {
        return businessEventPublisher.publishDatasourcePermissionEvent(permissionId, DATA_SOURCE_PERMISSION_DELETE)
                .then(datasourceApiService.deletePermission(permissionId))
                .map(ResponseView::success);
    }

    @GetMapping("/info")
    public Mono<ResponseView<Object>> info(@RequestParam(required = false) String datasourceId) {
        return Mono.just(ResponseView.success(datasourceApiService.info(datasourceId)));
    }

    private record BatchAddPermissionRequest(String role, Set<String> userIds, Set<String> groupIds) {
    }

    private record UpdatePermissionRequest(String role) {

        @Nullable
        private ResourceRole getResourceRole() {
            return ResourceRole.fromValue(role());
        }
    }
}
