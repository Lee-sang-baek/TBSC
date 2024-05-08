package com.tbsc.consultant;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "Consultant")
public class Consultant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer num;

    private String compName;
    private String gender;
    private String ownerShip;
    private Integer employees;
    private String type;
    private Date startDate;
    private String category;
    private Integer sales;
    private Date appDate;
    private String management;
    private String difficulties;
    private String support;
    private String file;

    // Getter and Setter methods
}
