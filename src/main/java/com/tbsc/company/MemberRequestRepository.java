package com.tbsc.company;


import com.tbsc.member.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRequestRepository extends JpaRepository<MemberRequest, Long> {
    Page<MemberRequest> findByStatus(ApplicationStatus status, Pageable pageable);

    Optional<MemberRequest> findByNum(Long num);

    Optional<MemberRequest> findByMember(Member member);

    void deleteByMember(Member member);
}
