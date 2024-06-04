package com.tbsc.company;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMemberRequest is a Querydsl query type for MemberRequest
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMemberRequest extends EntityPathBase<MemberRequest> {

    private static final long serialVersionUID = 99679905L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMemberRequest memberRequest = new QMemberRequest("memberRequest");

    public final StringPath businessNum = createString("businessNum");

    public final StringPath compAddress = createString("compAddress");

    public final StringPath compName = createString("compName");

    public final DateTimePath<java.time.LocalDateTime> createdDate = createDateTime("createdDate", java.time.LocalDateTime.class);

    public final com.tbsc.member.QMember member;

    public final NumberPath<Long> num = createNumber("num", Long.class);

    public final StringPath representative = createString("representative");

    public final EnumPath<ApplicationStatus> status = createEnum("status", ApplicationStatus.class);

    public final DateTimePath<java.time.LocalDateTime> updatedDate = createDateTime("updatedDate", java.time.LocalDateTime.class);

    public QMemberRequest(String variable) {
        this(MemberRequest.class, forVariable(variable), INITS);
    }

    public QMemberRequest(Path<? extends MemberRequest> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMemberRequest(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMemberRequest(PathMetadata metadata, PathInits inits) {
        this(MemberRequest.class, metadata, inits);
    }

    public QMemberRequest(Class<? extends MemberRequest> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new com.tbsc.member.QMember(forProperty("member"), inits.get("member")) : null;
    }

}

