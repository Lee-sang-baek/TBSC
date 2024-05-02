package com.tbsc.service;

import com.tbsc.dto.MemberDto;
import com.tbsc.entity.Member;
import com.tbsc.enums.MemberType;
import com.tbsc.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.Pattern;

@Service
public class MemberService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Autowired
    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    // 비밀번호 일치 확인 메서드
    public boolean isPasswordMatch(String password, String confirmPassword) {
        return password.equals(confirmPassword);
    }

    public ResponseEntity<String> signUp(MemberDto memberDto, PasswordEncoder passwordEncoder) {
        // 비밀번호 일치 여부 확인
        if (!isPasswordMatch(memberDto.getPassword(), memberDto.getConfirmPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("비밀번호가 일치하지 않습니다.");
        }

        Member member = new Member();
        member.bind(memberDto, passwordEncoder);
        member.setState(MemberType.NORMAL);

        try {
            // 회원 정보를 데이터베이스에 저장
            memberRepository.save(member);

            return ResponseEntity.status(HttpStatus.CREATED).body("회원가입이 완료되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원가입 중 오류가 발생했습니다.");
        }
    }

    public void signUp(Member member) {
        memberRepository.save(member);
    }

    public ResponseEntity<String> compSignup(MemberDto memberDto, PasswordEncoder passwordEncoder) {
        // 비밀번호 일치 여부 확인
        if (!isPasswordMatch(memberDto.getPassword(), memberDto.getConfirmPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("비밀번호가 일치하지 않습니다.");
        }

        if (memberDto.getCompAddress() == null ||
            memberDto.getBusinessNum() == null ||
            memberDto.getRepresentative() == null ||
            memberDto.getCompName() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("기업정보를 전부 입력해주세요.");
        }

        Member member = new Member();
        member.bind(memberDto, passwordEncoder);
        member.setState(MemberType.COMP);

        try {
            // 회원 정보를 데이터베이스에 저장
            memberRepository.save(member);

            return ResponseEntity.status(HttpStatus.CREATED).body("회원가입이 완료되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원가입 중 오류가 발생했습니다.");
        }
    }

    public ResponseEntity<String> checkId(String id) {
        if (id.length() < 5) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("아이디는 5글자 이상만 가능합니다.");
        }

        if (!Pattern.matches("[a-zA-Z0-9]+", id)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("아이디는 영문과 숫자만 가능합니다.");
        }

        Optional<Member> member = memberRepository.findById(id);
        if (member.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 존재하는 아이디 입니다.");
        } else {
            return ResponseEntity.ok("사용 가능한 아이디 입니다.");
        }
    }

    public ResponseEntity<String> checkEmail(String email) {

        if (!Pattern.matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", email)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이메일 형식이 올바르지 않습니다.");
        }

        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 존재하는 이메일 입니다.");
        } else {
            return ResponseEntity.ok("사용 가능한 이메일 입니다.");
        }
    }

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        Optional<Member> optionalMember = memberRepository.findById(id);
        if (optionalMember.isEmpty()) {
            throw new UsernameNotFoundException(id);
        }
        Member member = optionalMember.get();
        return User.builder()
                .username(member.getEmail())
                .password(member.getPassword())
                .roles(member.getState().toString())
                .build();
    }


    public String getPassword(String userId) {
        Optional<Member> optionalMember = memberRepository.findById(userId);
        if (optionalMember.isPresent()) {
            Member member = optionalMember.get();
            return member.getPassword();
        } else {
            return null;
        }
    }

    public Member login(String id, String hashedPassword) {
        Optional<Member> optionalMember = memberRepository.findByIdAndPassword(id, hashedPassword);
        return optionalMember.orElse(null);
    }

    public List<Member> getList() {
        return memberRepository.findAll();
    }
}
