package com.tbsc.jobConsult;

import com.tbsc.jobConsult.certifications.Certifications;
import com.tbsc.jobConsult.education.Education;
import com.tbsc.jobConsult.experiences.Experiences;
import com.tbsc.jobConsult.languages.Languages;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
public class JobConsultDto {

    private String category;

    private String industry;

    private Education education;

    private List<Experiences> experiences;

    private List<Certifications> certifications;

    private List<Languages> languages;

    private String other;

    private String selfIntroduction;
}
