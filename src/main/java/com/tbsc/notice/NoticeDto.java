package com.tbsc.notice;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class NoticeDto {

    private String title;
    private String state;
    private String fileUrl;
    private Date date;
    private String id;
    private String content;
}
