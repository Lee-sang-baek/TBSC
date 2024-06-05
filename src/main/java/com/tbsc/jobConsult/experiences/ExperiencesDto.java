package com.tbsc.jobConsult.experiences;

import com.tbsc.jobConsult.BaseDto;
import com.tbsc.jobConsult.JobConsult;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@RequiredArgsConstructor
public class ExperiencesDto implements BaseDto<Experiences> {
    private Long num;

    private String type;

    private String organization;

    private String duties;

    private LocalDate startDate;

    private LocalDate endDate;

    private JobConsult jobConsult;

    @Override
    public Experiences toEntity() {
        Experiences experiences = new Experiences();
        experiences.setNum(this.num);
        experiences.setType(this.type);
        experiences.setOrganization(this.organization);
        experiences.setDuties(this.duties);
        experiences.setStartDate(this.startDate);
        experiences.setEndDate(this.endDate);
        experiences.setJobConsult(this.jobConsult);

        return experiences;
    }
}
