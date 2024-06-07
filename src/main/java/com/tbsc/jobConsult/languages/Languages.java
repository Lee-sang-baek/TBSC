package com.tbsc.jobConsult.languages;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tbsc.jobConsult.BaseDto;
import com.tbsc.jobConsult.BaseEntity;
import com.tbsc.jobConsult.JobConsult;
import com.tbsc.jobConsult.JobConsultAware;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
public class Languages extends BaseEntity implements JobConsultAware {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long num;

    private String language;

    private String certifiedExam;

    private String conversation;

    private String writing;

    @ManyToOne
    @JsonIgnore
    private JobConsult jobConsult;

    @Override
    public void bind(BaseDto dto) {
        if (dto instanceof LanguagesDto languagesDto) {
            setNum(languagesDto.getNum());
            setLanguage(languagesDto.getLanguage());
            setCertifiedExam(languagesDto.getCertifiedExam());
            setConversation(languagesDto.getConversation());
            setWriting(languagesDto.getWriting());
            setJobConsult(languagesDto.getJobConsult());
        }
    }

}
