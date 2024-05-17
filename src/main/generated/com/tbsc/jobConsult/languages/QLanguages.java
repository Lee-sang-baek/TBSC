package com.tbsc.jobConsult.languages;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QLanguages is a Querydsl query type for Languages
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QLanguages extends EntityPathBase<Languages> {

    private static final long serialVersionUID = 1009123244L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QLanguages languages = new QLanguages("languages");

    public final StringPath certifiedExam = createString("certifiedExam");

    public final StringPath conversation = createString("conversation");

    public final com.tbsc.jobConsult.QJobConsult jobConsult;

    public final StringPath language = createString("language");

    public final NumberPath<Long> num = createNumber("num", Long.class);

    public final StringPath writing = createString("writing");

    public QLanguages(String variable) {
        this(Languages.class, forVariable(variable), INITS);
    }

    public QLanguages(Path<? extends Languages> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QLanguages(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QLanguages(PathMetadata metadata, PathInits inits) {
        this(Languages.class, metadata, inits);
    }

    public QLanguages(Class<? extends Languages> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.jobConsult = inits.isInitialized("jobConsult") ? new com.tbsc.jobConsult.QJobConsult(forProperty("jobConsult"), inits.get("jobConsult")) : null;
    }

}

