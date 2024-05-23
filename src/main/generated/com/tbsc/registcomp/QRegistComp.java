package com.tbsc.registcomp;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QRegistComp is a Querydsl query type for RegistComp
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QRegistComp extends EntityPathBase<RegistComp> {

    private static final long serialVersionUID = -1198968405L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QRegistComp registComp = new QRegistComp("registComp");

    public final StringPath compImage = createString("compImage");

    public final StringPath content = createString("content");

    public final DateTimePath<java.time.LocalDateTime> date = createDateTime("date", java.time.LocalDateTime.class);

    public final com.tbsc.member.QMember member;

    public final NumberPath<Integer> num = createNumber("num", Integer.class);

    public final StringPath title = createString("title");

    public final NumberPath<Integer> view = createNumber("view", Integer.class);

    public QRegistComp(String variable) {
        this(RegistComp.class, forVariable(variable), INITS);
    }

    public QRegistComp(Path<? extends RegistComp> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QRegistComp(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QRegistComp(PathMetadata metadata, PathInits inits) {
        this(RegistComp.class, metadata, inits);
    }

    public QRegistComp(Class<? extends RegistComp> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new com.tbsc.member.QMember(forProperty("member")) : null;
    }

}

