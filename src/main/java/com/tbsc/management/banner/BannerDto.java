package com.tbsc.management.banner;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class BannerDto {

    private String image;

    private String state;

    private String content;

    private String title;
}
