package com.tbsc.tnotice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TNoticeService {

    @Autowired
    private TNoticeRepository tNoticeRepository;

    public List<TNotice> getAllNotices() {
        return tNoticeRepository.findAll();
    }

    public TNotice getNoticeById(int num) {
        return tNoticeRepository.findById(num).orElse(null);
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
