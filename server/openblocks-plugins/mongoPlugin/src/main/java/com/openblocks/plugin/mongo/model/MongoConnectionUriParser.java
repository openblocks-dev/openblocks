package com.openblocks.plugin.mongo.model;

import static com.openblocks.sdk.exception.PluginCommonError.DATASOURCE_ARGUMENT_ERROR;
import static com.openblocks.sdk.util.ExceptionUtils.ofPluginException;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;

public final class MongoConnectionUriParser {

    /*
     * - The regex matches the following two pattern types:
     *   - mongodb+srv://user:pass@some-url/some-db...
     *   - mongodb://user:pass@some-url:port,some-url:port,.../some-db...
     * - It has been grouped like this: (mongodb+srv://)(user):(pass)@(some-url)/(some-db...)?(params...)
     *
     * ^(mongodb(?:\+srv)?:\/\/)(?:(.+):(.+)@)?([^\/\?]+)\/?([^\?]+)?\??(.+)?$
     */
    public static final String MONGO_URI_REGEX = "^(mongodb(?:\\+srv)?://)(?:(.+):(.+)@)?([^/?]+)/?([^?]+)?\\??(.+)?$";

    private static final Pattern PATTERN = Pattern.compile(MONGO_URI_REGEX);

    private static final int REGEX_GROUP_HEAD = 1;

    private static final int REGEX_GROUP_USERNAME = 2;

    private static final int REGEX_GROUP_PASSWORD = 3;

    private static final int REGEX_HOST_PORT = 4;

    private static final int REGEX_GROUP_DBNAME = 5;

    private static final int REGEX_GROUP_TAIL = 6;

    private static final String KEY_USERNAME = "username";

    private static final String KEY_PASSWORD = "password";

    private static final String KEY_HOST_PORT = "hostPort";

    private static final String KEY_URI_HEAD = "uriHead";

    private static final String KEY_URI_TAIL = "uriTail";

    private static final String KEY_URI_DBNAME = "dbName";

    public static boolean isValid(String uri) {
        return PATTERN.asMatchPredicate().test(uri);
    }

    public static Map<String, String> extractInfoFromConnectionStringURI(String uri) {
        if (!uri.matches(MONGO_URI_REGEX)) {
            return null;
        }

        Matcher matcher = PATTERN.matcher(uri);
        if (matcher.find()) {
            Map<String, String> extractedInfoMap = new HashMap<>();
            extractedInfoMap.put(KEY_URI_HEAD, matcher.group(REGEX_GROUP_HEAD));
            extractedInfoMap.put(KEY_USERNAME, matcher.group(REGEX_GROUP_USERNAME));
            extractedInfoMap.put(KEY_PASSWORD, matcher.group(REGEX_GROUP_PASSWORD));
            extractedInfoMap.put(KEY_HOST_PORT, matcher.group(REGEX_HOST_PORT));
            extractedInfoMap.put(KEY_URI_DBNAME, matcher.group(REGEX_GROUP_DBNAME));
            extractedInfoMap.put(KEY_URI_TAIL, matcher.group(REGEX_GROUP_TAIL));
            return extractedInfoMap;
        }

        return null;
    }

    public static String parseDatabaseFrom(String uri) {
        Map<String, String> extractedInfo = extractInfoFromConnectionStringURI(uri);
        if (extractedInfo == null) {
            throw ofPluginException(DATASOURCE_ARGUMENT_ERROR, "INVALID_MONGODB_URI");
        }

        String database = extractedInfo.get(KEY_URI_DBNAME);
        if (StringUtils.isBlank(database)) {
            throw ofPluginException(DATASOURCE_ARGUMENT_ERROR, "MONGODB_DATABASE_EMPTY");
        }
        return database;
    }

}
