package com.tbsc.member;

import jakarta.persistence.criteria.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
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

    public Page<Member> getList(Pageable pageable, String searchTerm, String category) {

        switch (category) {
            case "name" -> {
                return memberRepository.findByNameContaining(searchTerm, pageable);
            }
            case "email" -> {
                return memberRepository.findByEmailContaining(searchTerm, pageable);
            }
            case "address" -> {
                return memberRepository.findByAddressContaining(searchTerm, pageable);
            }
            case "phoneNum" -> {
                return memberRepository.findByPhoneNumContaining(searchTerm, pageable);
            }
            case "compName" -> {
                return memberRepository.findByCompNameContaining(searchTerm, pageable);
            }
            case "businessNum" -> {
                return memberRepository.findByBusinessNumContaining(searchTerm, pageable);
            }
            case "representative" -> {
                return memberRepository.findByRepresentativeContaining(searchTerm, pageable);
            }
            case "compAddress" -> {
                return memberRepository.findByCompAddressContaining(searchTerm, pageable);
            }
            case "all" -> {
                Specification<Member> spec = (root, query, cb) -> {
                    Predicate predicate1 = cb.like(cb.lower(root.get("name")), "%" + searchTerm.toLowerCase() + "%");
                    Predicate predicate2 = cb.like(cb.lower(root.get("email")), "%" + searchTerm.toLowerCase() + "%");
                    Predicate predicate3 = cb.like(cb.lower(root.get("address")), "%" + searchTerm.toLowerCase() + "%");
                    Predicate predicate4 = cb.like(cb.lower(root.get("phoneNum")), "%" + searchTerm.toLowerCase() + "%");
                    Predicate predicate5 = cb.like(cb.lower(root.get("compName")), "%" + searchTerm.toLowerCase() + "%");
                    Predicate predicate6 = cb.like(cb.lower(root.get("businessNum")), "%" + searchTerm.toLowerCase() + "%");
                    Predicate predicate7 = cb.like(cb.lower(root.get("representative")), "%" + searchTerm.toLowerCase() + "%");
                    Predicate predicate8 = cb.like(cb.lower(root.get("compAddress")), "%" + searchTerm.toLowerCase() + "%");
                    return cb.or(predicate1, predicate2, predicate3, predicate4, predicate5, predicate6, predicate7, predicate8);
                };
                return memberRepository.findAll(spec, pageable);
            }
            default -> {
                return memberRepository.findAll(pageable);
            }
        }
    }

}
