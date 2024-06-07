package com.tbsc.consultant;// File: ConsultantService.java

import com.tbsc.member.Member;
import com.tbsc.member.MemberRepository;
import com.tbsc.util.ReserveType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
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

    public List<Consultant> getConsultantList(String memberId) {
        return consultantRepository.findByMemberId(memberId);
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
        updatedConsultant.setNum(existingConsultant.getNum());
        updatedConsultant.setState(existingConsultant.getState());
        updatedConsultant.setMember(existingConsultant.getMember());

        consultantRepository.save(updatedConsultant);

        return ResponseEntity.ok(updatedConsultant);
    }

    public boolean existsByNum(Long num) {
        return consultantRepository.existsById(num);
    }

    public void deleteConsultantByNum(Long num) {
        consultantRepository.deleteById(num);
    }

    public ResponseEntity<Consultant> cancelConsultant(Long num) {
        Optional<Consultant> optionalConsultant = consultantRepository.findById(num);
        if (optionalConsultant.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Consultant consultant = optionalConsultant.get();

        consultant.setState(ReserveType.CANCEL);

        consultantRepository.save(consultant);

        return ResponseEntity.ok(consultant);
    }
}
