package com.openblocks.domain.encryption;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
public class EncryptionServiceTest {

    @Autowired
    private EncryptionService encryptionService;

    @Test
    public void encryptPassword() {
        System.out.println(encryptionService.encryptPassword("love u 3000 times"));
        Assert.assertTrue(encryptionService.matchPassword("hail hydra", "$2a$10$9ZAsa5Jw86oHdzHAwtEFHuyOFYGdhnNgSXKll1gOrPEtxpTNrffci"));
    }
}