package com.tbsc.tnotice;

import com.tbsc.tnotice.TNotice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TNoticeRepository extends JpaRepository<TNotice, Integer> {
    List<TNotice> findByTitleContaining(String title);
}
