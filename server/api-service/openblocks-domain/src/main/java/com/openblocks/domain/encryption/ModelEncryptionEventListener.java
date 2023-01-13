package com.openblocks.domain.encryption;

import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.AfterConvertEvent;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ModelEncryptionEventListener<E> extends AbstractMongoEventListener<E> {

    private final EncryptionService encryptionService;

    public ModelEncryptionEventListener(EncryptionService encryptionService) {
        this.encryptionService = encryptionService;
    }

    @Override
    public void onBeforeConvert(BeforeConvertEvent<E> event) {
        E source = event.getSource();

        if (source instanceof EncryptRequired encryptRequired) {
            encryptRequired.encrypt(encryptionService);
        }
    }

    @Override
    public void onAfterConvert(AfterConvertEvent<E> event) {
        E source = event.getSource();

        if (source instanceof DecryptRequired decryptRequired) {
            decryptRequired.decrypt(encryptionService);
        }
    }

}
