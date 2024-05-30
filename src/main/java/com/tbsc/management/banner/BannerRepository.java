package com.tbsc.management.banner;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface BannerRepository extends JpaRepository<Banner, Long> {
    @Query("SELECT b FROM Banner b WHERE :time BETWEEN b.start AND b.end")
    List<Banner> findBannersWithinPeriod(@Param("time") LocalDateTime time);
}
