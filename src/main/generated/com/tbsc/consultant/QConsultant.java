package com.tbsc.consultant;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QConsultant is a Querydsl query type for Consultant
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QConsultant extends EntityPathBase<Consultant> {

    private static final long serialVersionUID = -95131701L;

    public static final QConsultant consultant = new QConsultant("consultant");

    public final DateTimePath<java.util.Date> appDate = createDateTime("appDate", java.util.Date.class);

    public final StringPath category = createString("category");

    public final StringPath compName = createString("compName");

    public final StringPath difficulties = createString("difficulties");

    public final NumberPath<Integer> employees = createNumber("employees", Integer.class);

    public final StringPath file = createString("file");

    public final StringPath gender = createString("gender");

    public final StringPath id = createString("id");

    public final StringPath management = createString("management");

    public final NumberPath<Integer> num = createNumber("num", Integer.class);

    public final StringPath ownerShip = createString("ownerShip");

    public final NumberPath<Integer> sales = createNumber("sales", Integer.class);

    public final DateTimePath<java.util.Date> startDate = createDateTime("startDate", java.util.Date.class);

    public final StringPath support = createString("support");

    public final StringPath type = createString("type");

    public QConsultant(String variable) {
        super(Consultant.class, forVariable(variable));
    }

    public QConsultant(Path<? extends Consultant> path) {
        super(path.getType(), path.getMetadata());
    }

    public QConsultant(PathMetadata metadata) {
        super(Consultant.class, metadata);
    }

}

