package com.tbsc.company;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class MemberRequestDto {

    private String memberId;

    private String compName;

    private String businessNum;

    private String representative;

    private String compAddress;

}
