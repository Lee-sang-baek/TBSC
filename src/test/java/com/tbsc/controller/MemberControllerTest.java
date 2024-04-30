package com.tbsc.controller;

import com.tbsc.entity.Member;
import com.tbsc.enums.MemberType;
import com.tbsc.service.MemberService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Date;

@SpringBootTest
public class MemberControllerTest {

    @Autowired
    MemberService ms;

    @Test
    void signUp() {
        Member member = new Member();
        member.setId("admin");
        member.setPassword("12345");
        member.setAddress("admin");
        member.setEmail("admin@admin");
        member.setPhoneNum("010-0000-0000");
        member.setState(MemberType.ADMIN);
        member.setBirth(new Date());
        ms.signUp(member);
    }
}
