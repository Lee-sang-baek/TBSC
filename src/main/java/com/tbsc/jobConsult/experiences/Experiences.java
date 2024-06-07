package com.tbsc.jobConsult.experiences;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tbsc.jobConsult.BaseDto;
import com.tbsc.jobConsult.BaseEntity;
import com.tbsc.jobConsult.JobConsult;
import com.tbsc.jobConsult.JobConsultAware;
import com.tbsc.jobConsult.certifications.CertificationsDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
public class Experiences extends BaseEntity implements JobConsultAware {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long num;

    private String type;

    private String organization;

    private String duties;

    private LocalDate startDate;

    private LocalDate endDate;

    @ManyToOne
    @JsonIgnore
    private JobConsult jobConsult;

    @Override
    public void bind(BaseDto dto) {
        if (dto instanceof ExperiencesDto experiencesDto) {
            setNum(experiencesDto.getNum());
            setType(experiencesDto.getType());
            setOrganization(experiencesDto.getOrganization());
            setDuties(experiencesDto.getDuties());
            setStartDate(experiencesDto.getStartDate());
            setEndDate(experiencesDto.getEndDate());
            setJobConsult(experiencesDto.getJobConsult());
        }
    }
}
