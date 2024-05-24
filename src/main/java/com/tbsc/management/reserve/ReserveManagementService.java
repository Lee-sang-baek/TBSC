package com.tbsc.management.reserve;

import com.tbsc.consultant.Consultant;
import com.tbsc.consultant.ConsultantRepository;
import com.tbsc.jobConsult.JobConsult;
import com.tbsc.jobConsult.JobConsultRepository;
import com.tbsc.member.Member;
import com.tbsc.rental.Rental;
import com.tbsc.rental.RentalRepository;
import com.tbsc.reservation.Reservation;
import com.tbsc.util.ReserveType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReserveManagementService {

    private final ConsultantRepository consultantRepository;
    private final JobConsultRepository jobConsultRepository;
    private final RentalRepository rentalRepository;

    public Page<Consultant> getAllConsultants(Pageable pageable, ReserveType state) {
        return state == null
                ? consultantRepository.findAll(pageable)
                : consultantRepository.findByState(state, pageable);
    }

    public Page<JobConsult> getAllJobConsults(Pageable pageable, ReserveType state) {
        return state == null
                ? jobConsultRepository.findAll(pageable)
                : jobConsultRepository.findByState(state, pageable);
    }

    public Page<Rental> getAllRentals(Pageable pageable, ReserveType state) {
        return state == null
                ? rentalRepository.findAll(pageable)
                : rentalRepository.findByState(state, pageable);
    }

    public String updateReservationState(String type, Long num, ReserveType state) {
        String email;
        switch (type) {
            case "Consultant":
                Consultant consultant = consultantRepository.findByNum(num)
                        .orElseThrow(() -> new IllegalArgumentException("Consultant not found"));
                consultant.setState(state);
                email = consultant.getMember().getEmail();
                consultantRepository.save(consultant);
                break;
            case "JobConsult":
                JobConsult jobConsult = jobConsultRepository.findByNum(num)
                        .orElseThrow(() -> new IllegalArgumentException("JobConsult not found"));
                jobConsult.setState(state);
                email = jobConsult.getMember().getEmail();
                jobConsultRepository.save(jobConsult);
                break;
            case "Rental":
                Rental rental = rentalRepository.findByNum(num)
                        .orElseThrow(() -> new IllegalArgumentException("Rental not found"));
                rental.setState(state);
                email = rental.getMember().getEmail();
                rentalRepository.save(rental);
                break;
            default:
                throw new IllegalArgumentException("Invalid reservation type");
        }
        return email;
    }

}
