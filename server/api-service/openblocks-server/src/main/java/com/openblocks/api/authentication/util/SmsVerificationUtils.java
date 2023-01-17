package com.openblocks.api.authentication.util;

import java.util.Random;

public class SmsVerificationUtils {

    private static final int VERIFY_SIZE = 6;
    private static final String NUMBER_VERIFY_CODES = "012356789";
    public static final int VERIFY_CODE_EXPIRE_MINUTES = 10;

    public static String genVerificationCode() {
        int codesLen = NUMBER_VERIFY_CODES.length();
        Random rand = new Random();
        StringBuilder verifyCode = new StringBuilder(VERIFY_SIZE);
        for (int i = 0; i < VERIFY_SIZE; i++) {
            verifyCode.append(NUMBER_VERIFY_CODES.charAt(rand.nextInt(codesLen - 1)));
        }
        return verifyCode.toString();
    }

}
