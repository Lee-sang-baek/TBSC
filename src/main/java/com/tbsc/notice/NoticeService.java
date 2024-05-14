package com.tbsc.notice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoticeService {

    @Autowired
    private NoticeRepository noticeRepository;

    public List<Notice> getAllNotices() {
        return noticeRepository.findAll();
    }

    public Notice createNotice(Notice notice) {
        return noticeRepository.save(notice);
    }

    public Notice getNoticeById(Integer id) {
        return noticeRepository.findById(id).orElse(null);
    }

    public Notice updateNotice(Integer id, Notice notice) {
        notice.setNum(id);
        return noticeRepository.save(notice);
    }

    public void deleteNotice(Integer id) {
        noticeRepository.deleteById(id);
    }

    public NoticeRepository getNoticeRepository() { // 추가된 메서드
        return noticeRepository;
    }
}
