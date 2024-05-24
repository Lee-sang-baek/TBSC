package com.tbsc.search;

import com.tbsc.centerNews.CenterNewsRepository;
import com.tbsc.notice.NoticeRepository;
import com.tbsc.pressrelease.PressReleaseRepository;
import com.tbsc.search.SearchResultDto;
import com.tbsc.tnotice.TNoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SearchService {

    private final NoticeRepository noticeRepository;
    private final TNoticeRepository tNoticeRepository;
    private final CenterNewsRepository centerNewsRepository;
    private final PressReleaseRepository pressReleaseRepository;

    public Map<String, List<SearchResultDto>> searchAll(String title) {
        Map<String, List<SearchResultDto>> results = new HashMap<>();

        results.put("noticeResults", noticeRepository.findByTitleContaining(title).stream()
                .map(notice -> {
                    SearchResultDto dto = new SearchResultDto();
                    dto.setBoardName("공지사항");
                    dto.setTitle(notice.getTitle());
                    dto.setNum(notice.getNum());
                    dto.setId(notice.getMember().getId());
                    dto.setDate(notice.getDate());
                    return dto;
                }).collect(Collectors.toList()));

        results.put("tNoticeResults", tNoticeRepository.findByTitleContaining(title).stream()
                .map(tNotice -> {
                    SearchResultDto dto = new SearchResultDto();
                    dto.setBoardName("기업홍보");
                    dto.setTitle(tNotice.getTitle());
                    dto.setNum(tNotice.getNum());
                    dto.setId(tNotice.getMember().getId());
                    dto.setDate(tNotice.getDate());
                    return dto;
                }).collect(Collectors.toList()));

        results.put("centerNewsResults", centerNewsRepository.findByTitleContaining(title).stream()
                .map(centerNews -> {
                    SearchResultDto dto = new SearchResultDto();
                    dto.setBoardName("센터뉴스");
                    dto.setTitle(centerNews.getTitle());
                    dto.setNum(centerNews.getNum());
                    dto.setId(centerNews.getMember().getId());
                    dto.setDate(centerNews.getDate());
                    return dto;
                }).collect(Collectors.toList()));

        results.put("pressReleaseResults", pressReleaseRepository.findByTitleContaining(title).stream()
                .map(pressRelease -> {
                    SearchResultDto dto = new SearchResultDto();
                    dto.setBoardName("보도자료");
                    dto.setTitle(pressRelease.getTitle());
                    dto.setNum(pressRelease.getNum());
                    dto.setId(pressRelease.getMember().getId());
                    dto.setDate(pressRelease.getDate());
                    return dto;
                }).collect(Collectors.toList()));

        return results;
    }
}
