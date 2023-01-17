package com.openblocks.domain.datasource.model;

public class StatelessDatasourceConnectionHolder implements DatasourceConnectionHolder {

    private static final Object CONNECTION = new Object();

    @Override
    public void onQueryError(Throwable throwable) {
    }

    @Override
    public Object connection() {
        return CONNECTION;
    }
}
