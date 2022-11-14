package com.openblocks.domain.permission.service;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import com.openblocks.domain.datasource.model.Datasource;
import com.openblocks.domain.datasource.service.DatasourceService;
import com.openblocks.domain.permission.model.ResourceAction;
import com.openblocks.domain.permission.model.ResourcePermission;

import reactor.core.publisher.Mono;

@Lazy
@Component
class DatasourcePermissionHandler extends ResourcePermissionHandler {

    @Autowired
    private DatasourceService datasourceService;

    @Override
    protected Mono<Map<String, List<ResourcePermission>>> getAnonymousUserPermissions(Collection<String> resourceIds, ResourceAction resourceAction) {
        return Mono.just(Collections.emptyMap());
    }

    @Override
    protected Mono<String> getOrgId(String resourceId) {
        return datasourceService.getById(resourceId)
                .map(Datasource::getOrganizationId);
    }
}
