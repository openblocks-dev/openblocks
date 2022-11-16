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

import static com.openblocks.plugin.mongo.constants.MongoFieldName.AGGREGATE_LIMIT;
import static com.openblocks.plugin.mongo.constants.MongoFieldName.AGGREGATE_PIPELINE;
import static com.openblocks.plugin.mongo.utils.MongoQueryUtils.parseSafely;
import static com.openblocks.sdk.exception.PluginCommonError.QUERY_ARGUMENT_ERROR;
import static com.openblocks.sdk.plugin.common.QueryExecutionUtils.getValueSafelyFromFormData;
import static org.apache.commons.lang3.StringUtils.isBlank;

import java.util.Map;

import org.apache.commons.lang3.math.NumberUtils;
import org.bson.BsonArray;
import org.bson.Document;
import org.bson.json.JsonParseException;
import org.pf4j.util.StringUtils;

import com.google.common.collect.ImmutableList;
import com.openblocks.sdk.exception.PluginException;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Aggregate extends MongoCommand {
    private String pipeline;
    private int limit;

    public Aggregate(Map<String, Object> formData) {
        super(formData);

        if (getValueSafelyFromFormData(formData, AGGREGATE_PIPELINE) instanceof String pipelineStr) {
            this.pipeline = pipelineStr;
        }

        if (getValueSafelyFromFormData(formData, AGGREGATE_LIMIT) instanceof String limitStr) {
            if (isBlank(limitStr)) {
                limit = Integer.MAX_VALUE;
            } else {
                limit = NumberUtils.toInt(limitStr, 0);
                if (limit <= 0) {
                    throw new PluginException(QUERY_ARGUMENT_ERROR, "INVALID_LIMIT_CONFIG");
                }
            }
        }

    }

    @Override
    public boolean isValid() {
        if (!super.isValid()) {
            return false;
        }

        if (StringUtils.isNullOrEmpty(pipeline)) {
            fieldNamesWithNoConfiguration.add("Array of Pipelines");
            return false;
        }

        return true;
    }

    @Override
    public Document parseCommand() {
        Document commandDocument = new Document();

        commandDocument.put("aggregate", getCollection());
        commandDocument.put("pipeline", parsePipeline());
        commandDocument.put("cursor", parseSafely("cursor", "{batchSize: " + limit + "}"));

        return commandDocument;
    }

    private Object parsePipeline() {
        if (isArrayStr(pipeline)) {
            try {
                BsonArray arrayListFromInput = BsonArray.parse(pipeline);
                if (arrayListFromInput.isEmpty()) {
                    return "[]";
                }
                return arrayListFromInput;
            } catch (JsonParseException e) {
                throw new PluginException(QUERY_ARGUMENT_ERROR, "INVALID_MONGODB_BSON_ARRAY_FORMAT");
            }
        }

        Document pipeline = parseSafely("Array of Pipelines", this.pipeline);
        return ImmutableList.of(pipeline);
    }
}
