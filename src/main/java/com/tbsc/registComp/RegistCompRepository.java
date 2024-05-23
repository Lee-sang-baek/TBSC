package com.tbsc.registComp;

import com.tbsc.registcomp.RegistComp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface RegistCompRepository extends JpaRepository<RegistComp, Integer> {

    // 메서드 이름을 기반으로 쿼리 생성
    List<RegistComp> findByTitle(String title);

    List<RegistComp> findByMemberId(String memberId);

    // JPQL을 사용한 사용자 정의 쿼리
    //findByViewCountGreaterThan(100)을 호출하면 view 값이 100보다 큰 모든 레코드를 반환
    @Query("SELECT r FROM RegistComp r WHERE r.view > :viewCount")
    List<RegistComp> findByViewCountGreaterThan(@Param("viewCount") int viewCount);

    // 네이티브 쿼리를 사용한 사용자 정의 쿼리
    //startDate와 endDate 매개변수를 사용하여 조회할 범위를 지정
    @Query(value = "SELECT * FROM RegistComp r WHERE r.date >= :startDate AND r.date <= :endDate", nativeQuery = true)
    List<RegistComp> findByDateRange(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
}