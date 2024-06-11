package com.tbsc.config;

import com.tbsc.member.Member;
import com.tbsc.member.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationProvider authenticationProvider;
    private final MemberService memberService;
    private final JwtTokenUtil jwtTokenUtil;

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        authenticationProvider.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getId(), authenticationRequest.getPassword()));
        try {
            final UserDetails userDetails = memberService.loadUserByUsername(authenticationRequest.getId());
            final String token = jwtTokenUtil.generateToken(userDetails.getUsername());
            return ResponseEntity.ok(new AuthenticationResponse(token));
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<String> logout() {
        // 클라이언트 측에서 토큰 제거 로직을 처리하므로 여기에서는 추가적인 작업이 필요하지 않음
        return ResponseEntity.ok("로그아웃 되었습니다.");
    }

    @GetMapping("/state")
    public ResponseEntity<String> getState(@RequestHeader("Authorization") String token) {
        token = token.split(" ")[1].trim();
        try {
            String username = jwtTokenUtil.extractUsername(token);

            UserDetails userDetails = memberService.loadUserByUsername(username);

            Collection<? extends GrantedAuthority> authorities = userDetails.getAuthorities();
            String role = authorities.isEmpty() ? null : authorities.stream().toList().get(0).getAuthority().split("_")[1];
//            for (GrantedAuthority authority : authorities) {
//                role = authority.getAuthority();
//            }

//            String state = retrieveStateByUsername(username);
            return role != null ? ResponseEntity.ok(role) : ResponseEntity.ok("NOT");
        } catch (Exception e) {
            System.out.println(e.getStackTrace());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

    }

    @GetMapping("/id")
    public ResponseEntity<String> getId(@RequestHeader("Authorization") String token) {
        token = token.split(" ")[1].trim();
        String username = jwtTokenUtil.extractUsername(token);
        return ResponseEntity.ok(username);
    }

    private String retrieveStateByUsername(String username) {
        Member member = memberService.getMember(username);
        return member != null ? member.getState().toString() : null;
    }
}
