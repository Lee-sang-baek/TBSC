package com.tbsc.member;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tbsc.log.AccessLog;
import com.tbsc.rental.Rental;
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

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
    @JsonIgnore // 이 부분을 추가하여 JSON 직렬화에서 무시하도록 설정.
    private List<AccessLog> accessLogs = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
    @JsonIgnore // 이 부분을 추가하여 JSON 직렬화에서 무시하도록 설정.
    private List<Rental> rentals = new ArrayList<>();

    public Member bind(MemberDto memberDto, PasswordEncoder passwordEncoder) {
        this.setId(memberDto.getId());
        this.setPassword(passwordEncoder.encode(memberDto.getPassword()));
        this.setName(memberDto.getName());
        this.setCompName(memberDto.getCompName());
        this.setBusinessNum(memberDto.getBusinessNum());
        this.setRepresentative(memberDto.getRepresentative());
        this.setCompAddress(memberDto.getCompAddress());
        this.setAddress(memberDto.getAddress());
        this.setBirth(memberDto.getBirth());
        this.setEmail(memberDto.getEmail());
        this.setPhoneNum(memberDto.getPhoneNum());
        return this;
    }


}
