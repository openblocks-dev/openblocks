package com.openblocks.api.datasource;

import static com.openblocks.sdk.exception.BizError.INVALID_PARAMETER;
import static com.openblocks.sdk.util.ExceptionUtils.ofError;
import static com.openblocks.sdk.util.LocaleUtils.getLocale;
import static org.apache.commons.collections4.SetUtils.emptyIfNull;

import java.util.List;
import java.util.Locale;
import java.util.Set;

import javax.validation.Valid;

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
import com.openblocks.domain.datasource.model.Datasource;
import com.openblocks.domain.datasource.service.DatasourceStructureService;
import com.openblocks.domain.permission.model.ResourceRole;
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

    @Autowired
    public DatasourceController(DatasourceStructureService datasourceStructureService,
            DatasourceApiService datasourceApiService, UpsertDatasourceRequestMapper upsertDatasourceRequestMapper) {
        this.datasourceStructureService = datasourceStructureService;
        this.datasourceApiService = datasourceApiService;
        this.upsertDatasourceRequestMapper = upsertDatasourceRequestMapper;
    }

    @JsonView(JsonViews.Public.class)
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<ResponseView<Datasource>> create(@Valid @RequestBody UpsertDatasourceRequest request) {
        return datasourceApiService.create(upsertDatasourceRequestMapper.resolve(request))
                .map(ResponseView::success);
    }

    @JsonView(JsonViews.Public.class)
    @GetMapping("/{id}")
    public Mono<ResponseView<Datasource>> getById(@PathVariable String id) {
        return datasourceApiService.findByIdWithPermission(id)
                .map(ResponseView::success);
    }

    @JsonView(JsonViews.Public.class)
    @PutMapping("/{id}")
    public Mono<ResponseView<Datasource>> update(@PathVariable String id,
            @RequestBody UpsertDatasourceRequest request) {
        Datasource resolvedDatasource = upsertDatasourceRequestMapper.resolve(request);
        return datasourceApiService.update(id, resolvedDatasource)
                .map(ResponseView::success);
    }

    @DeleteMapping("/{id}")
    public Mono<ResponseView<Boolean>> delete(@PathVariable String id) {
        return datasourceApiService.delete(id)
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


    @JsonView(JsonViews.Public.class)
    @GetMapping("/listByOrg")
    public Mono<ResponseView<List<DatasourceView>>> listOrgDataSources(@RequestParam(name = "orgId") String orgId) {
        if (StringUtils.isBlank(orgId)) {
            return ofError(BizError.INVALID_PARAMETER, "ORG_ID_EMPTY");
        }
        return datasourceApiService.listOrgDataSources(orgId)
                .map(ResponseView::success);
    }


    @JsonView(JsonViews.Public.class)
    @GetMapping("/listByApp")
    public Mono<ResponseView<List<DatasourceView>>> listAppDataSources(@RequestParam(name = "appId") String applicationId) {
        if (StringUtils.isBlank(applicationId)) {
            return ofError(BizError.INVALID_PARAMETER, "INVALID_APP_ID");
        }
        return datasourceApiService.listAppDataSources(applicationId)
                .map(ResponseView::success);
    }

    @PutMapping("/{datasourceId}/permissions")
    public Mono<ResponseView<Boolean>> grantPermission(@PathVariable String datasourceId,
            @RequestBody BatchAddPermissionRequest request) {
        ResourceRole role = ResourceRole.fromValue(request.role());
        if (role == null) {
            return ofError(INVALID_PARAMETER, "INVALID_PARAMETER", request.role());
        }
        return datasourceApiService.grantPermission(datasourceId,
                        emptyIfNull(request.userIds()),
                        emptyIfNull(request.groupIds()),
                        role)
                .map(ResponseView::success);
    }

    @GetMapping("/info")
    public Mono<ResponseView<Object>> info(@RequestParam(required = false) String datasourceId) {
        return Mono.just(ResponseView.success(datasourceApiService.info(datasourceId)));
    }

    private record BatchAddPermissionRequest(String role, Set<String> userIds, Set<String> groupIds) {

    }

}
