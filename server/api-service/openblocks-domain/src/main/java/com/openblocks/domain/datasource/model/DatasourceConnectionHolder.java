package com.openblocks.domain.datasource.model;

public interface DatasourceConnectionHolder {

    /**
     * return connection object created by datasource plugin
     */
    Object connection();

    void onQueryError(Throwable throwable);

}
