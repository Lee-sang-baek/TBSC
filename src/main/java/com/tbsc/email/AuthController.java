package com.tbsc.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private EmailService emailService;

    private Map<String, String> codeStorage = new HashMap<>();

    @PostMapping("/sendCode")
    public void sendEmailCode(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        if (email == null || !email.contains("@") || email.contains(" ")) {
            throw new IllegalArgumentException("잘못된 이메일주소: " + email);
        }
        String code = generateRandomCode(6);
        codeStorage.put(email, code);  // 이메일과 연결된 코드 저장
        emailService.sendSimpleMessage(email, "인증코드", "Code: " + code);
        System.out.println("Code sent to: " + email + " Code: " + code); // 로그 출력
    }

    @PostMapping("/verifyCode")
    public String verifyCode(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String userCode = request.get("code");
        String validCode = codeStorage.getOrDefault(email, "");
        if (userCode.equals(validCode)) {
            return "인증되었습니다.";
        } else {
            return "인증번호가 일치하지않습니다.";
        }
    }

    private String generateRandomCode(int length) {
        Random rnd = new Random();
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            sb.append((char) ('0' + rnd.nextInt(10)));
        }
        return sb.toString();
    }
}
