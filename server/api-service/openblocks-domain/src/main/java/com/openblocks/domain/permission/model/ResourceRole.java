package com.openblocks.domain.permission.model;

import static com.google.common.collect.Maps.newHashMap;
import static com.openblocks.sdk.util.StreamUtils.collectMap;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.annotation.Nullable;

import org.jgrapht.Graph;
import org.jgrapht.graph.DefaultDirectedGraph;
import org.jgrapht.graph.DefaultEdge;
import org.jgrapht.traverse.BreadthFirstIterator;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.common.collect.Streams;

public enum ResourceRole {

    VIEWER("viewer", 1),
    EDITOR("editor", 10),
    OWNER("owner", 100);

    private static final Map<String, ResourceRole> VALUE_MAP;

    static {
        VALUE_MAP = collectMap(Arrays.stream(values()),
                ResourceRole::getValue, Function.identity());
    }

    private final String value;
    private final int roleWeight; // used for sorting roles

    ResourceRole(String value, int roleWeight) {
        this.value = value;
        this.roleWeight = roleWeight;
    }


    @Nullable
    public static ResourceRole fromValue(String role) {
        return VALUE_MAP.get(role);
    }

    public String getValue() {
        return value;
    }

    @JsonIgnore
    public int getRoleWeight() {
        return roleWeight;
    }

    public boolean canDo(ResourceAction permission) {
        return RolePermissionHelper.canDo(this, permission);
    }

    /**
     * for lazy instantiation
     */
    private static class RolePermissionHelper {

        private static final Map<ResourceRole, Set<ResourceAction>> roleSetMap;

        static {
            Graph<ResourceRole, DefaultEdge> graph = new DefaultDirectedGraph<>(DefaultEdge.class);
            Arrays.stream(values()).forEach(graph::addVertex);
            graph.addEdge(OWNER, EDITOR);
            graph.addEdge(EDITOR, VIEWER);

            roleSetMap = buildRolePermissionMap(graph, List.of(values()));
        }

        @SuppressWarnings("UnstableApiUsage")
        private static Map<ResourceRole, Set<ResourceAction>> buildRolePermissionMap(Graph<ResourceRole, DefaultEdge> graph,
                Collection<ResourceRole> values) {
            Map<ResourceRole, Set<ResourceAction>> rolePermissionMap = newHashMap();
            for (ResourceRole value : values) {
                var breadthFirstIterator = new BreadthFirstIterator<>(graph, value);
                Set<ResourceAction> collect = Streams.stream(breadthFirstIterator)
                        .map(ResourceAction::getMatchingPermissions)
                        .flatMap(Collection::stream)
                        .collect(Collectors.toSet());
                rolePermissionMap.put(value, collect);
            }
            return rolePermissionMap;
        }

        public static boolean canDo(ResourceRole role, ResourceAction permission) {
            return roleSetMap.getOrDefault(role, Collections.emptySet()).contains(permission);
        }
    }


}
