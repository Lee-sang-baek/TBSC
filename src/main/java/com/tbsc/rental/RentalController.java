package com.tbsc.rental;

import com.tbsc.member.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

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

}