package com.tbsc.jobConsult.certifications;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tbsc.jobConsult.*;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
public class Certifications extends BaseEntity implements JobConsultAware {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long num;

    private String name;

    private String certificateNumber;

    private LocalDate acquisitionDate;

    @ManyToOne
    @JsonIgnore
    private JobConsult jobConsult;

    @Override
    public void bind(BaseDto dto) {
        if (dto instanceof CertificationsDto certificationsDto) {
            setName(certificationsDto.getName());
            setCertificateNumber(certificationsDto.getCertificateNumber());
            setAcquisitionDate(certificationsDto.getAcquisitionDate());
            setNum(certificationsDto.getNum());
            setJobConsult(certificationsDto.getJobConsult());
        }

    }
}
