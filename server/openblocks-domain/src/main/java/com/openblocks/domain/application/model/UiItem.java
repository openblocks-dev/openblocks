package com.openblocks.domain.application.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;

@Builder
public record UiItem(String compType, Comp comp) {

    @JsonCreator
    public UiItem(@JsonProperty("compType") String compType, @JsonProperty("comp") Comp comp) {
        this.compType = compType;
        this.comp = comp;
    }


    public record Comp(String appId) {
    }
}
