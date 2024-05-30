package com.tbsc.management.popup;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
@RequiredArgsConstructor
public class PopupDto {

    private long num;

    private String image;

    private String title;

    private String content;

    private LocalDateTime start;

    private LocalDateTime end;


}
