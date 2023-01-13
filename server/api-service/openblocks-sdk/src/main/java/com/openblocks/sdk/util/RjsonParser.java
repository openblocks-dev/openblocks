package com.openblocks.sdk.util;

import javax.annotation.Nonnull;

import tv.twelvetone.json.JsonValue;
import tv.twelvetone.rjson.RJsonParser;
import tv.twelvetone.rjson.RJsonParserFactory;

public class RjsonParser {

    private static final RJsonParserFactory RJSON_PARSER_FACTORY = new RJsonParserFactory();

    public static JsonValue parse(String jsonStr) throws Throwable {
        return getJsonParser().stringToValue(jsonStr);
    }

    @Nonnull
    private static RJsonParser getJsonParser() {
        return RJSON_PARSER_FACTORY.createParser();
    }
}
