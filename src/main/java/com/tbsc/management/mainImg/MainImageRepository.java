package com.tbsc.management.mainImg;

import com.tbsc.management.banner.Banner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface MainImageRepository extends JpaRepository<MainImage, Long> {
    @Query("SELECT b FROM MainImage b WHERE :time BETWEEN b.start AND b.end")
    List<MainImage> findMainImagesWithinPeriod(@Param("time") LocalDateTime time);

}
