package com.tbsc.centerNews;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCenterNews is a Querydsl query type for CenterNews
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCenterNews extends EntityPathBase<CenterNews> {

    private static final long serialVersionUID = -866130517L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCenterNews centerNews = new QCenterNews("centerNews");

    public final StringPath content = createString("content");

    public final DateTimePath<java.util.Date> date = createDateTime("date", java.util.Date.class);

    public final StringPath fileUrl = createString("fileUrl");

    public final StringPath image = createString("image");

    public final com.tbsc.member.QMember member;

    public final NumberPath<Integer> num = createNumber("num", Integer.class);

    public final StringPath title = createString("title");

    public final NumberPath<Integer> view = createNumber("view", Integer.class);

    public QCenterNews(String variable) {
        this(CenterNews.class, forVariable(variable), INITS);
    }

    public QCenterNews(Path<? extends CenterNews> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCenterNews(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCenterNews(PathMetadata metadata, PathInits inits) {
        this(CenterNews.class, metadata, inits);
    }

    public QCenterNews(Class<? extends CenterNews> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new com.tbsc.member.QMember(forProperty("member")) : null;
    }

}

