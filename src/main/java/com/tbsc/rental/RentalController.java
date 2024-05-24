package com.tbsc.rental;

import com.tbsc.member.Member;
import com.tbsc.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/rental")
public class RentalController {

    private final RentalService rentalService;

    @PostMapping("/save")
    public ResponseEntity<Rental> createRental(@Valid @RequestBody Rental rental,
                                               @RequestParam("memberId") String memberId) {
        return rentalService.saveRental(rental, memberId);
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

    @DeleteMapping("/delete/{num}")
    public ResponseEntity<?> deleteRental(@PathVariable("num") Integer num) {
        if (!rentalService.existsById(num)) {
            return ResponseEntity.notFound().build();
        }

        rentalService.deleteRentalById(num);
        return ResponseEntity.noContent().build();
    }
}