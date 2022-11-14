package com.openblocks.sdk.plugin.restapi;

import static com.google.common.base.Strings.nullToEmpty;
import lombok.Setter;

@Setter
public class MultipartFormData {
    private String name;
    private String data;

    public String getName() {
        return nullToEmpty(name);
    }

    public String getData() {
        return data;
    }
}
