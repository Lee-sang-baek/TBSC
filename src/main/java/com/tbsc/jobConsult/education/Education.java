package com.tbsc.jobConsult.education;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tbsc.jobConsult.JobConsult;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Education {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long num;

    private String schoolName;

    private String major;

    private LocalDate admissionDate;

    private LocalDate graduationDate;

    private String academicStatus;

    @OneToOne(cascade = CascadeType.ALL)
    @JsonIgnore
    @JoinColumn(name = "jobConsult_num", referencedColumnName = "num")
    private JobConsult jobConsult;
}
