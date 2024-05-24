package com.tbsc.jobConsult;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QJobConsult is a Querydsl query type for JobConsult
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QJobConsult extends EntityPathBase<JobConsult> {

    private static final long serialVersionUID = -85014709L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QJobConsult jobConsult = new QJobConsult("jobConsult");

    public final StringPath category = createString("category");

    public final ListPath<com.tbsc.jobConsult.certifications.Certifications, com.tbsc.jobConsult.certifications.QCertifications> certifications = this.<com.tbsc.jobConsult.certifications.Certifications, com.tbsc.jobConsult.certifications.QCertifications>createList("certifications", com.tbsc.jobConsult.certifications.Certifications.class, com.tbsc.jobConsult.certifications.QCertifications.class, PathInits.DIRECT2);

    public final DateTimePath<java.time.LocalDateTime> date = createDateTime("date", java.time.LocalDateTime.class);

    public final com.tbsc.jobConsult.education.QEducation education;

    public final ListPath<com.tbsc.jobConsult.experiences.Experiences, com.tbsc.jobConsult.experiences.QExperiences> experiences = this.<com.tbsc.jobConsult.experiences.Experiences, com.tbsc.jobConsult.experiences.QExperiences>createList("experiences", com.tbsc.jobConsult.experiences.Experiences.class, com.tbsc.jobConsult.experiences.QExperiences.class, PathInits.DIRECT2);

    public final StringPath industry = createString("industry");

    public final ListPath<com.tbsc.jobConsult.languages.Languages, com.tbsc.jobConsult.languages.QLanguages> languages = this.<com.tbsc.jobConsult.languages.Languages, com.tbsc.jobConsult.languages.QLanguages>createList("languages", com.tbsc.jobConsult.languages.Languages.class, com.tbsc.jobConsult.languages.QLanguages.class, PathInits.DIRECT2);

    public final com.tbsc.member.QMember member;

    public final NumberPath<Long> num = createNumber("num", Long.class);

    public final StringPath other = createString("other");

    public final StringPath selfIntroduction = createString("selfIntroduction");

    public final EnumPath<com.tbsc.util.ReserveType> state = createEnum("state", com.tbsc.util.ReserveType.class);

    public QJobConsult(String variable) {
        this(JobConsult.class, forVariable(variable), INITS);
    }

    public QJobConsult(Path<? extends JobConsult> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QJobConsult(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QJobConsult(PathMetadata metadata, PathInits inits) {
        this(JobConsult.class, metadata, inits);
    }

    public QJobConsult(Class<? extends JobConsult> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.education = inits.isInitialized("education") ? new com.tbsc.jobConsult.education.QEducation(forProperty("education"), inits.get("education")) : null;
        this.member = inits.isInitialized("member") ? new com.tbsc.member.QMember(forProperty("member"), inits.get("member")) : null;
    }

}

