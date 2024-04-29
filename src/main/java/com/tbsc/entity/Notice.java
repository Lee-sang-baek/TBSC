package com.tbsc.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Setter
@Getter
@Entity
public class Notice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer num;
    private String title;
    private String state;
    private Integer view;
    @ElementCollection // List 필드를 매핑할 때 사용
    private List<String> images; // List<String>으로 변경
    private Date date;
    private String id;
    private String content;


    public Notice() {}

    public Notice(String title, String state, Integer view, List<String> images, Date date, String id,String content) {
        this.title = title;
        this.state = state;
        this.view = view;
        this.images = images;
        this.date = date;
        this.id = id;
        this.content = content;
    }
}
