package com.openblocks.domain.datasource.model;

import com.openblocks.sdk.models.HasIdAndAuditing;
import com.openblocks.sdk.models.TokenBasedConnectionDetail;

import lombok.Getter;
import lombok.Setter;

/**
 * token based plugin needs to save user token for future reuse
 */
@Getter
@Setter
public class TokenBasedConnection extends HasIdAndAuditing {

    private String datasourceId;
    private TokenBasedConnectionDetail tokenDetail;

    public boolean isStale() {
        return tokenDetail.isStale();
    }
}
