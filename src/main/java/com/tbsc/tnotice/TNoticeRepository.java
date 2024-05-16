package com.tbsc.tnotice;

import com.tbsc.tnotice.TNotice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TNoticeRepository extends JpaRepository<TNotice, Integer> {
}
