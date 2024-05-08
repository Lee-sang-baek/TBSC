package com.tbsc.Rental;

import com.tbsc.Rental.Rental;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RentalRepository extends JpaRepository<Rental, Integer> {
    // You can add custom database queries here if needed
}
