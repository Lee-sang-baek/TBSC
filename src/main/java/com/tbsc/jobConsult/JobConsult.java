package com.tbsc.jobConsult;

import com.tbsc.jobConsult.certifications.Certifications;
import com.tbsc.jobConsult.certifications.CertificationsDto;
import com.tbsc.jobConsult.education.Education;
import com.tbsc.jobConsult.experiences.Experiences;
import com.tbsc.jobConsult.experiences.ExperiencesDto;
import com.tbsc.jobConsult.languages.Languages;
import com.tbsc.jobConsult.languages.LanguagesDto;
import com.tbsc.member.Member;
import com.tbsc.util.ReserveType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
public class JobConsult extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long num;

    private String category;

    private String industry;

    private LocalDateTime date;

    private LocalDateTime createDate = LocalDateTime.now();

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "education", referencedColumnName = "num")
    private Education education;

    @OneToMany(cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
    @JoinColumn(name = "job_consult_num", referencedColumnName = "num")
    private List<Experiences> experiences;

    @OneToMany(cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
    @JoinColumn(name = "job_consult_num", referencedColumnName = "num")
    private List<Certifications> certifications;

    @OneToMany(cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
    @JoinColumn(name = "job_consult_num", referencedColumnName = "num")
    private List<Languages> languages;

    private String other;

    private String selfIntroduction;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "member", referencedColumnName = "id", updatable = false)
    private Member member;

    @Enumerated(EnumType.STRING)
    private ReserveType state = ReserveType.RESERVE;

    @Override
    public void bind(BaseDto dto) {
        if (dto instanceof JobConsultDto jdto) {
            setCategory(jdto.getCategory());
            setIndustry(jdto.getIndustry());
            setDate(jdto.getDate());
            setEducation(jdto.getEducation());
            List<Experiences> experiencesList = new ArrayList<>();
            for (ExperiencesDto experiences : jdto.getExperiences()) {
                experiencesList.add(experiences.toEntity());
            }
            setExperiences(experiencesList);
            List<Certifications> certificationsList = new ArrayList<>();
            for (CertificationsDto certifications : jdto.getCertifications()) {
                certificationsList.add(certifications.toEntity());
            }
            setCertifications(certificationsList);
            List<Languages> languagesList = new ArrayList<>();
            for (LanguagesDto languages : jdto.getLanguages()) {
                languagesList.add(languages.toEntity());
            }
            setLanguages(languagesList);
            setOther(jdto.getOther());
            setSelfIntroduction(jdto.getSelfIntroduction());
        }

    }
}
