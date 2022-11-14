package com.openblocks.domain.datasource.model;

import java.util.Map;

import org.springframework.data.mongodb.core.mapping.Document;

import com.openblocks.sdk.models.HasIdAndAuditing;

import lombok.Getter;
import lombok.Setter;

/**
 * token based plugin needs to save user token for future reuse
 */
@Document(collection = "tokenBasedConnection")
@Getter
@Setter
public class TokenBasedConnectionDO extends HasIdAndAuditing {

    private String datasourceId;
    private Map<String, Object> tokenDetail;

}
