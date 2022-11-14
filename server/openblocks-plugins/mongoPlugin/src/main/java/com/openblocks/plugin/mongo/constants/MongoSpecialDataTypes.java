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
package com.openblocks.plugin.mongo.constants;

import java.util.regex.Pattern;

/**
 * This enum keeps a list of all the special data types that need to be handled differently during smart substitution
 * . e.g. normally {"name": "Chris"} is a valid BSON document but with ObjectId type as the value the quotes need to
 * be handled differently: {"_id": ObjectId("xyz")} is valid instead of {"_id": "ObjectId(\"xyz\")"}
 */
public enum MongoSpecialDataTypes {
    ObjectId,
    ISODate,
    Date,
    //    NumberLong,
    //    NumberDecimal,
    Timestamp {
        /**
         * Some data types require their argument to be wrapped inside quotes whereas the others don't. This method is
         * used to check if such a wrapping is required or not. e.g. ObjectId("xyz") vs Timestamp(1234, 1)
         *
         * @return whether wrapping inside quotes is required
         */
        @Override
        public boolean isQuotesRequiredAroundParameter() {
            return false;
        }
    },
    // BinData - not sure about this
    ;

    private static final String MONGODB_SPECIAL_TYPE_INSIDE_QUOTES_REGEX_TEMPLATE = """
            (\\"(E\\(([\\s'"]*(.*?)[\\s'"]*)?\\))\\")""";
    private final Pattern regexPattern;

    MongoSpecialDataTypes() {
        String regex = MONGODB_SPECIAL_TYPE_INSIDE_QUOTES_REGEX_TEMPLATE.replace("E", name());
        regexPattern = Pattern.compile(regex);
    }

    /**
     * Some data types require their argument to be wrapped inside quotes whereas the others don't. This method is
     * used to check if such a wrapping is required or not. e.g. ObjectId("xyz") vs Timestamp(1234, 1)
     *
     * @return whether wrapping inside quotes is required
     */
    public boolean isQuotesRequiredAroundParameter() {
        return true;
    }

    public Pattern getRegexPattern() {
        return regexPattern;
    }
}