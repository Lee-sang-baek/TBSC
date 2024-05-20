package com.tbsc.consultant;

import com.tbsc.consultant.ConsultantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/consultants")
public class ConsultantController {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Autowired
    private ConsultantService consultantService;

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
}