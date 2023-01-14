package com.openblocks.api.query.view;

import static com.openblocks.sdk.util.StreamUtils.toMapNullFriendly;
import static org.apache.commons.collections4.ListUtils.emptyIfNull;

import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;

import com.openblocks.sdk.models.Param;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LibraryQueryRequestFromJs {

    private String libraryQueryName;

    private String libraryQueryRecordId;

    private List<Param> params;

    public Map<String, Object> paramMap() {
        return emptyIfNull(params).stream()
                .filter(it -> StringUtils.isNotBlank(it.getKey()))
                .collect(toMapNullFriendly(param -> param.getKey().trim(), Param::getValue, (a, b) -> b));
    }

}
