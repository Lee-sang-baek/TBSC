package com.tbsc.controller;

import com.tbsc.member.Member;
import com.tbsc.member.MemberRepository;
import com.tbsc.tnotice.TNotice;
import com.tbsc.tnotice.TNoticeDto;
import com.tbsc.tnotice.TNoticeRepository;
import com.tbsc.tnotice.TNoticeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;

import java.util.Date;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
public class TNoticeServiceTest {

    @Autowired
    private TNoticeService tNoticeService;

    @Autowired
    private TNoticeRepository tNoticeRepository;


    @Test
    public void createNoticesTest() {
        for (int i = 1; i <= 100; i++) {
            TNoticeDto tNoticeDto = new TNoticeDto();
            tNoticeDto.setTitle("테스트1 " + i);
            tNoticeDto.setContent("테스트내용 " + i);
            tNoticeDto.setImage("1716166134323_dtd" + ".png");
            tNoticeDto.setId("admin");

            ResponseEntity<TNotice> response = tNoticeService.saveNotice(tNoticeDto);
            assertNotNull(response.getBody());
        }
    }
}
