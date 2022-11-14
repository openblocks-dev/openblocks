package com.openblocks.api.application;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import org.apache.commons.collections4.MapUtils;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.openblocks.api.common.mockuser.WithMockUser;
import com.openblocks.sdk.constants.DslConstants.CompoundAppDslConstants;
import com.openblocks.sdk.test.JsonFileReader;

@SpringBootTest
@RunWith(SpringRunner.class)
public class CompoundApplicationDslFilterTest {

    @Autowired
    private CompoundApplicationDslFilter filter;

    @Test
    public void testGetAllSubAppIdsFromCompoundAppDsl() {

        Map<String, Object> dsl = JsonFileReader.readMap(CompoundApplicationDslFilterTest.class);
        Set<String> ids = filter.getAllSubAppIdsFromCompoundAppDsl(getTargetDsl(dsl));
        Assert.assertEquals(Set.of("app01", "app03", "app04", "app06", "app07"), ids);// only get the leaf's id.
    }

    @Test
    @WithMockUser
    public void testRemoveSubAppsFromCompoundDslWithAdminUser() {

        Map<String, Object> dsl = JsonFileReader.readMap(CompoundApplicationDslFilterTest.class);
        filter.removeSubAppsFromCompoundDsl(dsl).block();
        Set<String> ids = filter.getAllSubAppIdsFromCompoundAppDsl(getTargetDsl(dsl));
        // admin user has all applications' permissions, so will remove nothing.
        Assert.assertEquals(Set.of("app01", "app03", "app04", "app06", "app07"), ids);
    }

    @Test
    @WithMockUser(id = "user02")
    public void testRemoveSubAppsFromCompoundDslWithNormalUser() {

        Map<String, Object> dsl = JsonFileReader.readMap(CompoundApplicationDslFilterTest.class);
        filter.removeSubAppsFromCompoundDsl(dsl).block();
        Set<String> ids = filter.getAllSubAppIdsFromCompoundAppDsl(getTargetDsl(dsl));
        // current user has no permissions, so will remove all, except the applications with the
        // "hideWhenNoPermission" value equal to false.
        Assert.assertEquals(Set.of("app03"), ids);
    }

    @SuppressWarnings("unchecked")
    private Map<String, Object> getTargetDsl(Map<String, Object> dsl) {

        Map<String, Object> ui = (Map<String, Object>) MapUtils.getMap(dsl, CompoundAppDslConstants.UI, new HashMap<>());
        return (Map<String, Object>) MapUtils.getMap(ui, CompoundAppDslConstants.COMP, new HashMap<>());
    }
}