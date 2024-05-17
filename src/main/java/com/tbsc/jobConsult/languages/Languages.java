package com.tbsc.jobConsult.languages;

import com.tbsc.jobConsult.JobConsult;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
public class Languages {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long num;

    private String language;

    private String certifiedExam;

    private String conversation;

    private String writing;

    @ManyToOne
    private JobConsult jobConsult;
}
