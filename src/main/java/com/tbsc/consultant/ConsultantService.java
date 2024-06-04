package com.tbsc.consultant;// File: ConsultantService.java

import com.tbsc.member.Member;
import com.tbsc.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

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

    public Page<Consultant> getConsultantPageableList(String memberId, Pageable pageable) {
        return consultantRepository.findByMemberId(memberId, pageable);
    }

    public Optional<Consultant> getConsultant(Long num) {
        return consultantRepository.findByNum(num);
    }

    public ResponseEntity<Consultant> updateConsultant(Long num, Consultant updatedConsultant, String memberId) {
        Optional<Consultant> optionalConsultant = consultantRepository.findById(num);
        if (optionalConsultant.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Optional<Member> optionalMember = memberRepository.findById(memberId);
        if (optionalMember.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        Consultant existingConsultant = optionalConsultant.get();
        existingConsultant.setMember(optionalMember.get());
        existingConsultant.setCompName(updatedConsultant.getCompName());
        existingConsultant.setGender(updatedConsultant.getGender());
        existingConsultant.setStartDate(updatedConsultant.getStartDate());
        consultantRepository.save(existingConsultant);

        return ResponseEntity.ok(existingConsultant);
    }
}
