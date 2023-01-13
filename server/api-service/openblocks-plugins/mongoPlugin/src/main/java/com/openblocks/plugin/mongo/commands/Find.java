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

import static com.openblocks.plugin.mongo.constants.MongoFieldName.FIND_LIMIT;
import static com.openblocks.plugin.mongo.constants.MongoFieldName.FIND_PROJECTION;
import static com.openblocks.plugin.mongo.constants.MongoFieldName.FIND_QUERY;
import static com.openblocks.plugin.mongo.constants.MongoFieldName.FIND_SKIP;
import static com.openblocks.plugin.mongo.constants.MongoFieldName.FIND_SORT;
import static com.openblocks.plugin.mongo.utils.MongoQueryUtils.parseSafely;
import static com.openblocks.sdk.exception.PluginCommonError.QUERY_ARGUMENT_ERROR;
import static com.openblocks.sdk.plugin.common.QueryExecutionUtils.getValueSafelyFromFormData;
import static com.openblocks.sdk.plugin.common.QueryExecutionUtils.validConfigurationPresentInFormData;

import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.bson.Document;

import com.openblocks.sdk.exception.PluginException;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Find extends MongoCommand {

    private String query;
    private String sort;
    private String projection;
    private String limit;
    private String skip;

    public Find(Map<String, Object> formData) {
        super(formData);

        if (validConfigurationPresentInFormData(formData, FIND_QUERY)) {
            this.query = (String) getValueSafelyFromFormData(formData, FIND_QUERY);
        }

        if (validConfigurationPresentInFormData(formData, FIND_SORT)) {
            this.sort = (String) getValueSafelyFromFormData(formData, FIND_SORT);
        }

        if (validConfigurationPresentInFormData(formData, FIND_PROJECTION)) {
            this.projection = (String) getValueSafelyFromFormData(formData, FIND_PROJECTION);
        }

        if (validConfigurationPresentInFormData(formData, FIND_LIMIT)) {
            this.limit = (String) getValueSafelyFromFormData(formData, FIND_LIMIT);
        }

        if (validConfigurationPresentInFormData(formData, FIND_SKIP)) {
            this.skip = (String) getValueSafelyFromFormData(formData, FIND_SKIP);
        }
    }

    @Override
    public Document parseCommand() {
        Document document = new Document();

        if (StringUtils.isBlank(this.query)) {
            this.query = "{}";
        }

        document.put("find", getCollection());

        document.put("filter", parseSafely("Query", this.query));

        if (StringUtils.isNotBlank(this.sort)) {
            document.put("sort", parseSafely("Sort", this.sort));
        }

        if (StringUtils.isNotBlank(this.projection)) {
            document.put("projection", parseSafely("Projection", this.projection));
        }

        setLimitAndBatchSize(this.limit, document);

        if (StringUtils.isNotBlank(this.skip)) {
            document.put("skip", Long.parseLong(this.skip));
        }

        return document;
    }

    private void setLimitAndBatchSize(String limitStr, Document document) {
        if (StringUtils.isBlank(limitStr)) {
            document.put("batchSize", Integer.MAX_VALUE);
            return;
        }

        int limit = NumberUtils.toInt(limitStr, 0);
        if (limit <= 0) {
            throw new PluginException(QUERY_ARGUMENT_ERROR, "INVALID_LIMIT_CONFIG");
        }

        document.put("limit", limit);
        document.put("batchSize", limit);

    }
}