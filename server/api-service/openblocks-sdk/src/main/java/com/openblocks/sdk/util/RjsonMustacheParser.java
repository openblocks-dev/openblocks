package com.openblocks.sdk.util;

import static com.openblocks.sdk.exception.PluginCommonError.JSON_PARSE_ERROR;
import static com.openblocks.sdk.util.JsonUtils.EMPTY_JSON_NODE;
import static com.openblocks.sdk.util.JsonUtils.createArrayNode;
import static com.openblocks.sdk.util.JsonUtils.createObjectNode;
import static com.openblocks.sdk.util.JsonUtils.valueToTree;
import static com.openblocks.sdk.util.MustacheHelper.isMustacheToken;
import static com.openblocks.sdk.util.MustacheHelper.removeCurlyBraces;
import static com.openblocks.sdk.util.MustacheHelper.tokenize;
import static com.openblocks.sdk.util.StreamUtils.toMapNullFriendly;
import static org.apache.commons.lang3.StringUtils.isBlank;
import static org.apache.commons.lang3.StringUtils.replace;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.atomic.AtomicInteger;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.BooleanNode;
import com.fasterxml.jackson.databind.node.DoubleNode;
import com.fasterxml.jackson.databind.node.FloatNode;
import com.fasterxml.jackson.databind.node.IntNode;
import com.fasterxml.jackson.databind.node.LongNode;
import com.fasterxml.jackson.databind.node.NullNode;
import com.fasterxml.jackson.databind.node.TextNode;
import com.openblocks.sdk.exception.PluginException;

import tv.twelvetone.json.Json;
import tv.twelvetone.json.JsonObject.Member;
import tv.twelvetone.json.JsonValue;

class RjsonMustacheParser {

    private static final String REPLACE_TOKEN = "#replace";

    public static String renderMustacheJsonString(String jsonStr, Map<String, Object> paramMap) {
        return renderMustacheJson(jsonStr, paramMap).toString();
    }

    public static JsonNode renderMustacheJson(String jsonStr, Map<String, ?> paramMap) {
        if (StringUtils.isBlank(jsonStr)) {
            return EMPTY_JSON_NODE;
        }

        List<String> tokens = tokenize(jsonStr.trim());
        // handle cases like " {{ map }} " / "2022-05-05 11:12:13"
        if (tokens.size() == 1) {
            String oneTokenStr = tokens.get(0);
            if (isMustacheToken(oneTokenStr)) {
                Object value = paramMap.get(removeCurlyBraces(oneTokenStr));
                return convertToJsonNode(value);
            }

            try {
                return traverse(RjsonParser.parse(oneTokenStr), Map.of());
            } catch (Throwable e) {
                // return as a textNode if fails to parse
                return TextNode.valueOf(oneTokenStr);
            }
        }

        Map<String, String> tokenReplaceMap = new HashMap<>();

        String escapeEvaluatedTokens = escapeEvaluatedTokens(tokenReplaceMap, tokens);

        Map<String, Object> tokenReplaceValueMap = getTokenReplaceValueMap(paramMap, tokenReplaceMap);

        JsonValue json;
        try {
            json = RjsonParser.parse(escapeEvaluatedTokens);
        } catch (Throwable e) {
            throw new PluginException(JSON_PARSE_ERROR, "JSON_PARSE_ERROR", escapeEvaluatedTokens, e.getMessage());
        }

        return traverse(json, tokenReplaceValueMap);
    }

    private static Map<String, Object> getTokenReplaceValueMap(Map<String, ?> paramMap, Map<String, String> tokenReplaceMap) {
        Map<String, Object> trimmedValueMap = paramMap.entrySet()
                .stream()
                .collect(toMapNullFriendly(it -> it.getKey().trim(), Entry::getValue, (a, b) -> b));
        return tokenReplaceMap.entrySet()
                .stream()
                .collect(toMapNullFriendly(Entry::getValue, entry -> trimmedValueMap.get(entry.getKey())));
    }

    private static JsonNode traverse(JsonValue jsonValue, Map<String, Object> paramMap) {

        if (jsonValue.isBoolean()) {
            return BooleanNode.valueOf(jsonValue.asBoolean());
        }

        if (jsonValue.isNull()) {
            return NullNode.getInstance();
        }

        if (jsonValue.isNumber()) {
            String s = jsonValue.toString();
            Number number = NumberUtils.createNumber(s);
            return tryGetNumberNode(number);
        }

        if (jsonValue.isArray()) {

            ArrayNode newArrayNode = createArrayNode();

            for (JsonValue node : jsonValue.asArray()) {
                newArrayNode.add(traverse(node, paramMap));
            }

            return newArrayNode;
        }

        if (jsonValue.isObject()) {
            var objectNode = createObjectNode();
            for (Member member : jsonValue.asObject()) {
                String name = member.getName();
                JsonValue value = member.getValue();

                String updatedName = tryResolveAsString(name, paramMap);
                objectNode.set(updatedName, traverse(value, paramMap));
            }
            return objectNode;
        }

        return tryResolve(jsonValue, paramMap, false);
    }

    private static String tryResolveAsString(String input, Map<String, Object> paramMap) {
        JsonNode jsonNode = tryResolve(Json.INSTANCE.value(input), paramMap, true);
        return jsonNode.textValue();
    }

    private static JsonNode tryResolve(JsonValue jsonValue, Map<String, Object> paramMap, boolean toStringType) {

        String input = jsonValue.asString().trim();
        if (isBlank(input)) {
            return TextNode.valueOf(input);
        }

        var checkStringResult = checkString(input);
        if (checkStringResult.isRawStr()) {
            return TextNode.valueOf(input);
        }

        if (toStringType || checkStringResult.isQuotedStr()) {
            return TextNode.valueOf(MustacheHelper.renderMustacheString(checkStringResult.result(), paramMap));
        }

        List<String> tokenize = tokenize(input);
        if (tokenize.isEmpty()) {
            return TextNode.valueOf(input);
        }

        if (tokenize.size() == 1) {
            String token = tokenize.get(0);
            if (token.startsWith("{{") && token.endsWith("}}")) {
                Object mustacheValue = paramMap.get(token.substring(2, token.length() - 2).trim());
                return convertToJsonNode(mustacheValue);
            }
        }

        return TextNode.valueOf(MustacheHelper.renderMustacheTokens(tokenize, paramMap));
    }

    private static JsonNode convertToJsonNode(Object mustacheValue) {
        if (mustacheValue == null) {
            return NullNode.getInstance();
        }

        if (mustacheValue instanceof Collection<?> || mustacheValue instanceof Map<?, ?>) {
            return valueToTree(mustacheValue);
        }

        if (mustacheValue instanceof Number) {
            return tryGetNumberNode(mustacheValue);
        }

        if (mustacheValue instanceof Boolean) {
            return BooleanNode.valueOf((boolean) mustacheValue);
        }

        return TextNode.valueOf(mustacheValue.toString());
    }

    @Nullable
    private static JsonNode tryGetNumberNode(Object number) {
        if (number instanceof Integer) {
            return IntNode.valueOf((int) number);
        }

        if (number instanceof Long) {
            return LongNode.valueOf((long) number);
        }

        if (number instanceof Float) {
            return FloatNode.valueOf((float) number);
        }

        if (number instanceof Double) {
            return DoubleNode.valueOf((double) number);
        }
        throw new PluginException(JSON_PARSE_ERROR, "JSON_PARSE_ERROR", number, "unknown number node: " + number.getClass().getSimpleName());
    }

    private static StringCheckResult checkString(String str) {
        String escapedLeftPar = "\\{\\{";
        String escapedRightPar = "\\}\\}";
        if (str.contains(escapedLeftPar) && str.contains(escapedRightPar)) {
            var newStr = replace(str, escapedLeftPar, "{{");
            newStr = replace(newStr, escapedRightPar, "}}");
            return new StringCheckResult(2, newStr);
        }

        if (str.contains("{{") && str.contains("}}")) {
            return new StringCheckResult(1, str);
        }
        return new StringCheckResult(0, str);
    }

    private record StringCheckResult(int type, String result) {

        public boolean isRawStr() {
            return type == 0;
        }

        public boolean isQuotedStr() {
            return type == 2;
        }
    }


    @Nonnull
    private static String escapeEvaluatedTokens(Map<String, String> tokenReplaceMap, List<String> tokens) {

        StringBuilder result = new StringBuilder();

        AtomicInteger replaceCount = new AtomicInteger();

        for (String token : tokens) {
            if (MustacheHelper.isMustacheToken(token)) {
                String tokenKey = token.substring(2, token.length() - 2).trim();

                String replaceToken = tokenReplaceMap.computeIfAbsent(tokenKey, ignore -> generateToken(replaceCount));
                result.append("\\{\\{").append(replaceToken).append("\\}\\}");
                continue;
            }
            result.append(token);
        }

        return result.toString();
    }

    @Nonnull
    private static String generateToken(AtomicInteger replaceCount) {
        return REPLACE_TOKEN + replaceCount.getAndIncrement();
    }

}
