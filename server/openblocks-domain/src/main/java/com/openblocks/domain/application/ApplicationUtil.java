package com.openblocks.domain.application;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.validation.constraints.NotNull;

import org.apache.commons.lang3.StringUtils;

import com.google.common.collect.Sets;

public class ApplicationUtil {

    public static Object getContainerSizeFromDSL(Map<String, Object> dsl) {
        Object ui = dsl.get("ui");
        if (!(ui instanceof Map<?, ?> uiMap)) {
            return Collections.emptyMap();
        }
        Object comp = uiMap.get("comp");
        if (!(comp instanceof Map<?, ?> compMap)) {
            return Collections.emptyMap();
        }
        return compMap.get("containerSize");
    }

    @NotNull
    public static Set<String> getDependentModulesFromDsl(Map<String, Object> dsl) {
        Set<String> dependentModuleIds = Sets.newHashSet();
        doGetDependentModules(dsl, dependentModuleIds);
        return dependentModuleIds;
    }

    public static void doGetDependentModules(Map<?, ?> map, Set<String> dependentModuleIds) {
        Object compType = map.get("compType");
        if (compType instanceof String compTypeStr && compTypeStr.equals("module")) {
            Object comp = map.get("comp");
            if (comp instanceof Map<?, ?> compMap) {
                String appId = (String) compMap.get("appId");
                if (StringUtils.isNotBlank(appId)) {
                    dependentModuleIds.add(appId);
                }
            }
        }

        map.forEach((key, value) -> {
            if (value instanceof Map<?, ?> valueMap) {
                doGetDependentModules(valueMap, dependentModuleIds);
            }
            if (value instanceof List<?> valueList) {
                valueList.forEach(i -> {
                    if (i instanceof Map<?, ?> iMap) {
                        doGetDependentModules(iMap, dependentModuleIds);
                    }
                });
            }
        });
    }

}
