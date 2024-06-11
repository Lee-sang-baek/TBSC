package com.tbsc.company;


import com.tbsc.member.Member;
import com.tbsc.member.MemberRepository;
import com.tbsc.member.MemberType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberRequestService {

    private final MemberRequestRepository memberRequestRepository;
    private final MemberRepository memberRepository;



    @Transactional
    public ResponseEntity<String> approveApplication(Long num) {
        Optional<MemberRequest> optionalMemberRequest = memberRequestRepository.findByNum(num);
        if (optionalMemberRequest.isPresent()) {
            MemberRequest memberRequest = optionalMemberRequest.get();
            Member member = memberRequest.getMember();
            if (member.getState() == MemberType.ADMIN) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이미 관리자 회원입니다.");
            }
            member.setCompName(memberRequest.getCompName());
            member.setBusinessNum(memberRequest.getBusinessNum());
            member.setRepresentative(memberRequest.getRepresentative());
            member.setCompAddress(memberRequest.getCompAddress());
            member.setState(MemberType.COMP);

            memberRequest.setStatus(ApplicationStatus.APPROVE);

            memberRepository.save(member);
            memberRequestRepository.save(memberRequest);

            return ResponseEntity.ok("승인 되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("신청이 존재하지 않습니다.");
        }
    }

    @Transactional
    public ResponseEntity<String> rejectApplication(Long num) {
        Optional<MemberRequest> optionalMemberRequest = memberRequestRepository.findByNum(num);
        if (optionalMemberRequest.isPresent()) {
            MemberRequest memberRequest = optionalMemberRequest.get();
            memberRequest.setStatus(ApplicationStatus.DENY);

            memberRequestRepository.save(memberRequest);
            return ResponseEntity.ok("거절 되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("신청이 존재하지 않습니다.");
        }
    }

    public ResponseEntity<Page<MemberRequest>> getList(Pageable pageable, ApplicationStatus category) {
        Page<MemberRequest> list;
        if (category == null) {
            list = memberRequestRepository.findAll(pageable);
        } else {
            list = memberRequestRepository.findByStatus(category, pageable);
        }
        return ResponseEntity.ok(list);

    }

    public ResponseEntity<String> addMemberRequest(MemberRequestDto memberRequestDto) {
        Optional<Member> optionalMember = memberRepository.findById(memberRequestDto.getMemberId());
        if (optionalMember.isPresent()) {
            Member member = optionalMember.get();
            Optional<MemberRequest> optionalMemberRequest = memberRequestRepository.findByMember(member);
            if (optionalMemberRequest.isPresent()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이미 신청중입니다.");
            }
            MemberRequest memberRequest = new MemberRequest();
            memberRequest.bind(memberRequestDto);
            memberRequest.setMember(member);
            memberRequestRepository.save(memberRequest);
            return ResponseEntity.ok("신청이 완료되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("존재하지 않는 회원입니다.");
        }
    }
}
