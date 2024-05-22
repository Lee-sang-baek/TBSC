package com.tbsc.consultant;

import com.tbsc.consultant.Consultant;
import com.tbsc.util.ReserveType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ConsultantRepository extends JpaRepository<Consultant, Integer> {
    Optional<Consultant> findByNum(Long num);

    Page<Consultant> findAll(Pageable pageable);

    Page<Consultant> findByState(ReserveType state, Pageable pageable);
}
