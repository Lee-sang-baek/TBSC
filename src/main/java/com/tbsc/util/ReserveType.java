package com.tbsc.util;

public enum ReserveType {
    RESERVE("예약"),
    CHECK("검토"),
    APPROVE("승인"),
    DENY("거절"),
    CANCEL("취소");

    public final String korName;

    ReserveType(String korName) {
        this.korName = korName;
    }
}
