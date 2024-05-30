package com.tbsc.management.popup;

import com.tbsc.management.mainImg.MainImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface PopupRepository extends JpaRepository<Popup, Long> {
    @Query("SELECT b FROM Popup b WHERE :time BETWEEN b.start AND b.end")
    List<Popup> findPopupsWithinPeriod(@Param("time") LocalDateTime time);
}
