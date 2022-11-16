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

import static com.openblocks.plugin.mongo.constants.MongoFieldName.UPDATE_LIMIT;
import static com.openblocks.plugin.mongo.constants.MongoFieldName.UPDATE_OPERATION;
import static com.openblocks.plugin.mongo.constants.MongoFieldName.UPDATE_QUERY;
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
public class UpdateMany extends MongoCommand {
    private String query;
    private String update;
    private Boolean multi = Boolean.FALSE;

    public UpdateMany(Map<String, Object> formData) {
        super(formData);

        if (validConfigurationPresentInFormData(formData, UPDATE_QUERY)) {
            this.query = (String) getValueSafelyFromFormData(formData, UPDATE_QUERY);
        }

        if (validConfigurationPresentInFormData(formData, UPDATE_OPERATION)) {
            this.update = (String) getValueSafelyFromFormData(formData, UPDATE_OPERATION);
        }

        // Default for this is 1 to indicate updating only one document at a time.
        if (validConfigurationPresentInFormData(formData, UPDATE_LIMIT)) {
            String limitOption = (String) getValueSafelyFromFormData(formData, UPDATE_LIMIT);
            if ("ALL".equals(limitOption)) {
                this.multi = Boolean.TRUE;
            }
        }
    }

    @Override
    public boolean isValid() {
        if (!super.isValid()) {
            return false;
        }

        if (StringUtils.isNotBlank(query) && StringUtils.isNotBlank(update)) {
            return true;
        }

        // Not adding smart defaults for query due to data impact
        if (StringUtils.isBlank(query)) {
            fieldNamesWithNoConfiguration.add("Query");
        }
        // Not adding smart defaults for query due to data impact
        if (StringUtils.isBlank(update)) {
            fieldNamesWithNoConfiguration.add("Update");
        }
        return false;
    }

    @Override
    public Document parseCommand() {
        Document document = new Document();

        document.put("update", getCollection());

        Document queryDocument = MongoQueryUtils.parseSafely("Query", this.query);

        Document updateDocument = MongoQueryUtils.parseSafely("Update", this.update);

        Document update = new Document();
        update.put("q", queryDocument);
        update.put("u", updateDocument);
        update.put("multi", multi);

        List<Document> updates = new ArrayList<>();
        updates.add(update);

        document.put("updates", updates);

        return document;
    }
}
