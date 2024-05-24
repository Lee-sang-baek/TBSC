package com.tbsc.consultant;

import com.tbsc.member.Member;
import com.tbsc.util.ReserveType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "Consultant")
public class Consultant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer num;

    @ManyToOne
    @JoinColumn(name = "member", referencedColumnName = "id")
    private Member member;

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

    @Enumerated(EnumType.STRING)
    private ReserveType state = ReserveType.RESERVE;

    public void bind(ConsultantDto dto) {
        setCompName(dto.getCompName());
        setGender(dto.getGender());
        setOwnerShip(dto.getOwnerShip());
        setEmployees(dto.getEmployees());
        setType(dto.getType());
        setStartDate(dto.getStartDate());
        setCategory(dto.getCategory());
        setSales(dto.getSales());
        setAppDate(dto.getAppDate());
        setManagement(dto.getManagement());
        setDifficulties(dto.getDifficulties());
        setSupport(dto.getSupport());
        setFile(dto.getFile());
    }

}
