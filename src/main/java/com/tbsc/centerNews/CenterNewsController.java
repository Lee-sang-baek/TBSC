package com.tbsc.centerNews;

import com.tbsc.centerNews.CenterNews;
import com.tbsc.centerNews.CenterNewsService;
import com.tbsc.member.Member;
import com.tbsc.member.MemberRepository;
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
@RequestMapping("/centernews")
public class CenterNewsController {

    @Autowired
    private CenterNewsService centerNewsService;

    @Autowired
    private MemberRepository memberRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @GetMapping
    public List<CenterNews> getAllCenterNews() {
        return centerNewsService.getAllCenterNews();
    }

    @GetMapping("/{num}")
    public CenterNews getCenterNewsById(@PathVariable("num") int num) {
        CenterNews centerNews = centerNewsService.getCenterNewsById(num);
        if (centerNews != null) {
            centerNews.setView(centerNews.getView() + 1);
            centerNewsService.saveCenterNews(centerNews);
        }
        return centerNews;
    }

    @PostMapping("/create")
    public CenterNews createCenterNews(@RequestPart("centerNews") CenterNews centerNews,
                                       @RequestPart(value = "file", required = false) MultipartFile file,
                                       @RequestPart(value = "attachment", required = false) MultipartFile attachment) throws IOException {
        Member member = memberRepository.findById(centerNews.getMember().getId()).orElse(null);
        centerNews.setMember(member);

        if (file != null && !file.isEmpty()) {
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir, fileName);
            Files.write(filePath, file.getBytes());
            centerNews.setImage(fileName);
        }

        if (attachment != null && !attachment.isEmpty()) {
            String attachmentName = System.currentTimeMillis() + "_" + attachment.getOriginalFilename();
            Path attachmentPath = Paths.get(uploadDir, attachmentName);
            Files.write(attachmentPath, attachment.getBytes());
            centerNews.setFileUrl(attachmentName);  // Only save the file name
        }

        return centerNewsService.saveCenterNews(centerNews);
    }

    @PutMapping("/update/{num}")
    public CenterNews updateCenterNews(@PathVariable("num") int num,
                                       @RequestPart("centerNews") CenterNews centerNews,
                                       @RequestPart(value = "file", required = false) MultipartFile file,
                                       @RequestPart(value = "attachment", required = false) MultipartFile attachment) throws IOException {
        CenterNews existingCenterNews = centerNewsService.getCenterNewsById(num);
        if (existingCenterNews == null) {
            throw new IllegalArgumentException("CenterNews not found with id: " + num);
        }
        existingCenterNews.setTitle(centerNews.getTitle());
        existingCenterNews.setContent(centerNews.getContent());

        Member member = memberRepository.findById(centerNews.getMember().getId()).orElse(null);
        existingCenterNews.setMember(member);

        if (file != null && !file.isEmpty()) {
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir, fileName);
            Files.write(filePath, file.getBytes());
            existingCenterNews.setImage(fileName);
        }

        if (attachment != null && !attachment.isEmpty()) {
            String attachmentName = System.currentTimeMillis() + "_" + attachment.getOriginalFilename();
            Path attachmentPath = Paths.get(uploadDir, attachmentName);
            Files.write(attachmentPath, attachment.getBytes());
            existingCenterNews.setFileUrl(attachmentName);
        }

        return centerNewsService.saveCenterNews(existingCenterNews);
    }

    @DeleteMapping("/delete/{num}")
    public void deleteCenterNews(@PathVariable("num") int num) {
        centerNewsService.deleteCenterNews(num);
    }
}
