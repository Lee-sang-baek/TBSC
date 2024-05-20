package com.tbsc.notice;

import com.tbsc.member.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/notices")
public class NoticeController {

    @Autowired
    private NoticeService noticeService;

    @Value("${file.upload-dir}")
    private String uploadDir;

    // 모든 공지사항 조회
    @GetMapping
    public List<Notice> getAllNotices() {
        return noticeService.getAllNotices();
    }

    // 공지사항 생성
    @PostMapping("/create")
    public ResponseEntity<Notice> createNotice(@RequestBody NoticeDto noticeDto) {
        System.out.println("Received file URL: " + noticeDto.getFileUrl());
        System.out.println(noticeDto.getId());
        System.out.println(noticeDto.getTitle());
        System.out.println(noticeDto.getState());
        System.out.println(noticeDto.getContent());
        System.out.println(noticeDto.getDate());

        return noticeService.createNotice(noticeDto);
    }

    // 공지사항 조회
    @GetMapping("/{num}")
    public ResponseEntity<Notice> getNoticeById(@PathVariable("num") Integer num) {
        Notice notice = noticeService.getNoticeById(num);
        notice.setView(notice.getView() + 1);
        noticeService.updateNotice(notice.getNum(), notice);
        return ResponseEntity.ok().body(notice);
    }

    @PutMapping("/update/{num}")
    public ResponseEntity<Notice> updateNotice(@PathVariable("num") Integer num, @RequestBody Notice notice) {
        Notice updatedNotice = noticeService.updateNotice(num, notice);
        return ResponseEntity.ok(updatedNotice);
    }



    @DeleteMapping("/delete/{num}")
    public ResponseEntity<Void> deleteNotice(@PathVariable("num") Integer num) {
        try {
            noticeService.deleteNotice(num);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).build(); // Use appropriate status code and logging
        }
    }


    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
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


    // 이미지 업로드 (다중 파일 업로드 예시)
    @PostMapping("/uploadImages")
    public ResponseEntity<List<String>> uploadImages(@RequestParam("images") MultipartFile[] files) {
        List<String> fileUrls = new ArrayList<>();
        for (MultipartFile file : files) {
            try {
                String fileName = System.currentTimeMillis() + "-" + file.getOriginalFilename();
                String filePath = uploadDir + File.separator + fileName;
                File dest = new File(filePath);
                file.transferTo(dest);
                fileUrls.add(filePath);
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(500).body(null);
            }
        }
        return ResponseEntity.ok(fileUrls);
    }
}
