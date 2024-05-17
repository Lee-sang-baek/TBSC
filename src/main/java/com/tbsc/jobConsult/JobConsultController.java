package com.tbsc.jobConsult;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class JobConsultController {

    private final JobConsultService jobConsultService;

    @PostMapping("/jobConsult/add")
    public ResponseEntity<String> addJobConsult(@RequestBody JobConsultDto jobConsultDto) {
        jobConsultService.insertJobConsult(jobConsultDto);
        return ResponseEntity.ok("예약 확정 되었습니다.");
    }
}
