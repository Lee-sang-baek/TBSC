package com.tbsc.controller;

import com.tbsc.member.Member;
import com.tbsc.notice.Notice;
import com.tbsc.notice.NoticeRepository;
import com.tbsc.notice.NoticeService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@SpringBootTest
public class NoticeServiceTest {

    @Autowired
    private NoticeRepository noticeRepository;

    @Test
    public void createSampleNotices() {
        List<Notice> notices = new ArrayList<>();

        for (int i = 1; i <= 100; i++) {
            Notice notice = new Notice();
            notice.setTitle("글테스트 " + i);
            notice.setState("마감");
            notice.setView(0);
            notice.setFileUrl("sample-file-" + i + ".txt");
            //notice.setImages(List.of("image1-" + i + ".jpg", "image2-" + i + ".jpg"));
            notice.setDate(LocalDateTime.now());
            Member member = new Member();
            member.setId("admin");
            notice.setMember(member);
            notice.setContent("글테스트 " + i);
            notices.add(notice);
        }

        noticeRepository.saveAll(notices);
    }
}
