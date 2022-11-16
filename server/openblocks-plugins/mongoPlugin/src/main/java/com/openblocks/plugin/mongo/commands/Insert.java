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

import static com.openblocks.plugin.mongo.constants.MongoFieldName.INSERT_DOCUMENT;
import static com.openblocks.sdk.exception.PluginCommonError.QUERY_ARGUMENT_ERROR;
import static com.openblocks.sdk.plugin.common.QueryExecutionUtils.getValueSafelyFromFormData;
import static com.openblocks.sdk.plugin.common.QueryExecutionUtils.validConfigurationPresentInFormData;

import java.util.ArrayList;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.bson.BsonArray;
import org.bson.Document;
import org.bson.json.JsonParseException;

import com.openblocks.plugin.mongo.utils.MongoQueryUtils;
import com.openblocks.sdk.exception.PluginException;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Insert extends MongoCommand {
    private String documents;

    public Insert(Map<String, Object> formData) {
        super(formData);

        if (validConfigurationPresentInFormData(formData, INSERT_DOCUMENT)) {
            this.documents = (String) getValueSafelyFromFormData(formData, INSERT_DOCUMENT);
        }
    }

    @Override
    public boolean isValid() {
        if (!super.isValid()) {
            return false;
        }

        if (StringUtils.isNotBlank(documents)) {
            return true;
        }

        fieldNamesWithNoConfiguration.add("Documents");
        return false;
    }

    @Override
    public Document parseCommand() {
        Document commandDocument = new Document();

        commandDocument.put("insert", getCollection());

        if (isArrayStr(documents)) {
            try {
                BsonArray arrayListFromInput = BsonArray.parse(documents);
                if (arrayListFromInput.isEmpty()) {
                    commandDocument.put("documents", "[]");
                } else {
                    commandDocument.put("documents", arrayListFromInput);
                }
            } catch (JsonParseException e) {
                throw new PluginException(QUERY_ARGUMENT_ERROR, "INVALID_JSON_ARRAY_FORMAT");
            }
        } else {
            // The command expects the documents to be sent in an array. Parse and create a single element array
            Document document = MongoQueryUtils.parseSafely("Documents", documents);
            ArrayList<Document> documentArrayList = new ArrayList<>();
            documentArrayList.add(document);

            commandDocument.put("documents", documentArrayList);
        }

        return commandDocument;
    }

}