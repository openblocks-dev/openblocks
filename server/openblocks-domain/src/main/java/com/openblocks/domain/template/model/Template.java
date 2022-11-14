package com.openblocks.domain.template.model;

import org.springframework.data.mongodb.core.mapping.Document;

import com.openblocks.sdk.models.HasIdAndAuditing;

import lombok.Getter;

@Document
@Getter
public class Template extends HasIdAndAuditing {

    private String name;
    private String applicationId; // id of application referenced by this template
}
