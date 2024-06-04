package com.tbsc.controller;

import com.tbsc.company.ApplicationStatus;
import com.tbsc.company.MemberRequest;
import com.tbsc.company.MemberRequestRepository;
import com.tbsc.member.Member;
import com.tbsc.member.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class MemberRequestControllerTest {
    @Autowired
    MemberRequestRepository mr;
    @Autowired
    MemberRepository mp;
    @Test
    void test(){
        MemberRequest m = new MemberRequest();
        Member member = mp.findAll().get(5);
        m.setMember(member);
        m.setStatus(ApplicationStatus.WAIT);
        m.setBusinessNum("3213");
        m.setCompName("주식회사");
        m.setRepresentative("이해빈");
        m.setCompAddress("도마동");
        mr.save(m);

    }

}
