package com.openblocks.domain.mongodb;

import com.openblocks.domain.encryption.EncryptionService;

public record MongodbInterceptorContext(EncryptionService encryptionService) {
}
