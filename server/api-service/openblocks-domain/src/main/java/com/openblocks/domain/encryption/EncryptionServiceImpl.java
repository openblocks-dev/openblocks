package com.openblocks.domain.encryption;

import org.apache.commons.codec.binary.Hex;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.encrypt.Encryptors;
import org.springframework.security.crypto.encrypt.TextEncryptor;
import org.springframework.stereotype.Service;

import com.openblocks.sdk.config.CommonConfig;
import com.openblocks.sdk.config.CommonConfig.Encrypt;

@Service
public class EncryptionServiceImpl implements EncryptionService {

    private final TextEncryptor textEncryptor;
    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Autowired
    public EncryptionServiceImpl(CommonConfig commonConfig) {
        Encrypt encrypt = commonConfig.getEncrypt();
        String saltInHex = Hex.encodeHexString(encrypt.getSalt().getBytes());
        this.textEncryptor = Encryptors.text(encrypt.getPassword(), saltInHex);
    }

    @Override
    public String encryptString(String plaintext) {
        if (StringUtils.isEmpty(plaintext)) {
            return plaintext;
        }
        return textEncryptor.encrypt(plaintext);
    }

    @Override
    public String decryptString(String encryptedText) {
        if (StringUtils.isEmpty(encryptedText)) {
            return encryptedText;
        }
        return textEncryptor.decrypt(encryptedText);
    }

    @Override
    public String encryptPassword(String plaintext) {
        if (StringUtils.isEmpty(plaintext)) {
            return StringUtils.EMPTY;
        }
        return bCryptPasswordEncoder.encode(plaintext);
    }

    @Override
    public boolean matchPassword(String rawPassword, String encodedPassword) {
        return bCryptPasswordEncoder.matches(rawPassword, encodedPassword);
    }
}
