package com.tbsc.jobConsult;

import com.tbsc.jobConsult.certifications.Certifications;
import com.tbsc.jobConsult.certifications.CertificationsRepository;
import com.tbsc.jobConsult.education.Education;
import com.tbsc.jobConsult.education.EducationRepository;
import com.tbsc.jobConsult.experiences.Experiences;
import com.tbsc.jobConsult.experiences.ExperiencesRepository;
import com.tbsc.jobConsult.languages.Languages;
import com.tbsc.jobConsult.languages.LanguagesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JobConsultService {

    private final JobConsultRepository jobConsultRepository;
    private final CertificationsRepository certificationsRepository;
    private final ExperiencesRepository experiencesRepository;
    private final LanguagesRepository languagesRepository;
    private final EducationRepository educationRepository;

    @Transactional
    public void insertJobConsult(JobConsultDto jobConsultDto) {
        JobConsult jobConsult = new JobConsult();
        jobConsult.bind(jobConsultDto);
        jobConsultRepository.save(jobConsult);

        Education education = jobConsultDto.getEducation();
        education.setJobConsult(jobConsult);
        educationRepository.save(education);

        List<Experiences> experiencesList = jobConsultDto.getExperiences();
        if (!experiencesList.isEmpty()) {
            experiencesList.forEach(e -> {
                e.setJobConsult(jobConsult);
                experiencesRepository.save(e);
            });
        }

        List<Certifications> certificationsList = jobConsultDto.getCertifications();
        if (!certificationsList.isEmpty()) {
            certificationsList.forEach(e -> {
                e.setJobConsult(jobConsult);
                certificationsRepository.save(e);
            });
        }

        List<Languages> languagesList = jobConsultDto.getLanguages();
        if (!languagesList.isEmpty()) {
            languagesList.forEach(e -> {
                e.setJobConsult(jobConsult);
                languagesRepository.save(e);
            });
        }

    }
}
