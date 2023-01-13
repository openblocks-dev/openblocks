package com.openblocks.impl.mock;

public class MockConnection {

    private boolean close = false;

    public void close() {
        close = true;
    }

    public boolean isClose() {
        return close;
    }
}
