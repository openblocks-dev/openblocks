package com.openblocks.sdk.models;

import java.time.Instant;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.domain.Persistable;
import org.springframework.data.mongodb.core.index.Indexed;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 *
 */
@Getter
@Setter
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
public abstract class HasIdAndAuditing implements Persistable<String>, VersionedModel {

    private static final long serialVersionUID = 7459916000501322717L;

    @Id
    @JsonProperty(index = 1)
    private String id;

    @CreatedDate
    @JsonIgnore
    protected Instant createdAt;

    @Indexed
    @JsonIgnore
    @LastModifiedDate
    protected Instant updatedAt;

    @CreatedBy
    protected String createdBy;

    @JsonIgnore
    @LastModifiedBy
    protected String modifiedBy;

    @JsonIgnore
    @Override
    public boolean isNew() {
        return this.getId() == null;
    }


}
