package com.tbsc.controller;

import com.tbsc.member.Member;
import com.tbsc.registComp.RegistComp;
import com.tbsc.registComp.RegistCompDto;
import com.tbsc.registComp.RegistCompRepository;
import com.tbsc.registComp.RegistCompService;
import com.tbsc.rental.Rental;
import com.tbsc.util.ReserveType;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

@SpringBootTest
public class RegistCompTest {
    @Autowired
    private RegistCompService registCompService;

    @Test
    public void test() {

        for (int i = 0; i < 30; i++) {
            RegistComp registComp = new RegistComp();

            Member member = new Member();
            member.setId("dummy" + i);

            RegistCompDto registCompDto = new RegistCompDto();

            registCompDto.setMemberId(member.getId());
            registCompDto.setTitle("test" + i);
            registCompDto.setCompImage("화면 캡처 2023-02-11 084334.png");
            registCompDto.setWriter("dummy" + i);
            registCompDto.setCorpName("dummy" + i + "comp");
            registCompDto.setContent("content" + i);

            registCompService.saveRegistComp(registCompDto);
        }
    }
}
