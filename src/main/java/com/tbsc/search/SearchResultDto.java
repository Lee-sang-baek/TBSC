package com.tbsc.search;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

//@AllArgsConstructor
@Getter
@Setter
public class SearchResultDto {
    private String boardName;
    private String title;
    private Integer num;
    private String id;
    private LocalDateTime date;


}
