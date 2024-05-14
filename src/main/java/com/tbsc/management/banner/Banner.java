package com.tbsc.management.banner;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
public class Banner {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long num;

    private String image;

    @Enumerated(EnumType.STRING)
    private BannerType state;

    private String content;

    private String title;

    public Banner bind(BannerDto dto) {
        setImage(dto.getImage());
        if (dto.getState().equals("MAIN")) {
            setState(BannerType.MAIN);
        } else {
            setState(BannerType.SIDE);
        }
        setContent(dto.getContent());
        setTitle(dto.getTitle());
        return this;
    }

}
