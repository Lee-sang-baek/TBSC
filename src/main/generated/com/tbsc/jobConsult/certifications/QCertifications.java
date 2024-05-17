package com.tbsc.jobConsult.certifications;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCertifications is a Querydsl query type for Certifications
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCertifications extends EntityPathBase<Certifications> {

    private static final long serialVersionUID = 1141182322L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCertifications certifications = new QCertifications("certifications");

    public final DatePath<java.time.LocalDate> acquisitionDate = createDate("acquisitionDate", java.time.LocalDate.class);

    public final StringPath certificateNumber = createString("certificateNumber");

    public final com.tbsc.jobConsult.QJobConsult jobConsult;

    public final StringPath name = createString("name");

    public final NumberPath<Long> num = createNumber("num", Long.class);

    public QCertifications(String variable) {
        this(Certifications.class, forVariable(variable), INITS);
    }

    public QCertifications(Path<? extends Certifications> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCertifications(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCertifications(PathMetadata metadata, PathInits inits) {
        this(Certifications.class, metadata, inits);
    }

    public QCertifications(Class<? extends Certifications> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.jobConsult = inits.isInitialized("jobConsult") ? new com.tbsc.jobConsult.QJobConsult(forProperty("jobConsult"), inits.get("jobConsult")) : null;
    }

}

