package com.tbsc.tnotice;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class TNoticeDto {

    private String title;
    private String state;
    private String image;
    private Date date;
    private String id;
    private String content;
}

