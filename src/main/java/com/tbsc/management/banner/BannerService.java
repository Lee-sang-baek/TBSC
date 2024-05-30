package com.tbsc.management.banner;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BannerService {

    private final BannerRepository bannerRepository;

    public Page<Banner> getList(Pageable pageable) {
        return bannerRepository.findAll(pageable);
    }

    public List<Banner> getList() {
        return bannerRepository.findBannersWithinPeriod(LocalDateTime.now());
    }

    public void insertBanner(BannerDto bannerDto) {
        Banner banner = new Banner();
        banner.bind(bannerDto);
        bannerRepository.save(banner);
    }

    public void deleteBanner(long num) {
        bannerRepository.deleteById(num);
    }

    public void updateBanner(BannerDto bannerDto) {
        Optional<Banner> opBanner = bannerRepository.findById(bannerDto.getNum());
        if (opBanner.isPresent()) {
            Banner banner = opBanner.get();
            banner.bind(bannerDto);
            bannerRepository.save(banner);
        }
    }
}
