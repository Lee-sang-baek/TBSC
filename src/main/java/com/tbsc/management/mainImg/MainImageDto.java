package com.tbsc.management.mainImg;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@RequiredArgsConstructor
public class MainImageDto {

    private long num;

    private String image;

    private String title;

    private String content;

    private LocalDateTime start;

    private LocalDateTime end;
}
