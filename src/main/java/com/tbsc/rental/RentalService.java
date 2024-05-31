package com.tbsc.rental;

import com.tbsc.member.Member;
import com.tbsc.member.MemberRepository;
import com.tbsc.util.ReserveType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
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

    public ResponseEntity<Rental> updateRental(Integer num, Rental updatedRental, String memberId) {
        Optional<Rental> optionalRental = rentalRepository.findById(num);
        if (optionalRental.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Optional<Member> optionalMember = memberRepository.findById(memberId);
        if (optionalMember.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        Rental existingRental = optionalRental.get();
        existingRental.setMember(optionalMember.get());
        existingRental.setCompName(updatedRental.getCompName());
        existingRental.setEndDate(updatedRental.getEndDate());
        existingRental.setGender(updatedRental.getGender());
        existingRental.setPerson(updatedRental.getPerson());
        existingRental.setPlace(updatedRental.getPlace());
        existingRental.setPrepare(updatedRental.getPrepare());
        existingRental.setPurpose(updatedRental.getPurpose());
        existingRental.setStartDate(updatedRental.getStartDate());
        rentalRepository.save(existingRental);

        return ResponseEntity.ok(existingRental);
    }

    public ResponseEntity<Rental> cancelRental(Integer num) {
        Optional<Rental> optionalRental = rentalRepository.findById(num);
        if (optionalRental.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Rental rental = optionalRental.get();

        rental.setState(ReserveType.CANCEL);

        rentalRepository.save(rental);

        return ResponseEntity.ok(rental);
    }

    public Optional<Rental> getRentalById(Integer num) {
        return rentalRepository.findById(num);
    }

    public List<Rental> getRentalList(String memberId) {
        return rentalRepository.findByMemberId(memberId);
    }

    public Page<Rental> getRentalList(String memberId, Pageable pageable) {
        return rentalRepository.findByMemberId(memberId, pageable);
    }

    public boolean existsById(Integer num) {
        return rentalRepository.existsById(num);
    }

    public void deleteRentalById(Integer num) {
        rentalRepository.deleteById(num);
    }
}