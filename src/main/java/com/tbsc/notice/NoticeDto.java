package com.tbsc.notice;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
public class NoticeDto {

    private String title;
    private String state;
    private String fileUrl;
    private String imageUrl;
    private LocalDateTime date;
    private String id;
    private String content;

}
