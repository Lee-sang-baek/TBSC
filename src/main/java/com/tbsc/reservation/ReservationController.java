package com.tbsc.reservation;

import com.tbsc.member.Member;
import com.tbsc.member.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/reservation")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private MemberRepository memberRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @GetMapping
    public List<Reservation> getAllReservations() {
        return reservationService.getAllReservations();
    }

    @GetMapping("/{num}")
    public Reservation getReservationById(@PathVariable("num") int num) {
        Reservation reservation = reservationService.getReservationById(num);
        if (reservation != null) {
            reservation.setView(reservation.getView() + 1);
            reservationService.saveReservation(reservation);
        }
        return reservation;
    }

    @PostMapping("/create")
    public Reservation createReservation(@RequestPart("reservation") Reservation reservation,
                                         @RequestPart(value = "file", required = false) MultipartFile file,
                                         @RequestPart(value = "attachment", required = false) MultipartFile attachment) throws IOException {
        // Member 설정
        Member member = memberRepository.findById(reservation.getMember().getId()).orElse(null);
        reservation.setMember(member);

        if (file != null && !file.isEmpty()) {
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir, fileName);
            Files.write(filePath, file.getBytes());
            reservation.setImage(fileName);
        }

        if (attachment != null && !attachment.isEmpty()) {
            String attachmentName = System.currentTimeMillis() + "_" + attachment.getOriginalFilename();
            Path attachmentPath = Paths.get(uploadDir, attachmentName);
            Files.write(attachmentPath, attachment.getBytes());
            reservation.setFileUrl(attachmentName);
        }

        return reservationService.saveReservation(reservation);
    }

    @PutMapping("/update/{num}")
    public Reservation updateReservation(@PathVariable("num") int num,
                                         @RequestPart("reservation") Reservation reservation,
                                         @RequestPart(value = "file", required = false) MultipartFile file,
                                         @RequestPart(value = "attachment", required = false) MultipartFile attachment) throws IOException {
        Reservation existingReservation = reservationService.getReservationById(num);
        if (existingReservation == null) {
            throw new IllegalArgumentException("Reservation not found with id: " + num);
        }
        existingReservation.setTitle(reservation.getTitle());
        existingReservation.setContent(reservation.getContent());

        // Member 설정
        Member member = memberRepository.findById(reservation.getMember().getId()).orElse(null);
        existingReservation.setMember(member);

        if (file != null && !file.isEmpty()) {
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir, fileName);
            Files.write(filePath, file.getBytes());
            existingReservation.setImage(fileName);
        }

        if (attachment != null && !attachment.isEmpty()) {
            String attachmentName = System.currentTimeMillis() + "_" + attachment.getOriginalFilename();
            Path attachmentPath = Paths.get(uploadDir, attachmentName);
            Files.write(attachmentPath, attachment.getBytes());
            existingReservation.setFileUrl(attachmentName);
        }

        return reservationService.saveReservation(existingReservation);
    }

    @DeleteMapping("/delete/{num}")
    public void deleteReservation(@PathVariable("num") int num) {
        reservationService.deleteReservation(num);
    }
}
