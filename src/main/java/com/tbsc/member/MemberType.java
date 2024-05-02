package com.tbsc.member;

public enum MemberType {
    ADMIN("관리자"),
    COMP("기업회원"),
    NORMAL("일반회원");

    public final String korName;

    MemberType(String korName) {
        this.korName = korName;
    }
}