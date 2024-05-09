package com.tbsc.management.banner;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BannerService {

    private final BannerRepository bannerRepository;

    public Page<Banner> getList(Pageable pageable) {
        return bannerRepository.findAll(pageable);
    }
}
