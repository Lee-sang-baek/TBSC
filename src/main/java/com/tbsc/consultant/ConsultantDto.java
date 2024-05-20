package com.tbsc.consultant;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class ConsultantDto {


    private String id;
    private String compName;
    private String gender;
    private String ownerShip;
    private Integer employees;
    private String type;
    private LocalDate startDate;
    private String category;
    private Integer sales;
    private LocalDateTime appDate;
    private String management;
    private String difficulties;
    private String support;
    private String file;
}
