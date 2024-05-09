package com.tbsc.rental;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rental")
public class RentalController {

    @Autowired
    private RentalService rentalService;

    @PostMapping("/save")
    public ResponseEntity<Rental> createRental(@Valid @RequestBody Rental rental) {
        Rental savedRental = rentalService.saveRental(rental);
        return ResponseEntity.ok(savedRental);
    }


    @GetMapping("/{num}")
    public ResponseEntity<Rental> getRentalById(@PathVariable Integer num) {
        return rentalService.getRentalById(num)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Additional endpoints can be added here
}
