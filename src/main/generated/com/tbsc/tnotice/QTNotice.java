package com.tbsc.tnotice;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTNotice is a Querydsl query type for TNotice
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTNotice extends EntityPathBase<TNotice> {

    private static final long serialVersionUID = 690981447L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTNotice tNotice = new QTNotice("tNotice");

    public final StringPath content = createString("content");

    public final DateTimePath<java.time.LocalDateTime> date = createDateTime("date", java.time.LocalDateTime.class);

    public final StringPath image = createString("image");

    public final com.tbsc.member.QMember member;

    public final NumberPath<Integer> num = createNumber("num", Integer.class);

    public final StringPath title = createString("title");

    public final NumberPath<Integer> view = createNumber("view", Integer.class);

    public QTNotice(String variable) {
        this(TNotice.class, forVariable(variable), INITS);
    }

    public QTNotice(Path<? extends TNotice> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTNotice(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTNotice(PathMetadata metadata, PathInits inits) {
        this(TNotice.class, metadata, inits);
    }

    public QTNotice(Class<? extends TNotice> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new com.tbsc.member.QMember(forProperty("member"), inits.get("member")) : null;
    }

}

