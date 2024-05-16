package com.tbsc.rental;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RentalService {

    @Autowired
    private RentalRepository rentalRepository;


    public Rental saveRental(Rental rental) {
        return rentalRepository.save(rental);
    }

    public Optional<Rental> getRentalById(Integer num) {
        return rentalRepository.findById(num);
    }

    public List<Rental> findRentalsByMemberId(String memberId) {
        return rentalRepository.findByMemberId(memberId);
    }

    public boolean existsById(Integer num) {
        return rentalRepository.existsById(num);
    }

    public void deleteRentalById(Integer num) {
        rentalRepository.deleteById(num);
    }
}