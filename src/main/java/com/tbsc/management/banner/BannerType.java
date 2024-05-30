package com.tbsc.management.banner;

public enum BannerType {
    MAIN("메인"),
    SIDE("사이드");

    public final String korName;

    BannerType(String korName) {
        this.korName = korName;
    }
}