package com.openblocks.api.datasource;

import static com.openblocks.domain.permission.model.ResourceRole.OWNER;
import static com.openblocks.domain.permission.model.ResourceRole.VIEWER;

import java.util.Collection;
import java.util.List;
import java.util.Set;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.openblocks.api.common.mockuser.WithMockUser;
import com.openblocks.api.permission.view.CommonPermissionView;
import com.openblocks.api.permission.view.PermissionItemView;
import com.openblocks.domain.datasource.model.Datasource;
import com.openblocks.domain.datasource.model.DatasourceCreationSource;
import com.openblocks.domain.datasource.model.DatasourceStatus;
import com.openblocks.sdk.exception.BizError;
import com.openblocks.sdk.exception.BizException;
import com.openblocks.sdk.plugin.mysql.MysqlDatasourceConfig;

import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

@SpringBootTest
@RunWith(SpringRunner.class)
public class DatasourceApiServiceTest {

    @Autowired
    private DatasourceApiService datasourceApiService;

    @Test
    @WithMockUser(id = "user02")
    public void testListOrgDatasource() {
        Mono<List<DatasourceView>> datasourceListMono =
                // create mysql04 and update permission to viewer
                datasourceApiService.create(buildMysqlDatasource("mysql04"))
                        .flatMap(datasource -> datasourceApiService.getPermissions(datasource.getId()))
                        .map(commonPermissionView -> findUserPermission(commonPermissionView, "user02"))
                        .flatMap(permissionItemView -> datasourceApiService.updatePermission(permissionItemView.getPermissionId(), VIEWER))
                        // create mysql05
                        .then(datasourceApiService.create(buildMysqlDatasource("mysql05")))
                        .then(datasourceApiService.listOrgDataSources("org01").collectList());

        StepVerifier.create(datasourceListMono)
                .assertNext(datasourceViews -> {
                    Assert.assertFalse(findDatasourceView(datasourceViews, "mysql04").edit());
                    Assert.assertTrue(findDatasourceView(datasourceViews, "mysql05").edit());
                })
                .verifyComplete();
    }

    private DatasourceView findDatasourceView(Collection<DatasourceView> datasourceViews, String name) {
        return datasourceViews.stream()
                .filter(datasourceView -> datasourceView.datasource().getName().equals(name))
                .findFirst()
                .orElse(null);
    }

    @Test
    @WithMockUser
    public void testGrantPermissionAndGetPermissionSuccess() {

        Mono<CommonPermissionView> commonPermissionViewMono = datasourceApiService.create(buildMysqlDatasource("mysql01"))
                .delayUntil(ds -> datasourceApiService.grantPermission(ds.getId(), Set.of("user02"), Set.of("group01"), OWNER))
                .flatMap(ds -> datasourceApiService.getPermissions(ds.getId()));

        StepVerifier.create(commonPermissionViewMono)
                .assertNext(commonPermissionView -> {
                    Assert.assertEquals("The Avengers", commonPermissionView.getOrgName());
                    Assert.assertEquals("user01", commonPermissionView.getCreatorId());

                    // assert group
                    Assert.assertEquals(1, commonPermissionView.getGroupPermissions().size());
                    PermissionItemView permissionItemView = commonPermissionView.getGroupPermissions().get(0);
                    Assert.assertEquals("group01", permissionItemView.getId());
                    Assert.assertEquals("owner", permissionItemView.getRole());

                    // assert user
                    Assert.assertEquals(2, commonPermissionView.getUserPermissions().size());
                    Assert.assertEquals("owner", findUserPermission(commonPermissionView, "user01").getRole());
                    Assert.assertEquals("owner", findUserPermission(commonPermissionView, "user02").getRole());
                })
                .verifyComplete();
    }

    @Test
    @WithMockUser
    public void testUpdatePermissionAndDeletePermissionSuccess() {

        Mono<Datasource> datasourceMono = datasourceApiService.create(buildMysqlDatasource("mysql02")).cache();

        Mono<String> permissionIdMono = datasourceMono
                .delayUntil(datasource -> datasourceApiService.grantPermission(datasource.getId(), Set.of("user02"), Set.of(), OWNER))
                .flatMap(datasource -> datasourceApiService.getPermissions(datasource.getId()))
                .map(commonPermissionView -> findUserPermission(commonPermissionView, "user02").getPermissionId())
                .cache();

        // test update permission success
        Mono<CommonPermissionView> commonPermissionViewMono = permissionIdMono
                .delayUntil(permissionId -> datasourceApiService.updatePermission(permissionId, VIEWER))
                .then(datasourceMono.flatMap(datasource -> datasourceApiService.getPermissions(datasource.getId())));

        StepVerifier.create(commonPermissionViewMono)
                .assertNext(commonPermissionView -> {
                    PermissionItemView user02 = findUserPermission(commonPermissionView, "user02");
                    Assert.assertEquals("viewer", user02.getRole());
                })
                .verifyComplete();

        // test delete permission success
        commonPermissionViewMono = permissionIdMono
                .delayUntil(permissionId -> datasourceApiService.deletePermission(permissionId))
                .then(datasourceMono.flatMap(datasource -> datasourceApiService.getPermissions(datasource.getId())));

        StepVerifier.create(commonPermissionViewMono)
                .assertNext(commonPermissionView -> {
                    PermissionItemView user02 = findUserPermission(commonPermissionView, "user02");
                    Assert.assertNull(user02);
                })
                .verifyComplete();
    }

    @Test
    @WithMockUser(id = "user02")
    public void testUpdatePermissionErrorWithNoPermission() {

        Mono<Boolean> booleanMono = datasourceApiService.create(buildMysqlDatasource("mysql03"))
                .delayUntil(datasource -> datasourceApiService.grantPermission(datasource.getId(), Set.of("user01"), Set.of(), OWNER))
                .flatMap(datasource -> datasourceApiService.getPermissions(datasource.getId()))
                .flatMap(commonPermissionView -> {
                            PermissionItemView user01 = findUserPermission(commonPermissionView, "user01");
                            PermissionItemView user02 = findUserPermission(commonPermissionView, "user02");
                            return datasourceApiService.updatePermission(user02.getPermissionId(), VIEWER)
                                    .then(datasourceApiService.deletePermission(user01.getPermissionId()));
                        }
                );

        StepVerifier.create(booleanMono)
                .expectErrorMatches(throwable -> throwable instanceof BizException bizException && bizException.getError() == BizError.NOT_AUTHORIZED)
                .verify();
    }

    private PermissionItemView findUserPermission(CommonPermissionView commonPermissionView, String userId) {
        return commonPermissionView.getUserPermissions()
                .stream()
                .filter(permissionItemView -> permissionItemView.getId().equals(userId))
                .findFirst()
                .orElse(null);
    }

    public static Datasource buildMysqlDatasource(String name) {
        Datasource datasource = new Datasource();
        datasource.setName(name);
        datasource.setType("mysql");
        datasource.setOrganizationId("org01");
        datasource.setCreationSource(DatasourceCreationSource.USER_CREATED.getValue());
        datasource.setDatasourceStatus(DatasourceStatus.NORMAL);

        MysqlDatasourceConfig mysqlDatasourceConfig = MysqlDatasourceConfig.builder()
                .host("mysql")
                .port(3306L)
                .database("test")
                .build();
        datasource.setDetailConfig(mysqlDatasourceConfig);

        return datasource;
    }
}