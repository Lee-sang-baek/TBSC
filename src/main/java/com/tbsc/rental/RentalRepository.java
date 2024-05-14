package com.tbsc.rental;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RentalRepository extends JpaRepository<Rental, Integer> {
    // You can add custom database queries here if needed
    List<Rental> findByMemberId(String memberId);
}
