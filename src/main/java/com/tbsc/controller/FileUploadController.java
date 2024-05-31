package com.tbsc.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
public class FileUploadController {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Value("${file.upload-dir}\\compinfo")
    private String registUploadDir;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            // uploadDir에 해당되는 디렉터리가 없으면, uploadDir에 포함되는 전체 디렉터리 생성
            File dir = new File(uploadDir);
            if (dir.exists() == false) {
                dir.mkdirs();
            }

            // 파일이 저장되는 경로에 파일의 오리지널 이름을 붙여 전체 경로를 생성
            String filePath = uploadDir + File.separator + file.getOriginalFilename();
            File dest = new File(filePath);
            file.transferTo(dest);

            // 데이터베이스에 저장할 때는 파일명만 저장
            String fileNameOnly = file.getOriginalFilename();

            // 예시로 파일명만 리턴. 이 부분에서 fileNameOnly를 데이터베이스에 저장하는 로직 추가 필요
            return ResponseEntity.ok(fileNameOnly);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Upload Failed: " + e.getMessage());
        }
    }

    @PostMapping("/upload/registCorp")
    public ResponseEntity<String> uploadRegistFile(@RequestParam("file") MultipartFile file) {
        try {
            // uploadDir에 해당되는 디렉터리가 없으면, uploadDir에 포함되는 전체 디렉터리 생성
            File dir = new File(registUploadDir);
            if (dir.exists() == false) {
                dir.mkdirs();
            }

            // 파일이 저장되는 경로에 파일의 오리지널 이름을 붙여 전체 경로를 생성
            String filePath = registUploadDir + File.separator + file.getOriginalFilename();
            File dest = new File(filePath);
            file.transferTo(dest);


            // 데이터베이스에 저장할 때는 파일명만 저장
            String fileNameOnly = file.getOriginalFilename();

            // 예시로 파일명만 리턴. 이 부분에서 fileNameOnly를 데이터베이스에 저장하는 로직 추가 필요
            return ResponseEntity.ok(fileNameOnly);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Upload Failed: " + e.getMessage());
        }
    }
}
