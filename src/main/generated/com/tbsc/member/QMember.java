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

    public final ListPath<com.tbsc.centerNews.CenterNews, com.tbsc.centerNews.QCenterNews> centerNews = this.<com.tbsc.centerNews.CenterNews, com.tbsc.centerNews.QCenterNews>createList("centerNews", com.tbsc.centerNews.CenterNews.class, com.tbsc.centerNews.QCenterNews.class, PathInits.DIRECT2);

    public final StringPath compAddress = createString("compAddress");

    public final StringPath compName = createString("compName");

    public final ListPath<com.tbsc.consultant.Consultant, com.tbsc.consultant.QConsultant> consultants = this.<com.tbsc.consultant.Consultant, com.tbsc.consultant.QConsultant>createList("consultants", com.tbsc.consultant.Consultant.class, com.tbsc.consultant.QConsultant.class, PathInits.DIRECT2);

    public final StringPath detailAddress = createString("detailAddress");

    public final StringPath email = createString("email");

    public final StringPath id = createString("id");

    public final ListPath<com.tbsc.jobConsult.JobConsult, com.tbsc.jobConsult.QJobConsult> jobConsults = this.<com.tbsc.jobConsult.JobConsult, com.tbsc.jobConsult.QJobConsult>createList("jobConsults", com.tbsc.jobConsult.JobConsult.class, com.tbsc.jobConsult.QJobConsult.class, PathInits.DIRECT2);

    public final StringPath name = createString("name");

    public final ListPath<com.tbsc.notice.Notice, com.tbsc.notice.QNotice> notices = this.<com.tbsc.notice.Notice, com.tbsc.notice.QNotice>createList("notices", com.tbsc.notice.Notice.class, com.tbsc.notice.QNotice.class, PathInits.DIRECT2);

    public final StringPath password = createString("password");

    public final StringPath phoneNum = createString("phoneNum");

    public final ListPath<com.tbsc.pressrelease.PressRelease, com.tbsc.pressrelease.QPressRelease> pressReleases = this.<com.tbsc.pressrelease.PressRelease, com.tbsc.pressrelease.QPressRelease>createList("pressReleases", com.tbsc.pressrelease.PressRelease.class, com.tbsc.pressrelease.QPressRelease.class, PathInits.DIRECT2);

    public final ListPath<com.tbsc.rental.Rental, com.tbsc.rental.QRental> rentals = this.<com.tbsc.rental.Rental, com.tbsc.rental.QRental>createList("rentals", com.tbsc.rental.Rental.class, com.tbsc.rental.QRental.class, PathInits.DIRECT2);

    public final StringPath representative = createString("representative");

    public final ListPath<com.tbsc.reservation.Reservation, com.tbsc.reservation.QReservation> reservations = this.<com.tbsc.reservation.Reservation, com.tbsc.reservation.QReservation>createList("reservations", com.tbsc.reservation.Reservation.class, com.tbsc.reservation.QReservation.class, PathInits.DIRECT2);

    public final EnumPath<MemberType> state = createEnum("state", MemberType.class);

    public final ListPath<com.tbsc.tnotice.TNotice, com.tbsc.tnotice.QTNotice> tNotices = this.<com.tbsc.tnotice.TNotice, com.tbsc.tnotice.QTNotice>createList("tNotices", com.tbsc.tnotice.TNotice.class, com.tbsc.tnotice.QTNotice.class, PathInits.DIRECT2);

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

