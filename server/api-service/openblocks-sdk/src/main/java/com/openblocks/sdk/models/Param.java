package com.openblocks.sdk.models;

import java.io.Serializable;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class Param implements Serializable {

    String key;

    Object value;

    public Param(String key, Object value) {
        this.key = key;
        this.value = value;
    }

    public static Param of(String key, Object value) {
        return new Param(key, value);
    }
}
