package com.tbsc.company;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class MemberRequestController {

    private final MemberRequestService memberRequestService;

    @GetMapping("/admin/memberRequest/list")
    public ResponseEntity<Page<MemberRequest>> getMemberRequestList(@RequestParam("page") int page,
                                                                   @RequestParam("size") int size,
                                                                   @RequestParam("category") String category) {
        Pageable pageable = PageRequest.of(page,size);
        return memberRequestService.getList(pageable, getStatus(category));
    }

    @PostMapping("/admin/memberRequest/{num}/approve")
    public ResponseEntity<String> approveApplication(@PathVariable("num") Long num) {
        return memberRequestService.approveApplication(num);
    }

    @PostMapping("/admin/memberRequest/{num}/deny")
    public ResponseEntity<String> rejectApplication(@PathVariable("num") Long num) {
        return memberRequestService.rejectApplication(num);
    }

    private ApplicationStatus getStatus(String category) {
        switch (category) {
            case "WAIT" -> {
                return ApplicationStatus.WAIT;
            }
            case "APPROVE" -> {
                return ApplicationStatus.APPROVE;
            }
            case "DENY" -> {
                return ApplicationStatus.DENY;
            }
            case "REAPPLY" -> {
                return ApplicationStatus.REAPPLY;
            }
            default -> {
                return null;
            }
        }
    }
}
