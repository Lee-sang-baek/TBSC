package com.tbsc.management.mainImg;

import com.tbsc.management.banner.Banner;
import com.tbsc.management.banner.BannerDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class MainImageController {

    private final MainImageService mainImageService;

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
}
