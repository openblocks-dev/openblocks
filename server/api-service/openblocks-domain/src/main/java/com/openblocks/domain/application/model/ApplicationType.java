package com.openblocks.domain.application.model;

import java.util.Arrays;

import lombok.Getter;

@Getter
public enum ApplicationType {
    APPLICATION(1),
    MODULE(2),
    COMPOUND_APPLICATION(3);

    private final int value;

    ApplicationType(int value) {
        this.value = value;
    }

    public static ApplicationType fromValue(int value) {
        return Arrays.stream(values())
                .filter(it -> it.value == value)
                .findFirst()
                .orElse(null);
    }

}
