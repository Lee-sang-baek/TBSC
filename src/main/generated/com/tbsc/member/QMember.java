package com.tbsc.member;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMember is a Querydsl query type for Member
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMember extends EntityPathBase<Member> {

    private static final long serialVersionUID = -99273365L;

    public static final QMember member = new QMember("member1");

    public final ListPath<com.tbsc.log.AccessLog, com.tbsc.log.QAccessLog> accessLogs = this.<com.tbsc.log.AccessLog, com.tbsc.log.QAccessLog>createList("accessLogs", com.tbsc.log.AccessLog.class, com.tbsc.log.QAccessLog.class, PathInits.DIRECT2);

    public final StringPath address = createString("address");

    public final DatePath<java.time.LocalDate> birth = createDate("birth", java.time.LocalDate.class);

    public final StringPath businessNum = createString("businessNum");

    public final StringPath compAddress = createString("compAddress");

    public final StringPath compName = createString("compName");

    public final StringPath email = createString("email");

    public final StringPath id = createString("id");

    public final StringPath name = createString("name");

    public final StringPath password = createString("password");

    public final StringPath phoneNum = createString("phoneNum");

    public final ListPath<com.tbsc.rental.Rental, com.tbsc.rental.QRental> rentals = this.<com.tbsc.rental.Rental, com.tbsc.rental.QRental>createList("rentals", com.tbsc.rental.Rental.class, com.tbsc.rental.QRental.class, PathInits.DIRECT2);

    public final StringPath representative = createString("representative");

    public final EnumPath<MemberType> state = createEnum("state", MemberType.class);

    public QMember(String variable) {
        super(Member.class, forVariable(variable));
    }

    public QMember(Path<? extends Member> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMember(PathMetadata metadata) {
        super(Member.class, metadata);
    }

}

