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

    public MainImage bind(MainImageDto dto) {
        setImage(dto.getImage());
        setTitle(dto.getTitle());
        return this;
    }
}
