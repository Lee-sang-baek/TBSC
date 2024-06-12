package com.tbsc.management.mainImg;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class MainImageController {

    private final MainImageService mainImageService;

    @GetMapping("/mainImage")
    public ResponseEntity<List<MainImage>> getListForBanner() {
        return ResponseEntity.ok(mainImageService.getList());
    }

    @GetMapping("/admin/mainImage/list")
    public ResponseEntity<Page<MainImage>> getImageList(@RequestParam("page") int page,
                                                        @RequestParam("size") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<MainImage> mainImages = mainImageService.getList(pageable);
        return ResponseEntity.ok(mainImages);
    }

    @PostMapping("/admin/mainImage/add")
    public ResponseEntity<String> addImage(@RequestBody MainImageDto mainImageDto) {
        mainImageService.insertImage(mainImageDto);
        return ResponseEntity.ok("메인 이미지 추가 완료");
    }

    @GetMapping("/admin/mainImage/remove")
    public ResponseEntity<String> removeImage(@RequestParam("num") long num) {
        mainImageService.deleteImage(num);
        return ResponseEntity.ok("메인 이미지 제거 완료");
    }

    @PostMapping("/admin/mainImage/update")
    public ResponseEntity<String> updateMainImage(@RequestBody MainImageDto mainImageDto) {
        mainImageService.updateMainImage(mainImageDto);
        return ResponseEntity.ok("메인 이미지 수정 완료");
    }
}
