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
    @ElementCollection // List 필드를 매핑할 때 사용
    private List<String> images; // List<String>으로 변경
    private Date date;
    private String id;
    @Lob // 큰 데이터 저장을 위한 어노테이션
    @Column(columnDefinition = "TEXT")
    private String content; // HTML 형식으로 스타일이 적용된 내용을 저장


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
