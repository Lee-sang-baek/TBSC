package com.tbsc.jobConsult.experiences;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QExperiences is a Querydsl query type for Experiences
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QExperiences extends EntityPathBase<Experiences> {

    private static final long serialVersionUID = 848323016L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QExperiences experiences = new QExperiences("experiences");

    public final StringPath duties = createString("duties");

    public final DatePath<java.time.LocalDate> endDate = createDate("endDate", java.time.LocalDate.class);

    public final com.tbsc.jobConsult.QJobConsult jobConsult;

    public final NumberPath<Long> num = createNumber("num", Long.class);

    public final StringPath organization = createString("organization");

    public final DatePath<java.time.LocalDate> startDate = createDate("startDate", java.time.LocalDate.class);

    public final StringPath type = createString("type");

    public QExperiences(String variable) {
        this(Experiences.class, forVariable(variable), INITS);
    }

    public QExperiences(Path<? extends Experiences> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QExperiences(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QExperiences(PathMetadata metadata, PathInits inits) {
        this(Experiences.class, metadata, inits);
    }

    public QExperiences(Class<? extends Experiences> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.jobConsult = inits.isInitialized("jobConsult") ? new com.tbsc.jobConsult.QJobConsult(forProperty("jobConsult"), inits.get("jobConsult")) : null;
    }

}

