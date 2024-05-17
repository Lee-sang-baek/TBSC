package com.tbsc.jobConsult;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobConsultRepository extends JpaRepository<JobConsult, Long> {
    List<JobConsult> findByMemberId(String memberId);
}
