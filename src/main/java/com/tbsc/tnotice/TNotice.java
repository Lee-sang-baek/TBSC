package com.tbsc.tnotice;

import com.tbsc.member.Member;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

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
    private Date date = new Date();

    private String id;

}
