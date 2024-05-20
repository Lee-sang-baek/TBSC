package com.tbsc.rental;

import com.tbsc.member.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "RENTAL")
public class Rental {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer num;

    @NotNull
    private String gender;
    private String compName;
    private Integer person;
    private String place;
    @Column(columnDefinition = "TIMESTAMP(0)")
    private Date startDate;
    @Column(columnDefinition = "TIMESTAMP(0)")
    private Date endDate;
    private String purpose;
    private String prepare;

    @ManyToOne
    @JoinColumn(name = "member", referencedColumnName = "id", updatable = false)
    @JsonIgnore
    private Member member;

    public Rental() {}
}