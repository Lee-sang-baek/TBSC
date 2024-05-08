package com.tbsc.util;

import com.tbsc.log.AccessLog;
import com.tbsc.member.Member;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

public class EntitySpecifications {

    public static Specification<Member> containsText(String text) {
        return (Root<Member> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
            Predicate[] predicates = root.getModel().getDeclaredSingularAttributes().stream()
                    .filter(attribute -> attribute.getJavaType().equals(String.class))
                    .map(attribute -> criteriaBuilder.like(criteriaBuilder.lower(root.get(attribute.getName())), "%" + text.toLowerCase() + "%"))
                    .toArray(Predicate[]::new);
            return criteriaBuilder.or(predicates);
        };
    }

    public static Specification<AccessLog> isNull(String columnName) {
        return (root, query, cb) -> cb.isNull(root.get(columnName));
    }
}
