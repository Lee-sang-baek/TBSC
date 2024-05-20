package com.tbsc.pressrelease;

import com.tbsc.member.Member;
import com.tbsc.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PressReleaseService {

    private final PressReleaseRepository pressReleaseRepository;
    private final MemberRepository memberRepository;

    public List<PressRelease> getAllPressReleases() {
        return pressReleaseRepository.findAll();
    }

    public PressRelease getPressReleaseById(int num) {
        return pressReleaseRepository.findById(num).orElse(null);
    }

    public PressRelease savePressRelease(PressRelease pressRelease) {
        Member member = memberRepository.findById(pressRelease.getMember().getId()).orElse(null);
        pressRelease.setMember(member);
        return pressReleaseRepository.save(pressRelease);
    }

    public void deletePressRelease(int num) {
        pressReleaseRepository.deleteById(num);
    }
}
