package com.tbsc.notice;

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
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer num;
    private String title;
    private String state;
    private Integer view = 0;
    private String fileUrl;
    @ElementCollection
    private List<String> images;
    private Date date;
    private String id;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String content;


    public Notice() {}

    public Notice(Integer num, String title, String state, Integer view, String fileUrl, List<String> images, Date date, String id, String content) {
        this.num = num;
        this.title = title;
        this.state = state;
        this.view = view;
        this.fileUrl = fileUrl;
        this.images = images;
        this.date = date;
        this.id = id;
        this.content = content;
    }
}
