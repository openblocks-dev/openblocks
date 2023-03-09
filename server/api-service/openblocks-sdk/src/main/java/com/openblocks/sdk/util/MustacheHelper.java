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

// copied and adapted for mustache parsing

package com.openblocks.sdk.util;

import static com.google.common.collect.Lists.newArrayList;
import static com.openblocks.sdk.exception.PluginCommonError.SQL_IN_OPERATOR_PARSE_ERROR;
import static com.openblocks.sdk.util.JsonUtils.toJson;
import static com.openblocks.sdk.util.StreamUtils.collectMap;
import static org.apache.commons.lang3.ObjectUtils.firstNonNull;
import static org.apache.commons.lang3.StringUtils.isBlank;
import static org.apache.commons.lang3.StringUtils.substring;

import java.time.Duration;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import javax.annotation.Nonnull;
import javax.validation.constraints.NotNull;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.Range;
import org.apache.commons.text.StringEscapeUtils;

import com.fasterxml.jackson.databind.JsonNode;
import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import com.google.common.annotations.VisibleForTesting;
import com.google.common.collect.Iterables;
import com.openblocks.sdk.exception.PluginException;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public final class MustacheHelper {

    private MustacheHelper() {
    }

    private static final char SPECIAL_CHAR_4_PREPARED_STATEMENT = 16;
    private static final String SPECIAL_STRING_4_PREPARED_STATEMENT = SPECIAL_CHAR_4_PREPARED_STATEMENT + "";

    // MySQL IN operator: xxx in (?)
    private static final Pattern MYSQL_IN_OPERATOR_PATTERN =
            Pattern.compile(".*\\s+(in|IN|In|iN)\\s*\\(\\s*" + SPECIAL_CHAR_4_PREPARED_STATEMENT + "\\s*\\)$");

    private static final Cache<String, List<String>> MUSTACHE_KEY_CACHE;
    private static final long MUSTACHE_KEY_CACHE_MAX_SIZE = 100000;
    private static final int MUSTACHE_KEY_CACHE_EXPIRE_MINUTES = 15;

    static {
        MUSTACHE_KEY_CACHE = Caffeine.newBuilder()
                .maximumSize(MUSTACHE_KEY_CACHE_MAX_SIZE)
                .expireAfterWrite(Duration.ofMinutes(MUSTACHE_KEY_CACHE_EXPIRE_MINUTES))
                .build();
    }

    public static List<String> tokenize(String template) {
        List<String> strings = MUSTACHE_KEY_CACHE.get(template, MustacheHelper::doTokenize);
        return new ArrayList<>(strings);
    }

    /**
     * Tokenize a Mustache template string into a list of plain text and Mustache interpolations.
     *
     * @param template String Mustache template string from which to extract plain text and interpolation tokens.
     * @return A list of String tokens, which form parts of the given template String. Joining the strings in this list
     * should give the original template back. The tokens are split such that alternative strings in the list are plain
     * text and the others are mustache interpolations.
     */
    private static List<String> doTokenize(String template) {
        if (isBlank(template)) {
            return Collections.emptyList();
        }

        List<String> tokens = new ArrayList<>();

        int length = template.length();

        // Following are state variables for the parser.
        // This indicates the state of the pointer. It is `true` when inside mustache double braces. Otherwise `false`.
        boolean isInsideMustache = false;

        // This is set to the quote character of a string in JS. When `null`, it means we're not inside any Javascript
        // string. Can only be one of null, double quote ("), single quote (') or back tick (`).
        Character quote = null;

        // Inside mustache JS, this is the current depth of open/close braces.
        int braceDepth = 0;

        StringBuilder currentToken = new StringBuilder().append(template.charAt(0));

        // The parser is implemented as a pointer (marked by `i`) that loops over each character in the template string.
        // There's majorly two states for the parser, plain-text-mode and mustache-mode, with the current state
        // indicated by `isInsideMustache`. This is set to `true` when the pointer encounters a `{{` in plain-text-mode.
        // It is set back to `false` when the pointer encounters a `}}` in mustache-mode, but not inside a quoted
        // string. Since the contents inside mustache double-braces is supposed to be valid Javascript expression, any
        // any braces inside quoted strings (using single, double or back quotes) should not affect the
        // `isInsideMustache` state.
        for (int i = 1; i < length; ++i) {
            char currentChar = template.charAt(i);
            char prevChar = template.charAt(i - 1);

            if (!isInsideMustache) {
                // Plain text.
                if (currentChar == '{' && prevChar == '{') {
                    isInsideMustache = true;
                    // Remove the `{` added to the builder.
                    currentToken.deleteCharAt(currentToken.length() - 1);
                    clearAndPushToken(currentToken, tokens);
                    currentToken.append(prevChar);
                    braceDepth = 2;
                }

                currentToken.append(currentChar);

            } else {
                // Javascript.
                if (quote != null) {
                    // We are inside a Javascript string.
                    if (currentChar == quote) {
                        // Count the backslashes before this quote and figure out if it is escaped.
                        int j = i;
                        do {
                            --j;
                        } while (template.charAt(j) == '\\');
                        int backslashCount = i - j - 1;
                        if (backslashCount % 2 == 0) {
                            // This quote character is not escaped, so it ends the quoted string.
                            quote = null;
                        }
                    }

                    currentToken.append(currentChar);

                } else if (currentChar == '"' || currentChar == '\'' || currentChar == '`') {
                    // This character starts a Javascript string.
                    quote = currentChar;
                    currentToken.append(currentChar);

                } else if (currentChar == '{') {
                    ++braceDepth;
                    currentToken.append(currentChar);

                } else if (currentChar == '}') {
                    --braceDepth;
                    currentToken.append(currentChar);
                    if (prevChar == '}' && braceDepth <= 0) {
                        clearAndPushToken(currentToken, tokens);
                        isInsideMustache = false;
                    }

                } else {
                    currentToken.append(currentChar);
                }

            }

        }

        if (currentToken.length() > 0) {
            tokens.add(currentToken.toString());
        }

        return tokens;
    }

    public static boolean isMustacheToken(String token) {
        return token.startsWith("{{") && token.endsWith("}}");
    }

    /**
     * Tokenize-s the given Mustache template string, extracts the Mustache interpolations out, strips the leading and
     * trailing double braces, trims and then returns a set of these replacement keys.
     *
     * @param template The Mustache input template string.
     * @return A Set of strings that serve as replacement keys, with the surrounding double braces stripped and then
     * trimmed.
     */
    public static Set<String> extractMustacheKeys(String template) {
        Set<String> keys = new HashSet<>();

        for (String token : tokenize(template)) {
            if (token.startsWith("{{") && token.endsWith("}}")) {
                // Allowing empty tokens to be added, to be compatible with the previous `extractMustacheKeys` method.
                // Calling `.trim()` before adding because Mustache compiler strips keys in the template before looking
                // up a value.
                keys.add(removeCurlyBraces(token));
            }
        }

        return keys;
    }

    public static Set<String> extractMustacheKeysWithCurlyBraces(String template) {

        Set<String> keys = new HashSet<>();
        for (String token : tokenize(template)) {
            if (token.startsWith("{{") && token.endsWith("}}")) {
                // Allowing empty tokens to be added, to be compatible with the previous `extractMustacheKeys` method.
                // Calling `.trim()` before adding because Mustache compiler strips keys in the template before looking
                // up a value.
                keys.add(token);
            }
        }

        return keys;
    }

    public static String removeCurlyBraces(String token) {
        return token.substring(2, token.length() - 2).trim();
    }

    // For prepared statements we should extract the bindings in order in a list and include duplicate bindings as well.
    public static List<String> extractMustacheKeysInOrder(String template) {
        List<String> keys = new ArrayList<>();

        for (String token : tokenize(template)) {
            if (token.startsWith("{{") && token.endsWith("}}")) {
                // Allowing empty tokens to be added, to be compatible with the previous `extractMustacheKeys` method.
                // Calling `.trim()` before adding because Mustache compiler strips keys in the template before looking
                // up a value.
                keys.add(removeCurlyBraces(token));
            }
        }

        return keys;
    }

    private static void clearAndPushToken(StringBuilder tokenBuilder, List<String> tokenList) {
        if (tokenBuilder.length() > 0) {
            tokenList.add(tokenBuilder.toString());
            tokenBuilder.setLength(0);
        }
    }

    public static String renderMustacheArrayJsonString(String jsonStr, Map<String, Object> paramMap) {
        if (isBlank(jsonStr)) {
            return "[]";
        }
        return RjsonMustacheParser.renderMustacheJsonString(jsonStr, paramMap);
    }

    public static String renderMustacheJsonString(String jsonStr, Map<String, Object> paramMap) {
        return RjsonMustacheParser.renderMustacheJsonString(jsonStr, paramMap);
    }

    public static JsonNode renderMustacheJson(String jsonStr, Map<String, ?> paramMap) {
        return RjsonMustacheParser.renderMustacheJson(jsonStr, paramMap);
    }

    public static String renderMustacheString(String template, Map<String, ?> paramMap) {
        if (isBlank(template)) {
            return template;
        }

        List<String> tokenize = tokenize(template);
        return renderMustacheTokens(tokenize, paramMap);
    }

    @SuppressWarnings("DuplicatedCode")
    public static String renderMustacheStringWithoutRemoveSurroundedPar(String template, Map<String, ?> paramMap) {
        if (isBlank(template)) {
            return template;
        }
        List<String> tokenize = tokenize(template);
        return renderMustacheTokens(tokenize, paramMap, false);
    }

    public static String[] renderMustacheArrayString(String[] template, Map<String, ?> paramMap) {
        return Arrays.stream(template)
                .map(s -> renderMustacheString(s, paramMap))
                .toArray(String[]::new);
    }

    public static String renderMustacheTokens(List<String> tokens, Map<String, ?> paramMap) {
        return renderMustacheTokens(tokens, paramMap, true);
    }

    @VisibleForTesting
    public static String renderMustacheTokens(List<String> tokens, Map<String, ?> paramMap, boolean removeSurroundedPar) {
        StringBuilder rendered = new StringBuilder();
        for (int i = 0; i < tokens.size(); i++) {
            String token = tokens.get(i);
            if (token.startsWith("{{") && token.endsWith("}}")) {
                Object mustacheValue = paramMap.get(token.substring(2, token.length() - 2).trim());
                String mustacheStrValue = convertToStringValue(mustacheValue);
                boolean isSurroundedByPar = isSurroundedByPar(tokens, i);
                if (removeSurroundedPar && isSurroundedByPar) {
                    removePreviousPar(rendered);
                    rendered.append(mustacheStrValue);
                    removeNextPar(tokens, i + 1);
                } else {
                    rendered.append(firstNonNull(mustacheStrValue, token)); // append original token is value is not found
                }
            } else {
                rendered.append(token);
            }
        }

        return StringEscapeUtils.unescapeHtml4(rendered.toString());
    }


    public static String replaceMustacheWithQuestionMarkMore(String query, List<String> mustacheBindings, Map<String, Object> param) {
        Map<String, String> replaceParamsMap =
                mustacheBindings.stream().collect(Collectors.toMap(Function.identity(), v -> SPECIAL_STRING_4_PREPARED_STATEMENT, (a, b) -> b));
        query = renderMustacheString(query, replaceParamsMap);
        String s = processMoreThanQuestionsInsideQuote(query, mustacheBindings, param, 0);
        return s.replace(SPECIAL_CHAR_4_PREPARED_STATEMENT, '?');
    }

    public static String doPrepareStatement(String sql, List<String> mustacheKeys, Map<String, Object> param) {
        Map<String, String> replaceParamsMap = collectMap(mustacheKeys, Function.identity(), v -> SPECIAL_STRING_4_PREPARED_STATEMENT);
        sql = renderMustacheString(sql, replaceParamsMap);
        sql = processMoreThanQuestionsInsideQuote(sql, mustacheKeys, param, 0);

        try {
            sql = replaceParamWithInOperator(sql, mustacheKeys, param);
        } catch (Exception e) {
            throw new PluginException(SQL_IN_OPERATOR_PARSE_ERROR, "SQL_IN_OPERATOR_PARSE_ERROR", e.getMessage());
        }
        return sql.replace(SPECIAL_CHAR_4_PREPARED_STATEMENT, '?');
    }

    private static String replaceParamWithInOperator(String sql, List<String> mustacheKeys, Map<String, Object> param) {

        if (CollectionUtils.isEmpty(mustacheKeys)) {
            return sql;
        }

        List<Integer> mustachePositions = getMustachePositions(sql);

        int startPos = 0;
        List<Integer> toRemoveParamIndexes = newArrayList();
        StringBuilder sqlStringBuilder = new StringBuilder();
        for (int i = 0; i < mustachePositions.size(); i++) {

            Object o = param.get(mustacheKeys.get(i));
            int currentPos = mustachePositions.get(i);

            if (!(o instanceof Collection<?>)) { // skip if it's not a collection
                sqlStringBuilder.append(substring(sql, startPos, currentPos + 1));
                startPos = currentPos + 1;
                continue;
            }

            int rightParIndex = findRightParIndex(sql, currentPos + 1);
            if (rightParIndex == -1) { // skip if ")" is not found
                sqlStringBuilder.append(substring(sql, startPos, currentPos + 1));
                startPos = currentPos + 1;
                continue;
            }

            String substring = substring(sql, startPos, rightParIndex + 1);
            if (!matchInOperatorPattern(substring)) { // skip if it's not in "xxx in (?)" format
                sqlStringBuilder.append(substring(sql, startPos, currentPos + 1));
                startPos = currentPos + 1;
                continue;
            }

            String jsonArray = toJson(o); // remove "[]" after toJson, and replace current sql param
            sqlStringBuilder.append(substring(sql, startPos, currentPos))
                    .append(substring(jsonArray, 1, jsonArray.length() - 1))
                    .append(") ");
            startPos = rightParIndex + 1;
            toRemoveParamIndexes.add(i);
        }

        sqlStringBuilder.append(substring(sql, startPos, sql.length())); // append rest sql string
        removeReplacedKeys(mustacheKeys, toRemoveParamIndexes);
        return sqlStringBuilder.toString();
    }

    private static void removeReplacedKeys(List<String> mustacheKeys, List<Integer> toRemoveParamIndexes) {
        toRemoveParamIndexes.stream()
                .sorted(Comparator.reverseOrder())
                .forEach(index -> mustacheKeys.remove((int) index));
    }

    private static boolean matchInOperatorPattern(String substring) {
        return MYSQL_IN_OPERATOR_PATTERN.matcher(substring).find();
    }

    @Nonnull
    private static List<Integer> getMustachePositions(String s) {
        List<Integer> mustachePositions = newArrayList();
        int startIndex = 0;
        while (true) {
            int index = s.indexOf(SPECIAL_CHAR_4_PREPARED_STATEMENT, startIndex);
            if (index == -1) {
                break;
            }
            mustachePositions.add(index);
            startIndex = index + 1;
        }
        return mustachePositions;
    }

    private static int findRightParIndex(String str, int index) {
        for (int j = index; j < str.length(); j++) {
            char ch = str.charAt(j);
            if (Character.isWhitespace(ch)) {
                continue;
            }
            if (ch == ')') {
                return j;
            }
            return -1;
        }
        return -1;
    }


    /**
     * users tend to add quotes for sql params, here we treat param between quotes as a single param
     * e.g.
     * select * from user where name like '?%';                        => select * from user where name like ?;
     * select * from user where name like '%?%?%';                     => select * from user where name like ?;
     * select * from user where name like '"?%"';                      => select * from user where name like ?;
     * select * from user where name like '?%' and name like '%?';     => select * from user where name like ? and name like ?;
     */
    private static String processMoreThanQuestionsInsideQuote(String query, List<String> bindingKeys, Map<String, Object> params,
            int generateKeyNumber) {

        Map<Integer, Integer> questionPositionIndexMap = getQuestionPositionIndexMap(query);

        // find quote pair containing ?
        Range<Integer> range = findQuotePairWithQuestionInside(query);
        if (range.getMinimum() == -1) {
            return query;
        }

        // get ? indexes
        List<Integer> questionIndexes = new ArrayList<>();
        for (int i = range.getMinimum(); i < range.getMaximum(); i++) {
            if (query.charAt(i) == SPECIAL_CHAR_4_PREPARED_STATEMENT) {
                questionIndexes.add(questionPositionIndexMap.get(i));
            }
        }
        String quoteString = query.substring(range.getMinimum(), range.getMaximum());
        // combine all "?"s into one "?"
        query = query.substring(0, range.getMinimum()) + SPECIAL_CHAR_4_PREPARED_STATEMENT + query.substring(range.getMaximum());
        String value = generateNewValue(bindingKeys, params, questionIndexes, quoteString);

        // generate a new binding key for new "?"
        String key = "generateKey_" + generateKeyNumber;
        params.put(key, value);
        updateBindingKeys(bindingKeys, questionIndexes, key);

        return processMoreThanQuestionsInsideQuote(query, bindingKeys, params, generateKeyNumber + 1);
    }

    private static void updateBindingKeys(List<String> bindingKeys, List<Integer> questionIndexes, String key) {
        Integer lastQuestionIndex = Iterables.getLast(questionIndexes);
        bindingKeys.add(lastQuestionIndex + 1, key);

        // remove original binding keys
        Collections.reverse(questionIndexes);
        for (int questionIndex : questionIndexes) {
            bindingKeys.remove(questionIndex);//remove by index
        }
    }

    @NotNull
    private static String generateNewValue(List<String> bindingKeys, Map<String, Object> params, List<Integer> questionIndexes, String quoteString) {
        // remove quotes
        String value = quoteString.substring(1, quoteString.length() - 1);
        // replace ? value one by one
        for (int questionIndex : questionIndexes) {
            Object valueObj = params.get(bindingKeys.get(questionIndex));
            if (valueObj == null) {
                value = value.replaceFirst(SPECIAL_STRING_4_PREPARED_STATEMENT, "");
                continue;
            }
            if (valueObj instanceof Number || valueObj instanceof Boolean || valueObj instanceof String) {
                value = value.replaceFirst(SPECIAL_STRING_4_PREPARED_STATEMENT, valueObj.toString());
                continue;
            }
            value = value.replaceFirst(SPECIAL_STRING_4_PREPARED_STATEMENT, JsonUtils.toJson(valueObj));
        }
        return value;
    }

    @NotNull
    private static Map<Integer, Integer> getQuestionPositionIndexMap(String query) {
        // key: string index of "?", value: nth of "?"
        Map<Integer, Integer> questionPositionIndexMap = new HashMap<>();
        int count = 0;
        for (int i = 0; i < query.length(); i++) {
            if (query.charAt(i) == SPECIAL_CHAR_4_PREPARED_STATEMENT) {
                questionPositionIndexMap.put(i, count++);
            }
        }
        return questionPositionIndexMap;
    }

    private static Range<Integer> findQuotePairWithQuestionInside(String query) {
        int startIndex = 0;
        while (true) {
            Range<Integer> range = findQuotePair(query, startIndex);
            if (range.getMinimum() == -1) {
                return range;
            }
            if (query.substring(range.getMinimum(), range.getMaximum()).contains(SPECIAL_STRING_4_PREPARED_STATEMENT)) {
                return range;
            }
            startIndex = range.getMaximum() + 1;
        }
    }

    private static Range<Integer> findQuotePair(String query, int startIndex) {
        char quote = 0; // not quote
        int start = -1;
        for (int i = startIndex; i < query.length(); i++) {
            if (!isQuote(query, i)) {
                continue;
            }

            if (quote == 0) {
                quote = query.charAt(i);
                start = i;
            } else {
                if (query.charAt(i) == quote) {
                    return Range.between(start, i + 1);
                }
            }
        }
        return Range.between(-1, -1);
    }

    private static boolean isQuote(String query, int index) {
        char c = query.charAt(index);
        return (c == '\'' || c == '"') && !isEscape(query, index);
    }

    private static boolean isEscape(String query, int index) {
        int count = 0;
        for (int i = index - 1; i >= 0; i--) {
            if (query.charAt(i) != '\\') {
                break;
            }
            count++;
        }
        // escape when odd count found
        return count % 2 == 1;
    }

    private static String convertToStringValue(Object mustacheValue) {
        if (mustacheValue == null) {
            return "";
        }

        if (mustacheValue instanceof Collection<?> || mustacheValue instanceof Map<?, ?>) {
            return toJson(mustacheValue);
        }

        return String.valueOf(mustacheValue);
    }

    private static void removeNextPar(List<String> tokenize, int index) {
        tokenize.set(index, tokenize.get(index).substring(1));
    }

    private static void removePreviousPar(StringBuilder rendered) {
        rendered.deleteCharAt(rendered.length() - 1);
    }

    private static boolean isSurroundedByPar(List<String> tokenize, int index) {
        if (index <= 0 || index >= tokenize.size() - 1) {
            return false;
        }

        return tokenize.get(index - 1).endsWith("\"") && tokenize.get(index + 1).startsWith("\"");
    }

}
