package com.tbsc.consultant;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QConsultant is a Querydsl query type for Consultant
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QConsultant extends EntityPathBase<Consultant> {

    private static final long serialVersionUID = -95131701L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QConsultant consultant = new QConsultant("consultant");

    public final DateTimePath<java.time.LocalDateTime> appDate = createDateTime("appDate", java.time.LocalDateTime.class);

    public final StringPath category = createString("category");

    public final StringPath compName = createString("compName");

    public final StringPath difficulties = createString("difficulties");

    public final NumberPath<Integer> employees = createNumber("employees", Integer.class);

    public final StringPath file = createString("file");

    public final StringPath gender = createString("gender");

    public final StringPath management = createString("management");

    public final com.tbsc.member.QMember member;

    public final NumberPath<Long> num = createNumber("num", Long.class);

    public final StringPath ownerShip = createString("ownerShip");

    public final NumberPath<Integer> sales = createNumber("sales", Integer.class);

    public final DatePath<java.time.LocalDate> startDate = createDate("startDate", java.time.LocalDate.class);

    public final EnumPath<com.tbsc.util.ReserveType> state = createEnum("state", com.tbsc.util.ReserveType.class);

    public final StringPath support = createString("support");

    public final StringPath type = createString("type");

    public QConsultant(String variable) {
        this(Consultant.class, forVariable(variable), INITS);
    }

    public QConsultant(Path<? extends Consultant> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QConsultant(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QConsultant(PathMetadata metadata, PathInits inits) {
        this(Consultant.class, metadata, inits);
    }

    public QConsultant(Class<? extends Consultant> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new com.tbsc.member.QMember(forProperty("member"), inits.get("member")) : null;
    }

}

