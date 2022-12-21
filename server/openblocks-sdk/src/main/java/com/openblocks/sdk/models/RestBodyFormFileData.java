package com.openblocks.sdk.models;

import java.util.List;

import com.openblocks.sdk.plugin.restapi.DataUtils.MultipartFormDataType;
import com.openblocks.sdk.plugin.restapi.MultipartFormData;

public class RestBodyFormFileData extends Property {

    private List<MultipartFormData> fileData;

    public RestBodyFormFileData(String key, String value) {
        super(key, value);
    }

    public RestBodyFormFileData(String key, String value, String type) {
        super(key, value, type);
    }

    public RestBodyFormFileData(String key, List<MultipartFormData> fileData) {
        super(key, null, MultipartFormDataType.FILE.name());
        this.fileData = fileData;
    }

    public List<MultipartFormData> getFileData() {
        return fileData;
    }
}
