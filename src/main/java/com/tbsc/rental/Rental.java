package com.tbsc.rental;

import com.tbsc.member.Member;
import com.tbsc.util.ReserveType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDateTime;
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
    private LocalDateTime startDate;
    @Column(columnDefinition = "TIMESTAMP(0)")
    private LocalDateTime endDate;
    private String purpose;
    private String prepare;

    @ManyToOne
    @JoinColumn(name = "member", referencedColumnName = "id", updatable = false)
    private Member member;

    @Enumerated(EnumType.STRING)
    private ReserveType state = ReserveType.RESERVE;

    public Rental() {}
}