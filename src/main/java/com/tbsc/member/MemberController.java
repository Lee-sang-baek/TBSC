package com.tbsc.member;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

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

//    @GetMapping("/member/login")
//    public String loginForm() {
//        return "loginForm";
//    }

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
//            if (session.getAttribute("id") != null) {
//                System.out.println("id: " + session.getAttribute("id"));
//            }
            session.setAttribute("id", id);

            return ResponseEntity.ok(member.getId());
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("비밀번호가 다릅니다.");
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest httpRequest) {
        HttpSession session = httpRequest.getSession();
        session.removeAttribute("id");
        return ResponseEntity.ok("로그아웃 성공");
    }

    @PostMapping("/member/list")
    public ResponseEntity<List<Member>> memberList() {
        List<Member> members = memberService.getList();
        // System.out.println(members.size());
        return ResponseEntity.ok(members);
    }

    @GetMapping("/create")
    public ResponseEntity<String> admin() {
        Member member = new Member();
        member.setId("admin");
        member.setPassword(passwordEncoder.encode("12345"));
        member.setName("admin");
        member.setAddress("admin"s home");
        member.setEmail("admin@admin.com");
        member.setPhoneNum("010-0000-0000");
        member.setState(MemberType.ADMIN);
        member.setBirth(LocalDate.now());
        memberService.signUp(member);
        return ResponseEntity.ok("admin create");
    }
}