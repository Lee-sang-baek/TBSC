package com.tbsc.tnotice;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QTNotice is a Querydsl query type for TNotice
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTNotice extends EntityPathBase<TNotice> {

    private static final long serialVersionUID = 690981447L;

    public static final QTNotice tNotice = new QTNotice("tNotice");

    public final StringPath content = createString("content");

    public final DateTimePath<java.util.Date> date = createDateTime("date", java.util.Date.class);

    public final StringPath id = createString("id");

    public final StringPath image = createString("image");

    public final NumberPath<Integer> num = createNumber("num", Integer.class);

    public final StringPath title = createString("title");

    public final NumberPath<Integer> view = createNumber("view", Integer.class);

    public QTNotice(String variable) {
        super(TNotice.class, forVariable(variable));
    }

    public QTNotice(Path<? extends TNotice> path) {
        super(path.getType(), path.getMetadata());
    }

    public QTNotice(PathMetadata metadata) {
        super(TNotice.class, metadata);
    }

}

