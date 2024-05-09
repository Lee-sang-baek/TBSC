package com.tbsc.member;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, String> {
    // 필요한 추가 메소드들
    Optional<Member> findByEmail(String email);
    @NonNull
    Optional<Member> findById(@NonNull String id);

    Optional<Member> findByIdAndPassword(String id, String hashedPassword);

    Page<Member> findAll(Pageable pageable);

    Page<Member> findByNameContaining(String searchString, Pageable pageable);
    Page<Member> findByEmailContaining(String searchString, Pageable pageable);
    Page<Member> findByAddressContaining(String searchString, Pageable pageable);
    Page<Member> findByPhoneNumContaining(String searchString, Pageable pageable);
    Page<Member> findByCompNameContaining(String searchString, Pageable pageable);
    Page<Member> findByBusinessNumContaining(String searchString, Pageable pageable);
    Page<Member> findByRepresentativeContaining(String searchString, Pageable pageable);
    Page<Member> findByCompAddressContaining(String searchString, Pageable pageable);
    Page<Member> findAll(Specification<Member> spec, Pageable pageable);

}
