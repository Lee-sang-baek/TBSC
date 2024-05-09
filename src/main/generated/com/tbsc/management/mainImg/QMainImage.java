package com.tbsc.management.mainImg;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QMainImage is a Querydsl query type for MainImage
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMainImage extends EntityPathBase<MainImage> {

    private static final long serialVersionUID = 1366271478L;

    public static final QMainImage mainImage = new QMainImage("mainImage");

    public final StringPath image = createString("image");

    public final NumberPath<Long> num = createNumber("num", Long.class);

    public final StringPath title = createString("title");

    public QMainImage(String variable) {
        super(MainImage.class, forVariable(variable));
    }

    public QMainImage(Path<? extends MainImage> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMainImage(PathMetadata metadata) {
        super(MainImage.class, metadata);
    }

}

