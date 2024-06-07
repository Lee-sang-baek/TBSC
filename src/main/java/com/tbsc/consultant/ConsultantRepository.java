package com.tbsc.consultant;

import com.tbsc.consultant.Consultant;
import com.tbsc.util.ReserveType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConsultantRepository extends JpaRepository<Consultant, Long> {
    Optional<Consultant> findByNum(Long num);

    Page<Consultant> findAll(Pageable pageable);

    Page<Consultant> findByState(ReserveType state, Pageable pageable);

    Page<Consultant> findByMemberId(String memberId, Pageable pageable);

    List<Consultant> findByMemberId(String memberId);
}
