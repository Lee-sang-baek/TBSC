package com.tbsc.jobConsult;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tbsc.jobConsult.certifications.Certifications;
import com.tbsc.jobConsult.education.Education;
import com.tbsc.jobConsult.experiences.Experiences;
import com.tbsc.jobConsult.languages.Languages;
import com.tbsc.member.Member;
import com.tbsc.util.ReserveType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
public class JobConsult {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long num;

    private String category;

    private String industry;

    private LocalDateTime date;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "education_num", referencedColumnName = "num")
    private Education education;

    @OneToMany(mappedBy = "jobConsult", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Experiences> experiences;

    @OneToMany(mappedBy = "jobConsult", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Certifications> certifications;

    @OneToMany(mappedBy = "jobConsult", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Languages> languages;

    private String other;

    private String selfIntroduction;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "member", referencedColumnName = "id", updatable = false)
    private Member member;

    @Enumerated(EnumType.STRING)
    private ReserveType state = ReserveType.RESERVE;

    public void bind(JobConsultDto dto) {
        setCategory(dto.getCategory());
        setIndustry(dto.getIndustry());
        setDate(dto.getDate());
        setEducation(dto.getEducation());
        setExperiences(dto.getExperiences());
        setCertifications(dto.getCertifications());
        setLanguages(dto.getLanguages());
        setOther(dto.getOther());
        setSelfIntroduction(dto.getSelfIntroduction());
    }
}
