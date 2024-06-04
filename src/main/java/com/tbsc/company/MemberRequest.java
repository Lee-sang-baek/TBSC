package com.tbsc.company;

import com.tbsc.member.Member;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "MemberRequest")
@Getter @Setter
public class MemberRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long num;

    @OneToOne
    @JoinColumn(name = "member", referencedColumnName = "id")
    private Member member;

    @Column(nullable = false)
    private String compName;

    @Column(nullable = false)
    private String businessNum;

    @Column(nullable = false)
    private String representative;

    @Column(nullable = false)
    private String compAddress;


    @Enumerated(EnumType.STRING)
    private ApplicationStatus status = ApplicationStatus.WAIT;

    private LocalDateTime createdDate;

    private LocalDateTime updatedDate;

    @PrePersist
    protected void onCreate() {
        createdDate = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedDate = LocalDateTime.now();
    }
}
