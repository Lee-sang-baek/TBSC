package com.tbsc.jobConsult;

import com.tbsc.jobConsult.certifications.Certifications;
import com.tbsc.jobConsult.certifications.CertificationsDto;
import com.tbsc.jobConsult.education.Education;
import com.tbsc.jobConsult.experiences.Experiences;
import com.tbsc.jobConsult.experiences.ExperiencesDto;
import com.tbsc.jobConsult.languages.Languages;
import com.tbsc.jobConsult.languages.LanguagesDto;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
public class JobConsultDto implements BaseDto {
    private Long num;

    private String category;

    private String industry;

    private Education education;

    private LocalDateTime date;

    private List<ExperiencesDto> experiences;

    private List<CertificationsDto> certifications;

    private List<LanguagesDto> languages;

    private String other;

    private String selfIntroduction;

    private String memberId;

    @Override
    public BaseEntity toEntity() {
        JobConsult jobConsult = new JobConsult();
        jobConsult.setCategory(this.getCategory());
        jobConsult.setIndustry(this.getIndustry());
        jobConsult.setDate(this.getDate());
        jobConsult.setEducation(this.getEducation());

        List<Experiences> experiencesList = new ArrayList<>();
        for (ExperiencesDto experiencesDto : this.getExperiences()) {
            Experiences ex = experiencesDto.toEntity();
            experiencesList.add(ex);
        }
        jobConsult.setExperiences(experiencesList);

        List<Certifications> certificationsList = new ArrayList<>();
        for (CertificationsDto certificationsDto : this.getCertifications()) {
            Certifications certifications = certificationsDto.toEntity();
            certificationsList.add(certifications);
        }
        jobConsult.setCertifications(certificationsList);

        List<Languages> languagesList = new ArrayList<>();
        for (LanguagesDto languagesDto : this.getLanguages()) {
            Languages language = languagesDto.toEntity();
            languagesList.add(language);
        }
        jobConsult.setLanguages(languagesList);

        jobConsult.setOther(this.getOther());
        jobConsult.setSelfIntroduction(this.getSelfIntroduction());
        jobConsult.setNum(this.getNum());

        return jobConsult;
    }
}
