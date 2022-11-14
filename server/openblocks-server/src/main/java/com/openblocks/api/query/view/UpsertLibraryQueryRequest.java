package com.openblocks.api.query.view;

import java.util.Map;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpsertLibraryQueryRequest {

    private String name;
    private Map<String, Object> libraryQueryDSL;

}
