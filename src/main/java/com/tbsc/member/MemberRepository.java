package com.tbsc.member;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, String> {
    // 필요한 추가 메소드들
    Optional<Member> findByEmail(String email);
    @NonNull
    Optional<Member> findById(@NonNull String id);

    Optional<Member> findByIdAndPassword(String id, String hashedPassword);
}
