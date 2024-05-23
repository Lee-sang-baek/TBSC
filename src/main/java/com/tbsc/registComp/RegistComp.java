package com.tbsc.registcomp;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tbsc.member.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "RegistComp")
@Getter
@Setter
public class RegistComp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "num", nullable = false)
    private int num;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @Lob
    @Column(name = "company_image")
    private String compImage;

    @Column(name = "view")
    private int view;

    @Column(name = "date", nullable = false)
    private LocalDateTime date = LocalDateTime.now();

    @NotNull
    @Column(name = "content", nullable = false)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    @JsonIgnore
    private Member member;
}
