package com.tbsc.notice;

import com.tbsc.member.Member;
import com.tbsc.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final MemberRepository memberRepository;

    public List<Notice> getAllNotices() {
        return noticeRepository.findAll();
    }

    public ResponseEntity<Notice> createNotice(NoticeDto noticeDto) {
        Notice notice = new Notice();
        notice.bind(noticeDto);
        Optional<Member> optionalMember = memberRepository.findById(noticeDto.getId());
        if (optionalMember.isPresent()) {
            notice.setMember(optionalMember.get());
            noticeRepository.save(notice);
            return ResponseEntity.ok(notice);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
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
}
