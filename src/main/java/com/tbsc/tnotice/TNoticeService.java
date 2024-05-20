package com.tbsc.tnotice;

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
public class TNoticeService {

    private final TNoticeRepository tNoticeRepository;
    private final MemberRepository memberRepository;

    public List<TNotice> getAllNotices() {
        return tNoticeRepository.findAll();
    }

    public TNotice getNoticeById(int num) {
        return tNoticeRepository.findById(num).orElse(null);
    }

    public ResponseEntity<TNotice> saveNotice(TNoticeDto tNoticeDto) {
        Optional<Member> optionalMember = memberRepository.findById(tNoticeDto.getId());
        if (optionalMember.isPresent()) {
            TNotice tNotice = new TNotice();
            tNotice.bind(tNoticeDto);
            tNotice.setMember(optionalMember.get());
            tNoticeRepository.save(tNotice);
            return ResponseEntity.ok(tNotice);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    public TNotice saveNotice(TNotice tNotice) {
        return tNoticeRepository.save(tNotice);
    }

    public TNotice updateNotice(int num, TNotice updatedNotice) {
        Optional<TNotice> existingNoticeOpt = tNoticeRepository.findById(num);
        if (existingNoticeOpt.isPresent()) {
            TNotice existingNotice = existingNoticeOpt.get();
            existingNotice.setTitle(updatedNotice.getTitle());
            existingNotice.setContent(updatedNotice.getContent());
            if (updatedNotice.getImage() != null && !updatedNotice.getImage().isEmpty()) {
                existingNotice.setImage(updatedNotice.getImage());
            }
            return tNoticeRepository.save(existingNotice);
        } else {
            throw new IllegalArgumentException("Notice not found with id: " + num);
        }
    }

    public void deleteNotice(int num) {
        tNoticeRepository.deleteById(num);
    }
}
