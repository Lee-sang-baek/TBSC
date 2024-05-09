package com.tbsc.management.mainImg;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MainImageService {

    private final MainImageRepository mainImageRepository;

    public Page<MainImage> getList(Pageable pageable) {
        return mainImageRepository.findAll(pageable);
    }
}
