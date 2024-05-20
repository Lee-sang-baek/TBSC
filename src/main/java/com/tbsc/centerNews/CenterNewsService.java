package com.tbsc.centerNews;

import com.tbsc.centerNews.CenterNews;
import com.tbsc.centerNews.CenterNewsRepository;
import com.tbsc.member.Member;
import com.tbsc.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CenterNewsService {

    private final CenterNewsRepository centerNewsRepository;
    private final MemberRepository memberRepository;

    public List<CenterNews> getAllCenterNews() {
        return centerNewsRepository.findAll();
    }

    public CenterNews getCenterNewsById(int num) {
        return centerNewsRepository.findById(num).orElse(null);
    }

    public CenterNews saveCenterNews(CenterNews centerNews) {
        Member member = memberRepository.findById(centerNews.getMember().getId()).orElse(null);
        centerNews.setMember(member);
        return centerNewsRepository.save(centerNews);
    }

    public void deleteCenterNews(int num) {
        centerNewsRepository.deleteById(num);
    }
}
