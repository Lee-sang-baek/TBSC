package com.tbsc.management.mainImg;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
public class MainImage {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long num;

    private String image;

    private String title;

    private String content;

    public MainImage bind(MainImageDto dto) {
        if (dto.getImage() != null) {
            setImage(dto.getImage());
        }
        setContent(dto.getContent());
        setTitle(dto.getTitle());
        return this;
    }
}
