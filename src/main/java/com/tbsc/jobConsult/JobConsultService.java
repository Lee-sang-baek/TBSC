package com.tbsc.jobConsult;

import com.tbsc.jobConsult.certifications.Certifications;
import com.tbsc.jobConsult.certifications.CertificationsDto;
import com.tbsc.jobConsult.certifications.CertificationsRepository;
import com.tbsc.jobConsult.education.Education;
import com.tbsc.jobConsult.education.EducationRepository;
import com.tbsc.jobConsult.experiences.Experiences;
import com.tbsc.jobConsult.experiences.ExperiencesDto;
import com.tbsc.jobConsult.experiences.ExperiencesRepository;
import com.tbsc.jobConsult.languages.Languages;
import com.tbsc.jobConsult.languages.LanguagesDto;
import com.tbsc.jobConsult.languages.LanguagesRepository;
import com.tbsc.member.Member;
import com.tbsc.member.MemberRepository;
import com.tbsc.rental.Rental;
import com.tbsc.util.ReserveType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JobConsultService {

    private final JobConsultRepository jobConsultRepository;
    private final CertificationsRepository certificationsRepository;
    private final ExperiencesRepository experiencesRepository;
    private final LanguagesRepository languagesRepository;
    private final EducationRepository educationRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public void insertJobConsult(JobConsultDto jobConsultDto) {
        Optional<Member> optionalMember = memberRepository.findById(jobConsultDto.getMemberId());

        JobConsult jobConsult = new JobConsult();
        jobConsult.bind(jobConsultDto);
        optionalMember.ifPresent(jobConsult::setMember);
        jobConsultRepository.save(jobConsult);

        Education education = jobConsultDto.getEducation();
        education.setJobConsult(jobConsult);
        educationRepository.save(education);

        List<ExperiencesDto> experiencesList = jobConsultDto.getExperiences();
        if (!experiencesList.isEmpty()) {
            experiencesList.forEach(e -> {
                Experiences experiences = e.toEntity();
                experiences.setJobConsult(jobConsult);
                experiencesRepository.save(experiences);
            });
        }

        List<CertificationsDto> certificationsList = jobConsultDto.getCertifications();
        if (!certificationsList.isEmpty()) {
            certificationsList.forEach(e -> {
                Certifications certifications = e.toEntity();
                certifications.setJobConsult(jobConsult);
                certificationsRepository.save(certifications);
            });
        }

        List<LanguagesDto> languagesList = jobConsultDto.getLanguages();
        if (!languagesList.isEmpty()) {
            languagesList.forEach(e -> {
                Languages languages = e.toEntity();
                languages.setJobConsult(jobConsult);
                languagesRepository.save(languages);
            });
        }

    }

    public List<JobConsult> selectJobConsult(String memberId) {
        return jobConsultRepository.findByMemberId(memberId);
    }

    public Page<JobConsult> getJobConsultList(String memberId, Pageable pageable) {
        return jobConsultRepository.findByMemberId(memberId, pageable);
    }

    public ResponseEntity<JobConsult> getJobConsult(Long num) {
        Optional<JobConsult> optionalJobConsult = jobConsultRepository.findByNum(num);
        return optionalJobConsult.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    public ResponseEntity<JobConsult> cancelJobConsult(Long num) {
        Optional<JobConsult> optionalJobConsult = jobConsultRepository.findById(num);
        if (optionalJobConsult.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        JobConsult jobConsult = optionalJobConsult.get();

        jobConsult.setState(ReserveType.CANCEL);

        jobConsultRepository.save(jobConsult);

        return ResponseEntity.ok(jobConsult);
    }

    @Transactional
    public void updateJobConsult(JobConsultDto jobConsultDto, Long num) {
        Optional<JobConsult> optionalJobConsult = jobConsultRepository.findByNum(num);
        if (optionalJobConsult.isEmpty()) {
            return;
        }
        JobConsult jobConsult = optionalJobConsult.get();
        jobConsult.bind(jobConsultDto);
        JobConsult newJobConsult = jobConsultRepository.save(jobConsult);

        updateEducation(jobConsult, jobConsultDto.getEducation());
        updateEntities(jobConsult.getExperiences(), jobConsultDto.getExperiences(), experiencesRepository, newJobConsult);
        updateEntities(jobConsult.getCertifications(), jobConsultDto.getCertifications(), certificationsRepository, newJobConsult);
        updateEntities(jobConsult.getLanguages(), jobConsultDto.getLanguages(), languagesRepository, newJobConsult);
    }

    private void updateEducation(JobConsult jobConsult, Education educationDto) {
        Education education = jobConsult.getEducation();
        if (education == null) {
            education = new Education();
            jobConsult.setEducation(education);
        }
        education.bind(educationDto);
        educationRepository.save(education);
    }

    private <T extends BaseEntity & JobConsultAware, D extends BaseDto<T>> void updateEntities(
            List<T> existingEntities,
            List<D> newEntities,
            JpaRepository<T, Long> repository,
            JobConsult jobConsult) {

        List<T> entitiesToSave = new ArrayList<>();
        List<T> removedEntities = new ArrayList<>();

        for (D newEntityDto : newEntities) {
            Long num = newEntityDto.getNum();
            if (num != null) {
                T existingEntity = existingEntities.stream()
                        .filter(e -> e.getNum().equals(num) && e.getClass() == newEntityDto.toEntity().getClass())
                        .findFirst().orElse(null);

                if (existingEntity != null) {
                    // 기존 엔티티 업데이트
                    existingEntity.bind(newEntityDto);
                    existingEntity.setJobConsult(jobConsult);
                    entitiesToSave.add(existingEntity);
                    removedEntities.add(existingEntity);
                } else {
                    // 새로운 엔티티 생성
                    T newEntity = newEntityDto.toEntity();
                    newEntity.setJobConsult(jobConsult);
                    entitiesToSave.add(newEntity);
                }
            } else {
                // 새로운 엔티티 생성 (ID가 null인 경우)
                T newEntity = newEntityDto.toEntity();
                newEntity.setJobConsult(jobConsult);
                entitiesToSave.add(newEntity);
            }
        }

        // 남아 있는 기존 엔티티 삭제
        if (!removedEntities.isEmpty()) {
            repository.deleteAll(removedEntities);
            repository.flush();
        }

        repository.saveAll(entitiesToSave);

    }

    public boolean existsByNum(Long num) {
        return jobConsultRepository.existsById(num);
    }

    public void deleteJobConsultByNum(Long num) {
        jobConsultRepository.deleteById(num);
    }
}
