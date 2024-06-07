package com.tbsc.management.mainImg;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
public class MainImage {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long num;

    private String image;

    private String title;

    @Column(columnDefinition="LONGTEXT")
    private String content;

    private LocalDateTime start;

    private LocalDateTime end;

    public MainImage bind(MainImageDto dto) {
        if (dto.getImage() != null) {
            setImage(dto.getImage());
        }
        setContent(dto.getContent());
        setTitle(dto.getTitle());
        setStart(dto.getStart());
        setEnd(dto.getEnd());
        return this;
    }
}
