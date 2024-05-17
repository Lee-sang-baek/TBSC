package com.tbsc.jobConsult.certifications;

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
public class Certifications {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long num;

    private String name;

    private String certificateNumber;

    private LocalDate acquisitionDate;

    @ManyToOne
    private JobConsult jobConsult;
}
