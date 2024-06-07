package com.tbsc.jobConsult;

public interface BaseDto<T extends BaseEntity> {
    Long getNum();
    T toEntity();
}