package com.openblocks.api.query;

import static com.openblocks.api.common.mockuser.WithMockUser.DEFAULT_CURRENT_ORG_ID;

import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.openblocks.api.common.mockuser.WithMockUser;
import com.openblocks.api.datasource.DatasourceApiService;
import com.openblocks.api.datasource.DatasourceApiServiceTest;
import com.openblocks.api.query.view.LibraryQueryView;
import com.openblocks.domain.query.model.LibraryQuery;

import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

@SuppressWarnings("SameParameterValue")
@SpringBootTest
@RunWith(SpringRunner.class)
public class LibraryQueryApiServiceTest {

    @Autowired
    private DatasourceApiService datasourceApiService;
    @Autowired
    private LibraryQueryApiService libraryQueryApiService;

    @Test
    @WithMockUser
    public void testListLibraryQueries() {
        Mono<List<LibraryQueryView>> listMono = datasourceApiService.create(DatasourceApiServiceTest.buildMysqlDatasource("mysql06"))
                .flatMap(datasource -> libraryQueryApiService.create(buildLibraryQuery("query01", datasource.getId())))
                .then(libraryQueryApiService.listLibraryQueries());

        StepVerifier.create(listMono)
                .assertNext(libraryQueryViews -> Assert.assertNotNull(find(libraryQueryViews, "query01")))
                .verifyComplete();
    }

    private LibraryQueryView find(Collection<LibraryQueryView> libraryQueryViews, String name) {
        return libraryQueryViews.stream()
                .filter(libraryQueryView -> libraryQueryView.name().equals(name))
                .findFirst()
                .orElse(null);
    }

    private LibraryQuery buildLibraryQuery(String name, String datasourceId) {
        Map<String, Object> dsl = Map.of("query", Map.of("datasourceId", datasourceId));
        return LibraryQuery.builder()
                .name(name)
                .organizationId(DEFAULT_CURRENT_ORG_ID)
                .libraryQueryDSL(dsl)
                .build();
    }
}