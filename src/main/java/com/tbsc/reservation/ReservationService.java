package com.tbsc.reservation;

import com.tbsc.member.Member;
import com.tbsc.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final MemberRepository memberRepository;

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Reservation getReservationById(int num) {
        return reservationRepository.findById(num).orElse(null);
    }

    public Reservation saveReservation(Reservation reservation) {
        Member member = memberRepository.findById(reservation.getMember().getId()).orElse(null);
        reservation.setMember(member);
        return reservationRepository.save(reservation);
    }

    public Reservation updateReservation(int num, Reservation updatedReservation) {
        Optional<Reservation> existingReservationOpt = reservationRepository.findById(num);
        if (existingReservationOpt.isPresent()) {
            Reservation existingReservation = existingReservationOpt.get();
            existingReservation.setTitle(updatedReservation.getTitle());
            existingReservation.setContent(updatedReservation.getContent());
            if (updatedReservation.getImage() != null && !updatedReservation.getImage().isEmpty()) {
                existingReservation.setImage(updatedReservation.getImage());
            }
            return reservationRepository.save(existingReservation);
        } else {
            throw new IllegalArgumentException("찾을수 없음 아이디: " + num);
        }
    }

    public void deleteReservation(int num) {
        reservationRepository.deleteById(num);
    }
}
