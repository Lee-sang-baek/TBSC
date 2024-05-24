package com.tbsc.controller;

import com.tbsc.member.Member;
import com.tbsc.member.MemberType;
import com.tbsc.member.MemberService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;

@SpringBootTest
public class MemberControllerTest {

    @Autowired
    MemberService ms;
    @Autowired
    PasswordEncoder pe;

    @Test
    void signUp() {
        for (int i = 0; i < 20; i++) {
            Member member = new Member();
            member.setId("dummy" + i);
            member.setPassword(pe.encode("12345"));
            member.setName("dummy" + i + "'s name");
            member.setAddress("dummy" + i + "'s home");
            member.setDetailAddress("detail" + i);
            member.setEmail("dummy" + i + "@dummy.com");
            member.setPhoneNum("010-0000-0000");
            member.setBirth(LocalDate.now());
            if (i % 2 == 0) {
                member.setCompName("dummy company");
                member.setRepresentative("dummy's owner");
                member.setCompAddress("dummy company's address");
                member.setBusinessNum("987654321");
                member.setState(MemberType.COMP);
            } else {
                member.setState(MemberType.NORMAL);
            }
            ms.signUp(member);
        }
    }
}
