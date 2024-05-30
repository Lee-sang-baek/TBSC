package com.tbsc.management.banner;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/banner")
public class BannerController {

    private final BannerService bannerService;

    @GetMapping("/list")
    public ResponseEntity<Page<Banner>> getBannerList(@RequestParam("page") int page,
                                                      @RequestParam("size") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Banner> banners = bannerService.getList(pageable);
        return ResponseEntity.ok(banners);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addBanner(@RequestBody BannerDto bannerDto) {
        bannerService.insertBanner(bannerDto);
        return ResponseEntity.ok("베너 추가 완료");
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateBanner(@RequestBody BannerDto bannerDto) {
        bannerService.updateBanner(bannerDto);
        return ResponseEntity.ok("베너 수정 완료");
    }

    @GetMapping("/remove")
    public ResponseEntity<String> removeBanner(@RequestParam("num") long num) {
        bannerService.deleteBanner(num);
        return ResponseEntity.ok("베너 제거 완료");
    }

}
