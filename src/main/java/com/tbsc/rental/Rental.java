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

    @NotNull
    @Column(name = "member_id")
    private String memberId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
    private Member member;

    public Rental() {}
}