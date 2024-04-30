package com.tbsc.controller;

import com.tbsc.dto.MemberDto;
import com.tbsc.entity.Member;
import com.tbsc.enums.MemberType;
import com.tbsc.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.View;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/member/signup")
    public ResponseEntity<String> signUp(@RequestBody MemberDto memberDto) {
        // System.out.println("signup");
        return memberService.signUp(memberDto, passwordEncoder);
    }

    @PostMapping("/member/compSignup")
    public ResponseEntity<String> compSignup(@RequestBody MemberDto memberDto) {
        // System.out.println("signup");
        return memberService.compSignup(memberDto, passwordEncoder);
    }

    @GetMapping("/member/checkId")
    public ResponseEntity<String> checkId(@RequestParam("id") String id) {
        return memberService.checkId(id);
    }

    @GetMapping("/member/checkEmail")
    public ResponseEntity<String> checkEmail(@RequestParam("email") String email) {
        return memberService.checkEmail(email);
    }

    @GetMapping("/member/login")
    public String loginForm() {
        return "loginForm";
    }

//    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestBody Map<String, String> loginData) {
//        // 요청 본문에서 아이디와 비밀번호 가져오기
//        String id = loginData.get("id");
//        String password = loginData.get("password");
//
//        return ResponseEntity.ok("로그인 성공");
//    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> request, HttpServletRequest httpRequest) {
        String id = request.get("id");
        String enteredPassword = request.get("password");

        // 암호화된 패스워드
        String storedPasswordHash = memberService.getPassword(id);

        // 입력된 비밀번호, 암호화된 비밀번호 비교
        boolean passwordMatches = passwordEncoder.matches(enteredPassword, storedPasswordHash);

        if (passwordMatches) {
            Member member = memberService.login(id, storedPasswordHash);

            HttpSession session = httpRequest.getSession();
            if (session.getAttribute("id") != null) {
                System.out.println("id: " + session.getAttribute("id"));
            }
            session.setAttribute("id", id);

            return ResponseEntity.ok(member.getId());
        } else {
            return ResponseEntity.status(HttpStatus.I_AM_A_TEAPOT).body("주전자");
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest httpRequest) {
        HttpSession session = httpRequest.getSession();
        session.removeAttribute("id");
        return ResponseEntity.ok("로그아웃 성공");
    }

    @GetMapping("/create")
    public String admin() {
        Member member = new Member();
        member.setId("admin");
        member.setPassword(passwordEncoder.encode("12345"));
        member.setAddress("admin");
        member.setEmail("admin@admin");
        member.setPhoneNum("010-0000-0000");
        member.setState(MemberType.ADMIN);
        member.setBirth(new Date());
        memberService.signUp(member);
        return "admin create";
    }
}