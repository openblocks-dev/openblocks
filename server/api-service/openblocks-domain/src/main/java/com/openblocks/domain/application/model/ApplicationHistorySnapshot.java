package com.openblocks.domain.application.model;

import java.util.Map;

import org.springframework.data.mongodb.core.mapping.Document;

import com.openblocks.sdk.models.HasIdAndAuditing;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString(callSuper = true)
@Document
@Getter
@Setter
public class ApplicationHistorySnapshot extends HasIdAndAuditing {

    private String applicationId;
    private Map<String, Object> dsl;
    private Map<String, Object> context;

}
