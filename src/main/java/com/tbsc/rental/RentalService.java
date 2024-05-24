package com.tbsc.rental;

import com.tbsc.member.Member;
import com.tbsc.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RentalService {

    private final RentalRepository rentalRepository;
    private final MemberRepository memberRepository;


    public ResponseEntity<Rental> saveRental(Rental rental, String memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        if (optionalMember.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        rental.setMember(optionalMember.get());
        rentalRepository.save(rental);
        return ResponseEntity.ok(rental);
    }

    public Optional<Rental> getRentalById(Integer num) {
        return rentalRepository.findById(num);
    }

    public List<Rental> getRentalList(String memberId) {
        return rentalRepository.findByMemberId(memberId);
    }

    public boolean existsById(Integer num) {
        return rentalRepository.existsById(num);
    }

    public void deleteRentalById(Integer num) {
        rentalRepository.deleteById(num);
    }
}