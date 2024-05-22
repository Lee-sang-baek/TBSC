package com.tbsc.rental;

import com.tbsc.jobConsult.JobConsult;
import com.tbsc.util.ReserveType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RentalRepository extends JpaRepository<Rental, Integer> {

    List<Rental> findByMemberId(String memberId);

    Optional<Rental> findByNum(Long num);

    Page<Rental> findAll(Pageable pageable);

    Page<Rental> findByState(ReserveType state, Pageable pageable);
}
