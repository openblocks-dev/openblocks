package com.openblocks.domain.solutions;

import static com.openblocks.sdk.exception.BizError.TEMPLATE_NOT_CORRECT;
import static com.openblocks.sdk.exception.BizError.TEMPLATE_NOT_EXIST;
import static com.openblocks.sdk.util.ExceptionUtils.deferredError;
import static com.openblocks.sdk.util.ExceptionUtils.ofError;
import static java.util.Objects.isNull;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import javax.annotation.Nonnull;

import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.openblocks.domain.application.model.Application;
import com.openblocks.domain.application.model.ApplicationStatus;
import com.openblocks.domain.application.service.ApplicationService;
import com.openblocks.domain.datasource.model.Datasource;
import com.openblocks.domain.datasource.model.DatasourceCreationSource;
import com.openblocks.domain.datasource.service.DatasourceService;
import com.openblocks.domain.query.model.ApplicationQuery;
import com.openblocks.domain.template.model.Template;
import com.openblocks.domain.template.service.TemplateService;
import com.openblocks.infra.annotation.NonEmptyMono;
import com.openblocks.infra.util.TupleUtils;
import com.openblocks.sdk.util.JsonUtils;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Lazy
@Service
public class TemplateSolution {

    private static final int RANDOM_LENGTH = 6;

    @Autowired
    private TemplateService templateService;

    @Autowired
    private DatasourceService datasourceService;

    @Autowired
    private ApplicationService applicationService;

    public Mono<Application> createFromTemplate(String templateId, String orgId, String visitorId) {
        return templateService.getById(templateId)
                .switchIfEmpty(deferredError(TEMPLATE_NOT_EXIST, "TEMPLATE_NOT_EXIST"))
                .zipWith(Mono.just(orgId))
                .zipWhen(tuple -> applicationService.findById(tuple.getT1().getApplicationId())
                                .switchIfEmpty(deferredError(TEMPLATE_NOT_EXIST, "TEMPLATE_NOT_EXIST")),
                        TupleUtils::merge)
                .zipWhen(tuple -> copyDatasourceFromTemplateToCurrentOrganization(tuple.getT2(), tuple.getT3(), visitorId), TupleUtils::merge)
                .flatMap(tuple -> {
                    Template template = tuple.getT1();
                    String organizationId = tuple.getT2();
                    Application templateApplication = tuple.getT3();
                    List<Pair<String, String>> datasourceIdMap = tuple.getT4();
                    String dsl = JsonUtils.toJson(templateApplication.getLiveApplicationDsl());
                    for (Pair<String, String> stringStringPair : datasourceIdMap) {
                        dsl = dsl.replace(stringStringPair.getLeft(), stringStringPair.getRight());
                    }
                    Map<String, Object> applicationDSL = JsonUtils.fromJsonMap(dsl);
                    Application application = Application.builder()
                            .applicationStatus(ApplicationStatus.NORMAL)
                            .organizationId(organizationId)
                            .name(template.getName())
                            .editingApplicationDSL(applicationDSL)
                            .publishedApplicationDSL(applicationDSL)
                            .build();
                    return applicationService.create(application, visitorId);
                });
    }


    @NonEmptyMono
    public Mono<Set<String>> getTemplateApplicationIds(Collection<String> applicationIds) {
        return templateService.getByApplicationIds(applicationIds)
                .map(Template::getApplicationId)
                .collect(Collectors.toSet());
    }

    /**
     * @param application template application
     * @return pairs of template datasource id and copied datasource id
     */
    private Mono<List<Pair<String, String>>> copyDatasourceFromTemplateToCurrentOrganization(String currentOrganizationId, Application application,
            String visitorId) {
        Set<ApplicationQuery> queries = application.getLiveQueries();
        if (isNull(queries)) {
            return ofError(TEMPLATE_NOT_CORRECT, "TEMPLATE_NOT_CORRECT");
        }
        Set<String> datasourceIds = queries.stream()
                .map(query -> query.getBaseQuery().getDatasourceId())
                .collect(Collectors.toSet());
        return Flux.fromIterable(datasourceIds)
                .flatMap(datasourceId -> doCopyDatasource(currentOrganizationId, datasourceId, visitorId)
                        .map(copiedDatasourceId -> Pair.of(datasourceId, copiedDatasourceId)))
                .collectList();
    }

    /**
     * @param organizationId user current orgId
     * @return newly copied datasource id
     */
    @SuppressWarnings({"ConstantConditions"})
    private Mono<String> doCopyDatasource(String organizationId, String datasourceId, String visitorId) {
        return datasourceService.getById(datasourceId)
                .flatMap(datasource -> {
                    if (datasource.isSystemStatic()) {
                        return Mono.just(datasource.getId());
                    }

                    // return new QUICK_REST_API id for legacy quick rest api
                    if (datasource.isLegacyQuickRestApi()) {
                        return Mono.just(Datasource.QUICK_REST_API.getId());
                    }

                    if (datasource.isLegacyOpenblocksApi()) {
                        return Mono.just(Datasource.OPENBLOCKS_API.getId());
                    }
                    return createNewDatasourceFrom(organizationId, visitorId, datasource);
                });

    }

    @SuppressWarnings("ReactiveStreamsNullableInLambdaInTransform")
    @Nonnull
    private Mono<String> createNewDatasourceFrom(String organizationId, String visitorId, Datasource datasource) {
        Datasource copyDatasource = new Datasource();
        copyDatasource.setName(generateCopyDatasourceName(datasource.getName()));
        copyDatasource.setType(datasource.getType());
        copyDatasource.setDetailConfig(datasource.getDetailConfig());
        copyDatasource.setCreationSource(DatasourceCreationSource.CLONE_FROM_TEMPLATE.getValue());
        copyDatasource.setOrganizationId(organizationId);
        return datasourceService.create(copyDatasource, visitorId)

                .map(Datasource::getId);
    }

    private String generateCopyDatasourceName(String name) {
        return name + "_" + RandomStringUtils.random(RANDOM_LENGTH, true, false);
    }


}
