package com.tbsc.consultant;// File: ConsultantService.java

import com.tbsc.member.Member;
import com.tbsc.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.tbsc.consultant.Consultant;
import com.tbsc.consultant.ConsultantRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ConsultantService {

    private final ConsultantRepository consultantRepository;
    private final MemberRepository memberRepository;

    public ResponseEntity<Consultant> saveConsultant(ConsultantDto consultantDto) {
        Optional<Member> optionalMember = memberRepository.findById(consultantDto.getId());
        if (optionalMember.isPresent()) {
            Consultant consultant = new Consultant();
            consultant.bind(consultantDto);
            consultant.setMember(optionalMember.get());
            consultantRepository.save(consultant);
            return ResponseEntity.ok(consultant);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    public Page<Consultant> getConsultantList(String memberId, Pageable pageable) {
        return consultantRepository.findByMemberId(memberId, pageable);
    }
}
