package com.tbsc.log;

import com.tbsc.member.Member;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "Log")
@Getter @Setter
@RequiredArgsConstructor
public class AccessLog {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long num;

    @ManyToOne
    @JoinColumn(name = "member", referencedColumnName = "id", updatable = false)
    private Member member;

    private String path;

    private LocalDateTime time;

    private String ipAddress;

}