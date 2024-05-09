package com.tbsc.management.banner;

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
public class BannerController {

    private final BannerService bannerService;

    @GetMapping("/banner/list")
    public ResponseEntity<Page<Banner>> getBannerList(@RequestParam("page") int page,
                                                      @RequestParam("size") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Banner> banners = bannerService.getList(pageable);
        return ResponseEntity.ok(banners);
    }

}
