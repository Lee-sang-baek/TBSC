package com.tbsc.management.mainImg;

import com.tbsc.management.banner.Banner;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MainImageController {

    private final MainImageService mainImageService;

    @GetMapping("/mainImg/list")
    public ResponseEntity<Page<MainImage>> getImageList(@RequestParam("page") int page,
                                                        @RequestParam("size") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<MainImage> mainImages = mainImageService.getList(pageable);
        return ResponseEntity.ok(mainImages);
    }
}
