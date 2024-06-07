package com.tbsc.jobConsult.languages;

import com.tbsc.jobConsult.BaseDto;
import com.tbsc.jobConsult.JobConsult;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class LanguagesDto implements BaseDto<Languages> {
    private Long num;

    private String language;

    private String certifiedExam;

    private String conversation;

    private String writing;

    private JobConsult jobConsult;

    @Override
    public Languages toEntity() {
        Languages languages = new Languages();
        languages.setNum(this.num);
        languages.setLanguage(this.language);
        languages.setCertifiedExam(this.certifiedExam);
        languages.setConversation(this.conversation);
        languages.setWriting(this.writing);
        languages.setJobConsult(this.jobConsult);

        return languages;
    }
}
