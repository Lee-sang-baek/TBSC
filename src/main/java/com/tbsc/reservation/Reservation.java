package com.tbsc.reservation;


import com.tbsc.member.Member;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@Entity
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int num;
    private String fileUrl;
    private String title;
    private String content;
    private int view;
    private String image;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime date = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "member", referencedColumnName = "id")
    private Member member;


}
