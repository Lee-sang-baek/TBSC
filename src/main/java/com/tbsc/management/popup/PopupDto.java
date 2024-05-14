package com.tbsc.management.popup;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@RequiredArgsConstructor
public class PopupDto {

    private String image;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private String title;


}
