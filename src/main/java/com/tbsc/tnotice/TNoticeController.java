package com.tbsc.tnotice;

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
@RequestMapping("/tnotice")
public class TNoticeController {

    @Autowired
    private TNoticeService tNoticeService;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @GetMapping
    public List<TNotice> getAllNotices() {
        return tNoticeService.getAllNotices();
    }

    @GetMapping("/{num}")
    public TNotice getNoticeById(@PathVariable("num") int num) {
        TNotice tNotice = tNoticeService.getNoticeById(num);
        if (tNotice != null) {
            tNotice.setView(tNotice.getView() + 1);
            tNoticeService.saveNotice(tNotice);
        }
        return tNotice;
    }

    @PostMapping("/create")
    public TNotice createNotice(@RequestPart("notice") TNotice tNotice, @RequestPart("file") MultipartFile file) throws IOException {
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir, fileName);
        Files.write(filePath, file.getBytes());
        tNotice.setImage(fileName);
        return tNoticeService.saveNotice(tNotice);
    }

    @PutMapping("/update/{num}")
    public TNotice updateNotice(@PathVariable("num") int num, @RequestPart("notice") TNotice tNotice, @RequestPart(value = "file", required = false) MultipartFile file) throws IOException {
        TNotice existingNotice = tNoticeService.getNoticeById(num);
        if (existingNotice == null) {
            throw new IllegalArgumentException("Notice not found with id: " + num);
        }
        existingNotice.setTitle(tNotice.getTitle());
        existingNotice.setContent(tNotice.getContent());

        if (file != null && !file.isEmpty()) {
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir, fileName);
            Files.write(filePath, file.getBytes());
            existingNotice.setImage(fileName);
        }
        return tNoticeService.saveNotice(existingNotice);
    }

    @DeleteMapping("/delete/{num}")
    public void deleteNotice(@PathVariable("num") int num) {
        tNoticeService.deleteNotice(num);
    }
}
