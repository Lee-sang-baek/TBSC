package com.tbsc.controller;

import com.tbsc.entity.Notice;
import com.tbsc.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notices")
public class NoticeController {

    @Autowired
    private NoticeService noticeService;

    //모든 공지사항 조회
    @GetMapping
    public List<Notice> getAllNotices() {
        return noticeService.getAllNotices();
    }

    //공지사항 생성
    @PostMapping("/create")
    public ResponseEntity<Notice> createNotice(@RequestBody Notice notice) {
        Notice createdNotice = noticeService.createNotice(notice);
        return ResponseEntity.ok().body(createdNotice);
    }


    //글하나씩 조회
    @GetMapping("/{id}")
    public ResponseEntity<Notice> getNoticeById(@PathVariable("id") Integer id) {
        Notice notice = noticeService.getNoticeById(id);
        notice.setView(notice.getView() + 1); // view 값을 1 증가시킴
        noticeService.updateNotice(notice.getNum(), notice); // 업데이트 메서드 호출
        return ResponseEntity.ok().body(notice);
    }


    //공지사항 수정
    @PutMapping("/update")
    public Notice updateNotice(@PathVariable Integer id, @RequestBody Notice notice) {
        return noticeService.updateNotice(id, notice);
    }

    //공지사항 삭제
    @DeleteMapping("/delete")
    public void deleteNotice(@PathVariable Integer id) {
        noticeService.deleteNotice(id);
    }
}
