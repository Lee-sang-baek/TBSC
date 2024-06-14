package com.tbsc.registComp;

import com.tbsc.member.Member;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class RegistComp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int num;

    @Column(nullable = false)
    private String title;

    @Lob
    private String compImage;

    private String writer;

    private String corpName;

    private int view = 0;

    @Column(nullable = false)
    private LocalDateTime date = LocalDateTime.now();

    @Column(nullable = false, columnDefinition="LONGTEXT")
    private String content;

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(referencedColumnName = "id", nullable = false)
    private Member member;

    public void bind(RegistCompDto registCompDto) {
        setTitle(registCompDto.getTitle());
        setCompImage(registCompDto.getCompImage());
        setWriter(registCompDto.getWriter());
        setCorpName(registCompDto.getCorpName());
        setContent(registCompDto.getContent());
    }
}
