package com.tbsc.consultant;

import com.tbsc.jobConsult.JobConsult;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/consultants")
@RequiredArgsConstructor
public class ConsultantController {

    @Value("${file.upload-dir}")
    private String uploadDir;

    private final ConsultantService consultantService;

    @PostMapping("/save")
    public ResponseEntity<Consultant> saveConsultant(@RequestBody ConsultantDto consultantDto) {
        return consultantService.saveConsultant(consultantDto);
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String filePath = uploadDir + File.separator + file.getOriginalFilename();
            File dest = new File(filePath);
            file.transferTo(dest);

            // 이 예시에서는 파일 이름만 리턴합니다.
            return ResponseEntity.ok(file.getOriginalFilename());
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Upload Failed: " + e.getMessage());
        }
    }

    @GetMapping("/member/{memberId}")
    public ResponseEntity<List<Consultant>> getConsultantsByMemberId(@PathVariable("memberId") String memberId) {
        List<Consultant> consultants = consultantService.getConsultantList(memberId);
        return ResponseEntity.ok().body(consultants);
    }

    @GetMapping("/member/pageable/{memberId}")
    public ResponseEntity<Page<Consultant>> getConsultantsByMemberId(@PathVariable("memberId") String memberId, @RequestParam("page") Integer page) {
        Pageable pageable = PageRequest.of(page, 5);
        Page<Consultant> consultants = consultantService.getConsultantPageableList(memberId, pageable);
        return ResponseEntity.ok().body(consultants);
    }

    @PutMapping("/modify/{num}")
    public ResponseEntity<Consultant> modifyConsultant(@PathVariable("num") Long num) {
        return consultantService.cancelConsultant(num);
    }

    @GetMapping("/{index}")
    public ResponseEntity<Optional<Consultant>> getConsultantsByNum(@PathVariable("index") Long num) {
        Optional<Consultant> consultant = consultantService.getConsultant(num);
        return ResponseEntity.ok().body(consultant);
    }

    @PutMapping("/{num}")
    public ResponseEntity<Consultant> updateConsultant(@PathVariable Long num, @RequestBody Consultant consultant, @RequestParam String memberId) {
        return consultantService.updateConsultant(num, consultant, memberId);
    }

    @DeleteMapping("/delete/{num}")
    public ResponseEntity<?> deleteConsultant(@PathVariable("num") Long num) {
        if (!consultantService.existsByNum(num)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("기업 컨설팅 신청이 없음");
        }

        consultantService.deleteConsultantByNum(num);
        return ResponseEntity.ok("삭제 성공");
    }
}