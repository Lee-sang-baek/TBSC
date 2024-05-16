package com.tbsc.rental;

import com.tbsc.member.MemberRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rental")
public class RentalController {

    @Autowired
    private RentalService rentalService;

    @Autowired
    private MemberRepository memberRepository;

    @PostMapping("/save")
    public ResponseEntity<Rental> createRental(@Valid @RequestBody Rental rental,
                                               @RequestParam(name = "memberId") String memberId) {
        if (!memberRepository.existsById(memberId)) {
            return ResponseEntity.badRequest().build();
        }

        rental.setMemberId(memberId);

        Rental savedRental = rentalService.saveRental(rental);
        return ResponseEntity.ok(savedRental);
    }

    @GetMapping("/{num}")
    public ResponseEntity<Rental> getRentalById(@PathVariable Integer num) {
        return rentalService.getRentalById(num)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/member/{memberId}")
    public ResponseEntity<List<Rental>> getRentalsByMemberId(@PathVariable String memberId) {
        List<Rental> rentals = rentalService.findRentalsByMemberId(memberId);
        return ResponseEntity.ok().body(rentals);
    }

    @DeleteMapping("/delete/{num}")
    public ResponseEntity<?> deleteRental(@PathVariable Integer num) {
        if (!rentalService.existsById(num)) {
            return ResponseEntity.notFound().build();
        }

        rentalService.deleteRentalById(num);
        return ResponseEntity.noContent().build();
    }
}
