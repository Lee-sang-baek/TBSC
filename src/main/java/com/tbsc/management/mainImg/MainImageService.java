package com.tbsc.management.mainImg;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MainImageService {

    private final MainImageRepository mainImageRepository;

    public Page<MainImage> getList(Pageable pageable) {
        return mainImageRepository.findAll(pageable);
    }

    public void insertImage(MainImageDto mainImageDto) {
        MainImage mainImage = new MainImage();
        mainImage.bind(mainImageDto);
        mainImageRepository.save(mainImage);
    }

    public void deleteImage(long num) {
        mainImageRepository.deleteById(num);
    }

    public void updateMainImage(MainImageDto mainImageDto) {
        Optional<MainImage> opImage = mainImageRepository.findById(mainImageDto.getNum());
        if (opImage.isPresent()) {
            MainImage image = opImage.get();
            image.bind(mainImageDto);
            mainImageRepository.save(image);
        }
    }

    public List<MainImage> getList() {
        return mainImageRepository.findMainImagesWithinPeriod(LocalDateTime.now());
    }
}
