package com.tbsc.member;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tbsc.centerNews.CenterNews;
import com.tbsc.consultant.Consultant;
import com.tbsc.jobConsult.JobConsult;
import com.tbsc.log.AccessLog;
import com.tbsc.notice.Notice;
import com.tbsc.pressrelease.PressRelease;
import com.tbsc.registComp.RegistComp;
import com.tbsc.rental.Rental;
import com.tbsc.reservation.Reservation;
import com.tbsc.tnotice.TNotice;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Member")
@Getter @Setter
public class Member {

    @Id
    private String id;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String detailAddress;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private LocalDate birth;

    @Column(unique = true)
    private String email;

    @Column(nullable = false)
    private String phoneNum;

    private String compName;
    private String businessNum;
    private String representative;
    private String compAddress;

    @Enumerated(EnumType.STRING)
    private MemberType state;

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<AccessLog> accessLogs = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Rental> rentals = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<JobConsult> jobConsults = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Notice> notices = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<TNotice> tNotices = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<PressRelease> pressReleases = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Reservation> reservations = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<CenterNews> centerNews = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Consultant> consultants = new ArrayList<>();

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(referencedColumnName = "num")
    @JsonIgnore
    private RegistComp registComp;//




    public Member bind(MemberDto memberDto, PasswordEncoder passwordEncoder) {
        this.setId(memberDto.getId());
        this.setPassword(passwordEncoder.encode(memberDto.getPassword()));
        this.setName(memberDto.getName());
        this.setCompName(memberDto.getCompName());
        this.setBusinessNum(memberDto.getBusinessNum());
        this.setRepresentative(memberDto.getRepresentative());
        this.setCompAddress(memberDto.getCompAddress());
        this.setAddress(memberDto.getAddress());
        this.setDetailAddress(memberDto.getDetailAddress());
        this.setBirth(memberDto.getBirth());
        this.setEmail(memberDto.getEmail());
        this.setPhoneNum(memberDto.getPhoneNum());

        return this;
    }

    public void bindElseIdAndPassword(MemberDto memberDto) {
        this.setName(memberDto.getName());
        this.setCompName(memberDto.getCompName());
        this.setBusinessNum(memberDto.getBusinessNum());
        this.setRepresentative(memberDto.getRepresentative());
        this.setCompAddress(memberDto.getCompAddress());
        this.setAddress(memberDto.getAddress());
        this.setDetailAddress(memberDto.getDetailAddress());
        this.setBirth(memberDto.getBirth());
        this.setEmail(memberDto.getEmail());
        this.setPhoneNum(memberDto.getPhoneNum());
    }
}
