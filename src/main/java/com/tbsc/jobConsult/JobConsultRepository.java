package com.tbsc.jobConsult;

import com.tbsc.consultant.Consultant;
import com.tbsc.util.ReserveType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JobConsultRepository extends JpaRepository<JobConsult, Long> {
    List<JobConsult> findByMemberId(String memberId);

    Page<JobConsult> findByMemberId(String memberId, Pageable pageable);

    Optional<JobConsult> findByNum(long num);

    Page<JobConsult> findAll(Pageable pageable);

    Page<JobConsult> findByState(ReserveType state, Pageable pageable);
}
