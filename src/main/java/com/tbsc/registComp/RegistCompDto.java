package com.tbsc.registComp;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class RegistCompDto {

    private String title;

    private String compImage;

    private String writer;

    private String corpName;

    private String content;

    private String memberId;
}
