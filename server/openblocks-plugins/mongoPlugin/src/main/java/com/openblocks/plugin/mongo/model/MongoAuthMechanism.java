package com.openblocks.plugin.mongo.model;

public enum MongoAuthMechanism {
    SCRAM_SHA_1("SCRAM-SHA-1"),
    SCRAM_SHA_256("SCRAM-SHA-256"),
    MONGODB_CR("MONGODB-X509");

    private final String value;

    MongoAuthMechanism(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

}