package com.tbsc.management.banner;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@RequiredArgsConstructor
public class BannerDto {

    private long num;

    private String image;

    private String state;

    private String content;

    private String title;

    private LocalDateTime start;

    private LocalDateTime end;
}
