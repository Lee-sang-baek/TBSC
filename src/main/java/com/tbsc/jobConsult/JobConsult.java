package com.tbsc.jobConsult;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tbsc.jobConsult.certifications.Certifications;
import com.tbsc.jobConsult.education.Education;
import com.tbsc.jobConsult.experiences.Experiences;
import com.tbsc.jobConsult.languages.Languages;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

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

    @OneToOne
    private Education education;

    @OneToMany(mappedBy = "jobConsult", cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Experiences> experiences;

    @OneToMany(mappedBy = "jobConsult", cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Certifications> certifications;

    @OneToMany(mappedBy = "jobConsult", cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Languages> languages;

    private String other;

    private String selfIntroduction;

    public void bind(JobConsultDto dto) {
        setCategory(dto.getCategory());
        setIndustry(dto.getIndustry());
        setEducation(dto.getEducation());
        setExperiences(dto.getExperiences());
        setCertifications(dto.getCertifications());
        setLanguages(dto.getLanguages());
        setOther(dto.getOther());
        setSelfIntroduction(dto.getSelfIntroduction());
    }
}
