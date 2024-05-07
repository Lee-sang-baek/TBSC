package com.tbsc.sms;

import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class VerificationStorage {
    private final Map<String, String> verificationCodes = new ConcurrentHashMap<>();

    public void saveVerificationCode(String phoneNumber, String verificationCode) {
        verificationCodes.put(phoneNumber, verificationCode);
    }

    public boolean verifyCode(String phoneNumber, String verificationCode) {
        String storedCode = verificationCodes.get(phoneNumber);
        return verificationCode.equals(storedCode);
    }
}
