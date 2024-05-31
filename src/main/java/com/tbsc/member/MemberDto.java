package com.tbsc.member;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class MemberDto {

    private String id;

    private String password;

    private String confirmPassword;

    private String name;

    private String compName;

    private String businessNum;

    private String representative;

    private String compAddress;

    private String address;

    private String detailAddress;

    private LocalDate birth;

    private String email;

    private String phoneNum;

    private String newPassword;


    // 생성자, 게터, 세터 등 필요한 메서드를 추가할 수 있습니다.

}