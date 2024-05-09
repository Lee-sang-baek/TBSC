package com.tbsc.management.banner;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
public class Banner {

    @Id
    private long num;

    private String image;

    private BannerType state;

    private String content;

    private String title;

}
