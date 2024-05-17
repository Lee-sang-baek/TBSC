package com.tbsc.jobConsult.experiences;

import com.tbsc.jobConsult.JobConsult;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
public class Experiences {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long num;

    private String type;

    private String organization;

    private String duties;

    private LocalDate startDate;

    private LocalDate endDate;

    @ManyToOne
    private JobConsult jobConsult;
}
