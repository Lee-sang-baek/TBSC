package com.tbsc.log;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface AccessLogRepository extends JpaRepository<AccessLog, Long> {

    Page<AccessLog> findByTimeBetween(LocalDateTime startDate, LocalDateTime endDate, Pageable pageable);

    Page<AccessLog> findByTimeBetweenAndMemberIdContaining(LocalDateTime startDate, LocalDateTime endDate, String searchTerm, Pageable pageable);

    Page<AccessLog> findByTimeBetweenAndPathContaining(LocalDateTime startDate, LocalDateTime endDate, String searchTerm, Pageable pageable);

    Page<AccessLog> findByTimeBetweenAndIpAddressContaining(LocalDateTime startDate, LocalDateTime endDate, String searchTerm, Pageable pageable);

    Page<AccessLog> findByTimeBetweenAndMemberIdContainingOrMemberIdIsNull(LocalDateTime startDate, LocalDateTime endDate, String searchTerm, Pageable pageable);



    Page<AccessLog> findByMemberIdContaining(String searchTerm, Pageable pageable);

    Page<AccessLog> findByPathContaining(String searchTerm, Pageable pageable);

    Page<AccessLog> findByIpAddressContaining(String searchTerm, Pageable pageable);

    Page<AccessLog> findAll(Specification<AccessLog> spec, Pageable pageable);


    Page<AccessLog> findByTimeBetweenAndMemberIdContainingAndPathContainingOrMemberIdIsNullAndPathContaining(LocalDateTime fromDate, LocalDateTime toDate, String searchTerm, String menu1, String menu2, Pageable pageable);

    Page<AccessLog> findByMemberIdContainingAndPathContaining(String searchTerm, String menu, Pageable pageable);

    Page<AccessLog> findByTimeBetweenAndMemberIdContainingAndPathContaining(LocalDateTime fromDate, LocalDateTime toDate, String searchTerm, String menu, Pageable pageable);

    Page<AccessLog> findByTimeBetweenAndPathContainingAndPathContaining(LocalDateTime fromDate, LocalDateTime toDate, String searchTerm, String menu, Pageable pageable);

    Page<AccessLog> findByPathContainingAndPathContaining(String searchTerm, String menu, Pageable pageable);

    Page<AccessLog> findByTimeBetweenAndIpAddressContainingAndPathContaining(LocalDateTime fromDate, LocalDateTime toDate, String searchTerm, String menu, Pageable pageable);

    Page<AccessLog> findByIpAddressContainingAndPathContaining(String searchTerm, String menu, Pageable pageable);

    Page<AccessLog> findByMemberIdContainingAndPathContainingOrMemberIdIsNullAndPathContaining(String searchTerm, String menu1, String menu2, Pageable pageable);

    Page<AccessLog> findByMemberIdContainingOrMemberIdIsNull(String searchTerm, Pageable pageable);
}
