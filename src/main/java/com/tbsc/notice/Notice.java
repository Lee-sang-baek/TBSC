package com.tbsc.notice;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tbsc.member.Member;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
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
    private Date date;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
    private Member member;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String content;

}
