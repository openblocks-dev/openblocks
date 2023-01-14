package com.openblocks.domain.encryption;

public interface EncryptionService {

    String encryptString(String plaintext);

    String decryptString(String encryptedText);

    String encryptPassword(String plaintext);

    boolean matchPassword(String password1, String password2);

}
