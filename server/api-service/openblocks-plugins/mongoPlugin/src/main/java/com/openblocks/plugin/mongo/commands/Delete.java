/**
 * Copyright 2021 Appsmith Inc.
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * <p>
 */
package com.openblocks.plugin.mongo.commands;

import static com.openblocks.plugin.mongo.constants.MongoFieldName.DELETE_LIMIT;
import static com.openblocks.plugin.mongo.constants.MongoFieldName.DELETE_QUERY;
import static com.openblocks.sdk.plugin.common.QueryExecutionUtils.getValueSafelyFromFormData;
import static com.openblocks.sdk.plugin.common.QueryExecutionUtils.validConfigurationPresentInFormData;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.bson.Document;

import com.openblocks.plugin.mongo.utils.MongoQueryUtils;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Delete extends MongoCommand {
    private String query;
    private Integer limit = 1; // Can be only 0 or 1. 0 indicates all matching documents, 1 indicates single matching document

    public Delete(Map<String, Object> formData) {
        super(formData);

        if (validConfigurationPresentInFormData(formData, DELETE_QUERY)) {
            this.query = (String) getValueSafelyFromFormData(formData, DELETE_QUERY);
        }

        if (validConfigurationPresentInFormData(formData, DELETE_LIMIT)) {
            String limitOption = (String) getValueSafelyFromFormData(formData, DELETE_LIMIT);
            if ("ALL".equals(limitOption)) {
                this.limit = 0;
            }
        }
    }

    @Override
    public boolean isValid() {
        if (!super.isValid()) {
            return false;
        }

        if (StringUtils.isNotBlank(query)) {
            return true;
        }

        // Not adding smart defaults for query due to data impact
        fieldNamesWithNoConfiguration.add("Query");
        return false;
    }

    @Override
    public Document parseCommand() {
        Document document = new Document();

        document.put("delete", getCollection());

        Document queryDocument = MongoQueryUtils.parseSafely("Query", this.query);

        Document delete = new Document();
        delete.put("q", queryDocument);
        delete.put("limit", this.limit);

        List<Document> deletes = new ArrayList<>();
        deletes.add(delete);

        document.put("deletes", deletes);

        return document;
    }
}