package com.tbsc.registComp;

import com.tbsc.member.Member;
import com.tbsc.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RegistCompService {

    private final RegistCompRepository registCompRepository;
    private final MemberRepository memberRepository;

    public RegistComp saveRegistComp(RegistCompDto registCompDto) {
        RegistComp registComp = new RegistComp();
        registComp.bind(registCompDto);
        registComp.setMember(memberRepository.findById(registCompDto.getMemberId()).orElse(null));
        return registCompRepository.save(registComp);
    }

    public Optional<RegistComp> getRegistCompById(String memberId) {
        Member member = memberRepository.findById(memberId).orElse(null);
        return registCompRepository.findByMember(member);
    }

    public List<RegistComp> getAllRegistComps() {
        return registCompRepository.findAll();
    }

    public Optional<RegistComp> updateRegistComp(int id, RegistComp registComp) {
        return registCompRepository.findById(id)
                .map(existing -> {
                    existing.setTitle(registComp.getTitle());
                    existing.setCompImage(registComp.getCompImage());
                    existing.setView(registComp.getView());
                    existing.setDate(registComp.getDate());
                    existing.setContent(registComp.getContent());
                    existing.setMember(registComp.getMember());
                    return registCompRepository.save(existing);
                });
    }

    public boolean deleteRegistComp(int id) {
        return registCompRepository.findById(id)
                .map(registComp -> {
                    registCompRepository.delete(registComp);
                    return true;
                }).orElse(false);
    }
}