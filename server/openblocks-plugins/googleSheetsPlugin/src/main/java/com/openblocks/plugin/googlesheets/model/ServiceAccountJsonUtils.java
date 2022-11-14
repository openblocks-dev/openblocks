package com.openblocks.plugin.googlesheets.model;

import java.util.Map;

import com.openblocks.sdk.util.JsonUtils;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ServiceAccountJsonUtils {
    private String clientId;
    private String clientEmail;
    private String privateKeyPkcs8;
    private String privateKeyId;

    public void getData(String jsonStr) {
        Map<String, Object> map = JsonUtils.fromJsonMap(jsonStr);
        clientId = (String) map.get("client_id");
        clientEmail = (String) map.get("client_email");
        privateKeyPkcs8 = (String) map.get("private_key");
        privateKeyId = (String) map.get("private_key_id");
    }

    @Override
    public String toString() {
        return "ServiceAccountJsonUtils{" +
                "clientId='" + clientId + '\'' +
                ", clientEmail='" + clientEmail + '\'' +
                ", privateKeyPkcs8='" + privateKeyPkcs8 + '\'' +
                ", privateKeyId='" + privateKeyId + '\'' +
                '}';
    }
}
