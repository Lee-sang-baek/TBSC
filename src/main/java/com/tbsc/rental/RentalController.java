package com.tbsc.rental;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/rental")
public class RentalController {

    private final RentalService rentalService;

    @PostMapping("/save")
    public ResponseEntity<Rental> createRental(@Valid @RequestBody Rental rental,
                                               @RequestParam("memberId") String memberId) {
        return rentalService.saveRental(rental, memberId);
    }

    @PutMapping("/{num}")
    public ResponseEntity<Rental> updateRental(@PathVariable("num") Integer num, @RequestBody Rental rental, @RequestParam("memberId") String memberId) {
        return rentalService.updateRental(num, rental, memberId);
    }

    @GetMapping("/{num}")
    public ResponseEntity<Rental> getRentalById(@PathVariable("num") Integer num) {
        return rentalService.getRentalById(num)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/member/{memberId}")
    public ResponseEntity<List<Rental>> getRentalsByMemberId(@PathVariable("memberId") String memberId) {
        List<Rental> rentals = rentalService.getRentalList(memberId);
        return ResponseEntity.ok().body(rentals);
    }

    @GetMapping("/member/pageable/{memberId}")
    public ResponseEntity<Page<Rental>> getRentalsByMemberId(@PathVariable("memberId") String memberId, @RequestParam("page") Integer page) {
        Pageable pageable = PageRequest.of(page, 5);
        Page<Rental> rentals = rentalService.getRentalList(memberId, pageable);
        return ResponseEntity.ok().body(rentals);
    }

    @PutMapping("/modify/{num}")
    public ResponseEntity<?> modifyReserve(@PathVariable("num") Integer num) {
        return rentalService.cancelRental(num);
    }

    @DeleteMapping("/delete/{num}")
    public ResponseEntity<?> deleteRental(@PathVariable("num") Integer num) {
        if (!rentalService.existsById(num)) {
            return ResponseEntity.notFound().build();
        }

        rentalService.deleteRentalById(num);
        return ResponseEntity.noContent().build();
    }
}