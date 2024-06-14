package com.tbsc.management.reserve;

import com.tbsc.consultant.Consultant;
import com.tbsc.email.EmailService;
import com.tbsc.jobConsult.JobConsult;
import com.tbsc.rental.Rental;
import com.tbsc.util.ReserveType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ReserveManagementController {

    private final ReserveManagementService service;
    private final EmailService emailService;

    @GetMapping("/admin/consultant")
    public ResponseEntity<Page<Consultant>> getConsultantList(@RequestParam("page") int page,
                                                              @RequestParam("size") int size,
                                                              @RequestParam("state") String state) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(service.getAllConsultants(pageable, getReserveType(state)));
    }

    @GetMapping("/admin/jobConsult")
    public ResponseEntity<Page<JobConsult>> getJobConsultList(@RequestParam("page") int page,
                                                              @RequestParam("size") int size,
                                                              @RequestParam("state") String state) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(service.getAllJobConsults(pageable, getReserveType(state)));
    }

    @GetMapping("/admin/rental")
    public ResponseEntity<Page<Rental>> getRentalList(@RequestParam("page") int page,
                                                      @RequestParam("size") int size,
                                                      @RequestParam("state") String state) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(service.getAllRentals(pageable, getReserveType(state)));
    }

    @PutMapping("/admin/reserve/{type}/{num}/{newStatus}")
    public ResponseEntity<String> updateReservationState(@PathVariable("type") String type,
                                                         @PathVariable("num") Long num,
                                                         @PathVariable("newStatus") String newStatus) {
        try {
            ReserveType reserveType = getReserveType(newStatus);
            String email = service.updateReservationState(type, num, reserveType);
            emailService.sendSimpleMessage(email, "광주관광기업지원센터", "회원님의 예약 상태가 " + reserveType.korName + "으로 변경되었습니다.");
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    private ReserveType getReserveType(String state) {
        ReserveType type;
        switch (state) {
            case "RESERVE" -> type = ReserveType.RESERVE;
            case "CHECK" -> type = ReserveType.CHECK;
            case "APPROVE" -> type = ReserveType.APPROVE;
            case "DENY" -> type = ReserveType.DENY;
            default -> type = null;
        }
        return type;
    }

}
