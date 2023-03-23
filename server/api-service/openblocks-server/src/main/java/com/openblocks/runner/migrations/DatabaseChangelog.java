package com.openblocks.runner.migrations;

import static com.openblocks.domain.util.QueryDslUtils.fieldName;
import static com.openblocks.sdk.util.IDUtils.generate;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.UncategorizedMongoDbException;
import org.springframework.data.mongodb.core.index.CompoundIndexDefinition;
import org.springframework.data.mongodb.core.index.Index;
import org.springframework.data.mongodb.core.index.IndexOperations;

import com.github.cloudyrock.mongock.ChangeLog;
import com.github.cloudyrock.mongock.ChangeSet;
import com.github.cloudyrock.mongock.driver.mongodb.springdata.v3.decorator.impl.MongockTemplate;
import com.openblocks.domain.application.model.Application;
import com.openblocks.domain.datasource.model.Datasource;
import com.openblocks.domain.datasource.model.DatasourceStructureDO;
import com.openblocks.domain.datasource.model.TokenBasedConnection;
import com.openblocks.domain.group.model.Group;
import com.openblocks.domain.group.model.QGroup;
import com.openblocks.domain.material.model.MaterialMeta;
import com.openblocks.domain.organization.model.Organization;
import com.openblocks.domain.query.model.LibraryQuery;
import com.openblocks.domain.query.model.LibraryQueryRecord;
import com.openblocks.domain.user.model.User;
import com.openblocks.infra.birelation.BiRelation;
import com.openblocks.infra.config.model.ServerConfig;
import com.openblocks.infra.eventlog.EventLog;
import com.openblocks.infra.serverlog.ServerLog;
import com.openblocks.runner.migrations.job.CompleteAuthType;
import com.openblocks.runner.migrations.job.MigrateAuthConfigJob;

import lombok.extern.slf4j.Slf4j;

@SuppressWarnings("all")
@Slf4j
@ChangeLog(order = "001")
public class DatabaseChangelog {

    @ChangeSet(order = "001", id = "init-indexes", author = "")
    public void addInitialIndexes(MongockTemplate mongoTemplate) {
        Index updatedAtIndex = makeIndex("updateAt");

        ensureIndexes(mongoTemplate, Application.class,
                updatedAtIndex,
                makeIndex("publishedApplicationDSL.queries.id"),
                makeIndex("publishedApplicationDSL.queries.datasourceId"),
                makeIndex("editingApplicationDSL.queries.id"),
                makeIndex("editingApplicationDSL.queries.datasourceId"),
                makeIndex("orgId")
        );
        ensureIndexes(mongoTemplate, BiRelation.class,
                makeIndex("bizType", "sourceId", "targetId").unique().named("biztype_sourceid_targetid_uniq"),
                makeIndex("bizType", "targetId")
        );

        ensureIndexes(mongoTemplate, Datasource.class,
                updatedAtIndex,
                makeIndex("organizationId", "name").unique()
                        .named("organization_datasource_compound_index")
        );

        ensureIndexes(mongoTemplate, Group.class,
                makeIndex(fieldName(QGroup.group.organizationId))
        );

        ensureIndexes(mongoTemplate, ServerConfig.class,
                makeIndex("key").unique()
        );


        ensureIndexes(mongoTemplate, User.class,
                updatedAtIndex,
                makeIndex("connections.source", "connections.rawId").unique()
        );

        ensureIndexes(mongoTemplate, DatasourceStructureDO.class,
                updatedAtIndex,
                makeIndex("datasourceId").unique()
        );
    }

    @ChangeSet(order = "002", id = "add-organization-indexes-v2", author = "")
    public void addOrganizationIndexes(MongockTemplate mongoTemplate) {
        ensureIndexes(mongoTemplate, Organization.class,
                makeIndex("source", "tpCompanyId").unique().sparse()
        );
    }

    @ChangeSet(order = "003", id = "add-serverlog-indexes", author = "")
    public void addServerLogIndexes(MongockTemplate mongoTemplate) {
        ensureIndexes(mongoTemplate, ServerLog.class,
                makeIndex("userId"),
                makeIndex("createTime")
        );
    }

    @ChangeSet(order = "004", id = "add-token-based-connection-indexes", author = "")
    public void addDatasourceConnectionIndexes(MongockTemplate mongoTemplate) {
        ensureIndexes(mongoTemplate, TokenBasedConnection.class,
                makeIndex("datasourceId").unique()
        );
    }

    @ChangeSet(order = "006", id = "add-org-domain-indexes", author = "")
    public void addOrgDomainIndexes(MongockTemplate mongoTemplate) {
        ensureIndexes(mongoTemplate, Organization.class,
                makeIndex("organizationDomain.domain").unique().sparse()
        );
    }

    @ChangeSet(order = "008", id = "generate-deployment-id", author = "")
    public void generateInstanceId(MongockTemplate mongoTemplate) {
        mongoTemplate.insert(ServerConfig.builder()
                .key("deployment.id")
                .value(generate())
                .build());
    }

    @ChangeSet(order = "009", id = "add-group-type-indexes", author = "")
    public void addGroupTypeIndex(MongockTemplate mongoTemplate) {
        ensureIndexes(mongoTemplate, Group.class, makeIndex("organizationId", "type"));
    }

    @ChangeSet(order = "010", id = "add-event-log-indexes", author = "")
    public void addEventLogIndex(MongockTemplate mongoTemplate) {
        ensureIndexes(mongoTemplate, EventLog.class,
                makeIndex("deploymentId", "eventType", "log.applicationId").sparse(),
                makeIndex("deploymentId", "eventType", "log.userId").sparse()
        );
    }

    @ChangeSet(order = "012", id = "add-library-query-indexes", author = "")
    public void addLibraryQueryIndex(MongockTemplate mongoTemplate) {
        ensureIndexes(mongoTemplate, LibraryQuery.class,
                makeIndex("organizationId").sparse());

        ensureIndexes(mongoTemplate, LibraryQueryRecord.class,
                makeIndex("libraryQueryId").sparse());
    }

    @ChangeSet(order = "013", id = "update-datasource-idnexes", author = "")
    public void updateDatasourceIndex(MongockTemplate mongoTemplate) {
        dropIndexIfExists(mongoTemplate, Datasource.class, "organization_datasource_compound_index");
        ensureIndexes(mongoTemplate, Datasource.class,
                makeIndex("organizationId", "name").named("organization_datasource_index"));
    }


    @ChangeSet(order = "014", id = "add-material-meta-indexes", author = "")
    public void addMaterialMetaIndex(MongockTemplate mongoTemplate) {
        ensureIndexes(mongoTemplate, MaterialMeta.class,
                makeIndex("orgId", "type", "filename").unique());
    }

    @ChangeSet(order = "015", id = "add-bi-relation-indexes", author = "")
    public void addBiRelationIndex(MongockTemplate mongoTemplate) {
        ensureIndexes(mongoTemplate, BiRelation.class,
                makeIndex("bizType", "sourceId", "relation"));
    }

    @ChangeSet(order = "016", id = "update-user-connections-index", author = "")
    public void updateUserConnectionsIndex(MongockTemplate mongoTemplate) {
        dropIndexIfExists(mongoTemplate, User.class, "connections.source_1_connections.rawId_1");
        ensureIndexes(mongoTemplate, User.class, makeIndex("connections.source", "connections.rawId").unique().sparse());
    }

    @ChangeSet(order = "017", id = "migrate-auth-configs", author = "")
    public void migrateAuthConfigs(MigrateAuthConfigJob migrateAuthConfigJob) {
        migrateAuthConfigJob.migrateAuthConfig();
    }

    @ChangeSet(order = "018", id = "complete-auth-type", author = "")
    public void completeAuthType(CompleteAuthType completeAuthType) {
        completeAuthType.complete();
    }

    public static Index makeIndex(String... fields) {
        if (fields.length == 1) {
            return new Index(fields[0], Sort.Direction.ASC).named(fields[0]);
        } else {
            org.bson.Document doc = new org.bson.Document();
            for (String field : fields) {
                doc.put(field, 1);
            }
            return new CompoundIndexDefinition(doc);
        }
    }

    public static void ensureIndexes(MongockTemplate mongoTemplate, Class<?> entityClass, Index... indexes) {
        IndexOperations indexOps = mongoTemplate.indexOps(entityClass);
        for (Index index : indexes) {
            indexOps.ensureIndex(index);
        }
    }

    public static void dropIndexIfExists(MongockTemplate mongoTemplate, Class<?> entityClass, String name) {
        try {
            mongoTemplate.indexOps(entityClass).dropIndex(name);
        } catch (UncategorizedMongoDbException ignored) {
        }
    }

}
