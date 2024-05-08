package com.tbsc.Rental;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QRental is a Querydsl query type for Rental
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QRental extends EntityPathBase<Rental> {

    private static final long serialVersionUID = -595438069L;

    public static final QRental rental = new QRental("rental");

    public final StringPath compName = createString("compName");

    public final DateTimePath<java.util.Date> endDate = createDateTime("endDate", java.util.Date.class);

    public final StringPath gender = createString("gender");

    public final StringPath id = createString("id");

    public final NumberPath<Integer> num = createNumber("num", Integer.class);

    public final NumberPath<Integer> person = createNumber("person", Integer.class);

    public final StringPath place = createString("place");

    public final StringPath prepare = createString("prepare");

    public final StringPath purpose = createString("purpose");

    public final DateTimePath<java.util.Date> startDate = createDateTime("startDate", java.util.Date.class);

    public QRental(String variable) {
        super(Rental.class, forVariable(variable));
    }

    public QRental(Path<? extends Rental> path) {
        super(path.getType(), path.getMetadata());
    }

    public QRental(PathMetadata metadata) {
        super(Rental.class, metadata);
    }

}

