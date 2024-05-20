package com.tbsc.tnotice;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tbsc.member.Member;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "TNotice")
public class TNotice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int num;
    private String title;
    private String content;
    private int view;
    private String image;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime date = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "member", referencedColumnName = "id", updatable = false)
    private Member member;

    public void bind(TNoticeDto tNoticeDto) {
        setTitle(tNoticeDto.getTitle());
        setContent(tNoticeDto.getContent());
        setImage(tNoticeDto.getImage());
    }
}
