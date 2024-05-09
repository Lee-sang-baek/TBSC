package com.tbsc.management.mainImg;

import jakarta.persistence.Entity;
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
    private long num;

    private String image;

    private String title;
}
