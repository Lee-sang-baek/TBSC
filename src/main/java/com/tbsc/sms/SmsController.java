package com.tbsc.sms;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/sms")
@RequiredArgsConstructor
public class SmsController {

    private final SmsUtil smsUtil;

    private final VerificationStorage verificationStorage;

    @PostMapping("/send")
    public ResponseEntity<?> sendSms(@RequestBody Map<String, String> request) {
        String phoneNumber = request.get("phoneNumber");
        String verificationCode = generateVerificationCode();
        smsUtil.sendOne(phoneNumber, verificationCode);
        verificationStorage.saveVerificationCode(phoneNumber, verificationCode);
        return ResponseEntity.ok("SMS 전송 성공");
    }

    private String generateVerificationCode() {
        return Integer.toString((int) (Math.random() * 900000) + 100000);
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyCode(@RequestBody Map<String, String> request) {
        String phoneNumber = request.get("phoneNumber");
        String verificationCode = request.get("verificationCode");
        boolean isVerified = verificationStorage.verifyCode(phoneNumber, verificationCode);
        if (isVerified) {
            return ResponseEntity.ok("인증 성공");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("인증번호가 일치하지 않습니다.");
        }
    }
}
