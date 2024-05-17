package com.tbsc.jobConsult;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class JobConsultController {

    private final JobConsultService jobConsultService;

    @PostMapping("/jobConsult/add")
    public ResponseEntity<String> addJobConsult(@RequestBody JobConsultDto jobConsultDto) {
        jobConsultService.insertJobConsult(jobConsultDto);
        return ResponseEntity.ok("예약 확정 되었습니다.");
    }

    @GetMapping("/jobConsult/list")
    public ResponseEntity<List<JobConsult>> getListJobConsult(@RequestParam("memberId") String memberId) {
        List<JobConsult> jobConsultList = jobConsultService.selectJobConsult(memberId);
        return ResponseEntity.ok(jobConsultList);
    }
}
