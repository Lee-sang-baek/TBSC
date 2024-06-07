package com.tbsc.jobConsult.certifications;

import com.tbsc.jobConsult.BaseDto;
import com.tbsc.jobConsult.JobConsult;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@RequiredArgsConstructor
public class CertificationsDto implements BaseDto<Certifications> {
    private Long num;

    private String name;

    private String certificateNumber;

    private LocalDate acquisitionDate;

    private JobConsult jobConsult;


    @Override
    public Certifications toEntity() {
        Certifications certifications = new Certifications();
        certifications.setNum(this.num);
        certifications.setName(this.name);
        certifications.setCertificateNumber(this.certificateNumber);
        certifications.setAcquisitionDate(this.acquisitionDate);
        certifications.setJobConsult(this.jobConsult);

        return certifications;
    }
}
