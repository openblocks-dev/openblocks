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

import static com.openblocks.plugin.mongo.constants.MongoFieldName.DISTINCT_QUERY;
import static com.openblocks.plugin.mongo.utils.MongoQueryUtils.parseSafely;
import static com.openblocks.sdk.plugin.common.QueryExecutionUtils.getValueSafelyFromFormData;
import static com.openblocks.sdk.plugin.common.QueryExecutionUtils.validConfigurationPresentInFormData;

import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.bson.Document;

import com.openblocks.plugin.mongo.constants.MongoFieldName;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Distinct extends MongoCommand {
    private String query;
    private String key;

    public Distinct(Map<String, Object> formData) {
        super(formData);

        if (validConfigurationPresentInFormData(formData, DISTINCT_QUERY)) {
            this.query = (String) getValueSafelyFromFormData(formData, DISTINCT_QUERY);
        }

        if (validConfigurationPresentInFormData(formData, MongoFieldName.DISTINCT_KEY)) {
            this.key = (String) getValueSafelyFromFormData(formData, MongoFieldName.DISTINCT_KEY);
        }
    }

    @Override
    public boolean isValid() {
        if (!super.isValid()) {
            return false;
        }

        if (StringUtils.isNotBlank(key)) {
            return true;
        }

        fieldNamesWithNoConfiguration.add("Key/Field");

        return false;
    }

    @Override
    public Document parseCommand() {
        Document document = new Document();

        document.put("distinct", getCollection());

        if (StringUtils.isBlank(this.query)) {
            this.query = "{}";
        }

        document.put("query", parseSafely("Query", this.query));

        document.put("key", this.key);

        return document;
    }
}
