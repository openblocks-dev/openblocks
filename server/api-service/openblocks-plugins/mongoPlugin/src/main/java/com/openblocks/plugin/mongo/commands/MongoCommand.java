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

import static com.openblocks.plugin.mongo.constants.MongoFieldName.COLLECTION;
import static com.openblocks.sdk.exception.PluginCommonError.QUERY_EXECUTION_ERROR;
import static com.openblocks.sdk.plugin.common.QueryExecutionUtils.validConfigurationPresentInFormData;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections4.MapUtils;
import org.apache.commons.lang3.StringUtils;
import org.bson.Document;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.openblocks.sdk.exception.PluginException;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * This is the base class which every Mongo Command extends. Common functions across all mongo commands
 * are implemented here including reading and validating the collection. This also defines functions which should be
 * implemented by all the commands.
 */
@Getter
@Setter
@NoArgsConstructor
public abstract class MongoCommand {

    private static final int DEFAULT_VALUE = 8000;

    private String collection;
    private int timeoutMs;
    private String type;

    List<String> fieldNamesWithNoConfiguration;

    protected static final ObjectMapper objectMapper = new ObjectMapper();

    public MongoCommand(Map<String, Object> formData) {

        this.fieldNamesWithNoConfiguration = new ArrayList<>();

        if (validConfigurationPresentInFormData(formData, COLLECTION)) {
            this.collection = (String) formData.get(COLLECTION);
        }

        timeoutMs = MapUtils.getInteger(formData, "timeout", DEFAULT_VALUE);
    }

    public boolean isValid() {
        if (StringUtils.isBlank(this.collection)) {
            fieldNamesWithNoConfiguration.add(COLLECTION);
            return false;
        }
        return true;
    }

    public Document parseCommand() {
        throw new PluginException(QUERY_EXECUTION_ERROR, "INVALID_MONGODB_OPERATION");
    }

    public String getCollection() {
        return collection;
    }

    public int getTimeoutMs() {
        return timeoutMs;
    }

    public String getType() {
        return type;
    }

    protected boolean isArrayStr(String input) {
        input = input.trim();
        return input.startsWith("[") && input.endsWith("]");
    }
}
