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

import static com.openblocks.plugin.mongo.constants.MongoFieldName.COUNT_QUERY;
import static com.openblocks.plugin.mongo.utils.MongoQueryUtils.parseSafely;
import static com.openblocks.sdk.plugin.common.QueryExecutionUtils.getValueSafelyFromFormData;
import static com.openblocks.sdk.plugin.common.QueryExecutionUtils.validConfigurationPresentInFormData;

import java.util.Map;

import org.bson.Document;
import org.pf4j.util.StringUtils;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Count extends MongoCommand {
    private String query;

    public Count(Map<String, Object> formData) {
        super(formData);

        if (validConfigurationPresentInFormData(formData, COUNT_QUERY)) {
            this.query = (String) getValueSafelyFromFormData(formData, COUNT_QUERY);
        }
    }

    @Override
    public Document parseCommand() {
        Document document = new Document();

        document.put("count", getCollection());

        if (StringUtils.isNullOrEmpty(this.query)) {
            this.query = "{}";
        }

        document.put("query", parseSafely("Query", this.query));

        return document;
    }
}
