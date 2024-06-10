package com.tbsc.controller.board;

import com.tbsc.centerNews.CenterNews;
import com.tbsc.centerNews.CenterNewsRepository;
import com.tbsc.member.Member;
import com.tbsc.member.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.*;

@SpringBootTest
public class CenterNewsControllerTest {

    @Autowired
    private CenterNewsRepository centerNewsRepository;

    @Autowired
    private MemberRepository memberRepository;

    public Map<String, String> create(String title, String content, String file, String image, String date) {
        Map<String, String> ma2 = new HashMap<>();
        ma2.put("제목", title);
        ma2.put("내용", content);
        ma2.put("파일", file);
        ma2.put("이미지", image);
        ma2.put("날짜", date);
        return ma2;
    }

    @Test
    void test1() {
        List<Map<String, String>> ma = new ArrayList<>();

        ma.add(create("광주관광기업지원센터, 스타트업 지원 프로그램 시작",
                "광주관광기업지원센터는 지역 스타트업을 위한 새로운 지원 프로그램을 시작합니다. 이 프로그램은 창업 초기 단계의 기업들에게 멘토링, 재정 지원 및 네트워킹 기회를 제공합니다.",
                "22.pdf", "22.png", "2024-11-01T10:00:00"));

        ma.add(create("광주관광기업지원센터, 2024년 관광 콘텐츠 공모전 개최",
                "광주관광기업지원센터는 2024년 관광 콘텐츠 공모전을 개최합니다. 이번 공모전은 광주를 주제로 한 창의적인 콘텐츠를 발굴하고 지원하는 것을 목표로 하며, 참가자들에게는 상금과 함께 다양한 혜택이 주어집니다.",
                "23.pdf", "23.png", "2024-11-05T14:00:00"));

        ma.add(create("광주관광기업지원센터, 청년 창업 워크숍 개최",
                "광주관광기업지원센터는 청년 창업자들을 위한 워크숍을 개최합니다. 이 워크숍은 창업 아이디어를 구체화하고 사업 계획을 수립하는 데 필요한 실질적인 도움을 제공합니다.",
                "24.pdf", "24.png", "2024-11-10T16:00:00"));

        ma.add(create("광주관광기업지원센터, 지역 관광 활성화 세미나 개최",
                "광주관광기업지원센터는 지역 관광 활성화를 위한 세미나를 개최합니다. 이번 세미나에서는 관광 전문가들이 참여하여 최신 트렌드와 성공 사례를 공유합니다.",
                "25.pdf", "25.png", "2024-11-15T18:00:00"));

        ma.add(create("광주관광기업지원센터, 지역 사회와 함께하는 환경 정화 활동",
                "광주관광기업지원센터는 지역 사회와 함께하는 환경 정화 활동을 진행합니다. 이 활동은 광주 지역의 자연환경 보호와 청결 유지를 목적으로 하며, 많은 자원봉사자들이 참여할 예정입니다.",
                "26.pdf", "26.png", "2024-11-20T09:00:00"));

        ma.add(create("광주관광기업지원센터, 관광 벤처 데모데이 개최",
                "광주관광기업지원센터는 관광 벤처 데모데이를 개최합니다. 이 행사에서는 지역 관광 벤처 기업들이 자신의 제품과 서비스를 발표하고, 투자자들과 네트워킹할 수 있는 기회를 제공합니다.",
                "27.pdf", "27.png", "2024-11-25T13:00:00"));

        ma.add(create("광주관광기업지원센터, 관광 스타트업 투자 유치 설명회",
                "광주관광기업지원센터는 관광 스타트업을 위한 투자 유치 설명회를 개최합니다. 이번 설명회에서는 투자 유치 전략과 성공 사례를 공유하며, 참가자들은 실질적인 조언을 받을 수 있습니다.",
                "28.pdf", "28.png", "2024-11-30T15:00:00"));

        ma.add(create("광주관광기업지원센터, 디지털 마케팅 전략 세미나 개최",
                "광주관광기업지원센터는 관광 기업들을 위한 디지털 마케팅 전략 세미나를 개최합니다. 이 세미나에서는 최신 마케팅 트렌드와 효과적인 온라인 마케팅 기법을 소개합니다.",
                "29.pdf", "29.png", "2024-12-05T10:00:00"));

        ma.add(create("광주관광기업지원센터, 관광 콘텐츠 크리에이터 양성 프로그램",
                "광주관광기업지원센터는 관광 콘텐츠 크리에이터 양성 프로그램을 시작합니다. 이 프로그램은 콘텐츠 제작 기술과 전략을 교육하여 새로운 관광 콘텐츠 크리에이터를 발굴하고 지원합니다.",
                "30.pdf", "30.png", "2024-12-10T14:00:00"));

        ma.add(create("광주관광기업지원센터, 관광 분야 취업 박람회 개최",
                "광주관광기업지원센터는 관광 분야 취업 박람회를 개최합니다. 이 박람회는 관광 산업에 관심 있는 구직자들과 기업들을 연결하는 장을 제공하며, 다양한 취업 기회를 제공합니다.",
                "31.pdf", "31.png", "2024-12-15T16:00:00"));

        ma.add(create("광주관광기업지원센터, 지역 관광 산업 혁신 포럼",
                "광주관광기업지원센터는 지역 관광 산업의 혁신을 주제로 한 포럼을 개최합니다. 이번 포럼에서는 혁신적인 아이디어와 기술을 활용한 관광 산업 발전 방안을 논의합니다.",
                "32.pdf", "32.png", "2024-12-20T09:00:00"));

        ma.add(create("광주관광기업지원센터, 관광 스타트업 네트워킹 행사",
                "광주관광기업지원센터는 관광 스타트업 네트워킹 행사를 개최합니다. 이 행사는 스타트업 간의 교류를 촉진하고, 협업 기회를 모색하는 자리를 제공합니다.",
                "33.pdf", "33.png", "2024-12-25T11:00:00"));

        ma.add(create("광주관광기업지원센터, 스마트 관광 기술 워크숍",
                "광주관광기업지원센터는 스마트 관광 기술 워크숍을 개최합니다. 이 워크숍에서는 최신 스마트 관광 기술과 이를 관광 산업에 적용하는 방법을 소개합니다.",
                "34.pdf", "34.png", "2024-12-30T13:00:00"));

        ma.add(create("광주관광기업지원센터, 지역 관광업체와의 협력 강화",
                "광주관광기업지원센터는 지역 관광업체들과의 협력을 강화하기 위한 회의를 개최합니다. 이 회의에서는 협력 방안과 공동 프로젝트에 대해 논의합니다.",
                "35.pdf", "35.png", "2025-01-05T15:00:00"));

        ma.add(create("광주관광기업지원센터, 관광 스타트업 경진대회",
                "광주관광기업지원센터는 관광 스타트업 경진대회를 개최합니다. 이 대회는 창의적이고 혁신적인 관광 아이디어를 발굴하고, 우수한 아이디어를 가진 팀들에게 상금과 지원을 제공합니다.",
                "36.pdf", "36.png", "2025-01-10T17:00:00"));

        ma.add(create("광주관광기업지원센터, 관광 인재 양성 프로그램",
                "광주관광기업지원센터는 관광 인재 양성 프로그램을 시작합니다. 이 프로그램은 관광 산업에 필요한 다양한 역량을 개발하고, 전문 인력을 양성하는 것을 목표로 합니다.",
                "37.pdf", "37.png", "2025-01-15T10:00:00"));

        ma.add(create("광주관광기업지원센터, 지역 관광 발전을 위한 연구 발표회",
                "광주관광기업지원센터는 지역 관광 발전을 위한 연구 발표회를 개최합니다. 이 발표회에서는 최신 연구 결과와 관광 산업 발전 방안을 공유합니다.",
                "38.pdf", "38.png", "2025-01-20T14:00:00"));

        ma.add(create("광주관광기업지원센터, 관광 기업가 정신 교육 세미나",
                "광주관광기업지원센터는 관광 기업가 정신을 주제로 한 교육 세미나를 개최합니다. 이 세미나에서는 성공적인 관광 사업 운영에 필요한 기업가 정신과 리더십에 대해 교육합니다.",
                "39.pdf", "39.png", "2025-01-25T16:00:00"));

        ma.add(create("광주관광기업지원센터, 광주 관광 자원 활용 방안 모색",
                "광주관광기업지원센터는 광주 관광 자원 활용 방안을 모색하는 포럼을 개최합니다. 이 포럼에서는 지역의 관광 자원을 효과적으로 활용하여 관광 산업을 발전시키는 방안을 논의합니다.",
                "40.pdf", "40.png", "2025-01-30T09:00:00"));

        ma.add(create("광주관광기업지원센터, 관광 산업의 미래를 위한 전략 세미나",
                "광주관광기업지원센터는 관광 산업의 미래를 주제로 한 전략 세미나를 개최합니다. 이 세미나에서는 미래의 관광 산업 트렌드와 이에 대응하는 전략을 소개합니다.",
                "41.pdf", "41.png", "2025-02-05T11:00:00"));

        Optional<Member> member = memberRepository.findById("admin");
        List<CenterNews> centerNew1 = new ArrayList<>();
        for(Map<String, String> map: ma) {
            CenterNews centerNews = new CenterNews();
            centerNews.setTitle(map.get("제목"));
            centerNews.setView(0);
            LocalDateTime time = LocalDateTime.parse(map.get("날짜"));
            centerNews.setMember(member.get());
            centerNews.setContent(map.get("내용"));
            centerNews.setFileUrl(map.get("파일"));
            centerNews.setImage(map.get("이미지"));
            centerNew1.add(centerNews);
        }
        centerNewsRepository.saveAll(centerNew1);
    }
}
