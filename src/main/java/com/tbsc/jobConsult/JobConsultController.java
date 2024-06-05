package com.tbsc.jobConsult;

import com.tbsc.consultant.Consultant;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

    @GetMapping("/jobConsult/member/pageable/{memberId}")
    public ResponseEntity<Page<JobConsult>> getJobConsultsByMemberId(@PathVariable("memberId") String memberId, @RequestParam("page") Integer page) {
        Pageable pageable = PageRequest.of(page, 5);
        Page<JobConsult> jobConsults = jobConsultService.getJobConsultList(memberId, pageable);
        return ResponseEntity.ok(jobConsults);
    }

    @GetMapping("/jobConsult/{num}")
    public ResponseEntity<JobConsult> getJobConsultByNum(@PathVariable("num") Long num) {
        return jobConsultService.getJobConsult(num);
    }

    @PutMapping("/jobConsult/modify/{num}")
    public ResponseEntity<String> modifyJobConsult(@RequestBody JobConsultDto jobConsultDto, @PathVariable("num") Long num) {
        jobConsultService.updateJobConsult(jobConsultDto, num);
        return ResponseEntity.ok("예약 확정 되었습니다.");
    }
}
