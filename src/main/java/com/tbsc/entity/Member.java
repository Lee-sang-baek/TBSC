package com.tbsc.entity;

import com.tbsc.dto.MemberDto;
import com.tbsc.enums.MemberType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Date;

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
    private Date birth;

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
