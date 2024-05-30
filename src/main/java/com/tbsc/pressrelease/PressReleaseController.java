package com.tbsc.pressrelease;

import com.tbsc.member.Member;
import com.tbsc.member.MemberRepository;
import lombok.RequiredArgsConstructor;
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
@RequestMapping("/pressrelease")
@RequiredArgsConstructor
public class PressReleaseController {

    private final PressReleaseService pressReleaseService;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @GetMapping
    public List<PressRelease> getAllPressReleases() {
        return pressReleaseService.getAllPressReleases();
    }

    @GetMapping("/{num}")
    public PressRelease getPressReleaseById(@PathVariable("num") int num) {
        PressRelease pressRelease = pressReleaseService.getPressReleaseById(num);
        if (pressRelease != null) {
            pressRelease.setView(pressRelease.getView() + 1);
            pressReleaseService.savePressRelease(pressRelease);
        }
        return pressRelease;
    }

    @PostMapping("/create")
    public PressRelease createPressRelease(@RequestPart("pressRelease") PressRelease pressRelease,
                                           @RequestPart(value = "file", required = false) MultipartFile file,
                                           @RequestPart(value = "attachment", required = false) MultipartFile attachment) throws IOException {

        if (file != null && !file.isEmpty()) {
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir, fileName);
            Files.write(filePath, file.getBytes());
            pressRelease.setImage(fileName);
        }

        if (attachment != null && !attachment.isEmpty()) {
            String attachmentName = System.currentTimeMillis() + "_" + attachment.getOriginalFilename();
            Path attachmentPath = Paths.get(uploadDir, attachmentName);
            Files.write(attachmentPath, attachment.getBytes());
            pressRelease.setFileUrl(attachmentName);
        }

        return pressReleaseService.savePressRelease(pressRelease);
    }

    @PutMapping("/update/{num}")
    public PressRelease updatePressRelease(@PathVariable("num") int num,
                                           @RequestPart("pressRelease") PressRelease pressRelease,
                                           @RequestPart(value = "file", required = false) MultipartFile file,
                                           @RequestPart(value = "attachment", required = false) MultipartFile attachment) throws IOException {
        PressRelease existingPressRelease = pressReleaseService.getPressReleaseById(num);
        if (existingPressRelease == null) {
            throw new IllegalArgumentException("PressRelease not found with id: " + num);
        }
        existingPressRelease.setTitle(pressRelease.getTitle());
        existingPressRelease.setContent(pressRelease.getContent());

        if (file != null && !file.isEmpty()) {
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir, fileName);
            Files.write(filePath, file.getBytes());
            existingPressRelease.setImage(fileName);
        }

        if (attachment != null && !attachment.isEmpty()) {
            String attachmentName = System.currentTimeMillis() + "_" + attachment.getOriginalFilename();
            Path attachmentPath = Paths.get(uploadDir, attachmentName);
            Files.write(attachmentPath, attachment.getBytes());
            existingPressRelease.setFileUrl(attachmentName);
        }

        return pressReleaseService.savePressRelease(existingPressRelease);
    }

    @DeleteMapping("/delete/{num}")
    public void deletePressRelease(@PathVariable("num") int num) {
        pressReleaseService.deletePressRelease(num);
    }
}
