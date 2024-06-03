    package com.tbsc.notice;

    import com.fasterxml.jackson.annotation.JsonIgnore;
    import com.tbsc.member.Member;
    import jakarta.persistence.*;
    import lombok.Getter;
    import lombok.RequiredArgsConstructor;
    import lombok.Setter;

    import java.time.LocalDateTime;
    import java.util.Date;
    import java.util.List;

    @Setter
    @Getter
    @Entity
    public class Notice {

        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        private Integer num;

        private String title;
        private String state;
        private Integer view = 0;
        private String fileUrl;
        private LocalDateTime date;

        @ManyToOne
        @JoinColumn(name = "member", referencedColumnName = "id", updatable = false)
        private Member member;

        @Lob
        @Column(columnDefinition = "LONGTEXT")
        private String content;

        public void bind(NoticeDto noticeDto) {
            setDate(noticeDto.getDate());
            setContent(noticeDto.getContent());
            setState(noticeDto.getState());
            setFileUrl(noticeDto.getFileUrl());
            setTitle(noticeDto.getTitle());
        }
    }
