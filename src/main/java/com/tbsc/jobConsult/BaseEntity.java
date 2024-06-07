package com.tbsc.jobConsult;

public abstract class BaseEntity {
    public abstract Long getNum();

    public abstract void bind(BaseDto dto);
}