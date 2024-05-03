package com.tbsc.log;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAccessLog is a Querydsl query type for AccessLog
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAccessLog extends EntityPathBase<AccessLog> {

    private static final long serialVersionUID = 1775272403L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QAccessLog accessLog = new QAccessLog("accessLog");

    public final StringPath ipAddress = createString("ipAddress");

    public final com.tbsc.member.QMember member;

    public final NumberPath<Long> num = createNumber("num", Long.class);

    public final StringPath path = createString("path");

    public final DateTimePath<java.time.LocalDateTime> time = createDateTime("time", java.time.LocalDateTime.class);

    public QAccessLog(String variable) {
        this(AccessLog.class, forVariable(variable), INITS);
    }

    public QAccessLog(Path<? extends AccessLog> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QAccessLog(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QAccessLog(PathMetadata metadata, PathInits inits) {
        this(AccessLog.class, metadata, inits);
    }

    public QAccessLog(Class<? extends AccessLog> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new com.tbsc.member.QMember(forProperty("member")) : null;
    }

}

