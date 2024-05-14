package com.tbsc.management.banner;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class BannerController {

    private final BannerService bannerService;

    @GetMapping("/admin/banner/list")
    public ResponseEntity<Page<Banner>> getBannerList(@RequestParam("page") int page,
                                                      @RequestParam("size") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Banner> banners = bannerService.getList(pageable);
        return ResponseEntity.ok(banners);
    }

    @PostMapping("/admin/banner/add")
    public ResponseEntity<String> addBanner(@RequestBody BannerDto bannerDto) {
        bannerService.insertBanner(bannerDto);
        return ResponseEntity.ok("베너 추가 완료");
    }

    @PostMapping("/admin/banner/update")
    public ResponseEntity<String> updateBanner(@RequestBody BannerDto bannerDto) {
        bannerService.updateBanner(bannerDto);
        return ResponseEntity.ok("베너 수정 완료");
    }

    @GetMapping("/admin/banner/remove")
    public ResponseEntity<String> removeBanner(@RequestParam("num") long num) {
        bannerService.deleteBanner(num);
        return ResponseEntity.ok("베너 제거 완료");
    }

}
