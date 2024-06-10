package com.tbsc.controller.board;

import com.tbsc.member.Member;
import com.tbsc.member.MemberRepository;
import com.tbsc.pressrelease.PressRelease;
import com.tbsc.pressrelease.PressReleaseRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.*;

@SpringBootTest
public class PressReleaseControllerTest {

    @Autowired
    private PressReleaseRepository pressReleaseRepository;

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

        ma.add(create("광주관광기업지원센터, 관광스타트업 협력강화 행사 개최",
                "광주관광기업지원센터는 관광스타트업과 지역 관광업계의 협력을 강화하기 위해 '2024 관광 이음데이' 행사를 개최했습니다. 이번 행사에서는 관광스타트업의 성과를 발표하고, 지자체 및 관광업계 관계자들과의 네트워킹 기회를 제공했습니다.",
                "42.pdf", "42.png", "2024-11-01T10:00:00"));

        ma.add(create("광주관광기업지원센터, 관광 콘텐츠 공모전 성료",
                "광주관광기업지원센터가 주최한 '2024 관광 콘텐츠 공모전'이 성공적으로 마무리되었습니다. 이번 공모전에서는 창의적인 관광 콘텐츠를 발굴하고, 우수한 작품들을 시상하였습니다.",
                "43.pdf", "43.png", "2024-11-05T10:00:00"));

        ma.add(create("광주관광기업지원센터, 지역 관광 활성화를 위한 세미나 개최",
                "광주관광기업지원센터는 지역 관광 활성화를 위한 세미나를 개최했습니다. 이번 세미나에서는 관광 전문가들이 최신 트렌드와 성공 사례를 공유하며, 지역 관광 산업 발전 방안을 논의했습니다.",
                "44.pdf", "44.png", "2024-11-10T10:00:00"));

        ma.add(create("광주관광기업지원센터, 청년 창업 지원 프로그램 시작",
                "광주관광기업지원센터는 청년 창업자들을 위한 지원 프로그램을 시작했습니다. 이 프로그램은 창업 초기 단계의 청년들에게 멘토링, 재정 지원 및 네트워킹 기회를 제공하여 성공적인 창업을 돕습니다.",
                "45.pdf", "45.png", "2024-11-15T10:00:00"));

        ma.add(create("광주관광기업지원센터, 스마트 관광 기술 워크숍 개최",
                "광주관광기업지원센터는 스마트 관광 기술 워크숍을 개최했습니다. 이번 워크숍에서는 최신 스마트 관광 기술과 이를 관광 산업에 적용하는 방법을 소개했습니다.",
                "46.pdf", "46.png", "2024-11-20T10:00:00"));

        ma.add(create("광주관광기업지원센터, 지역 관광 자원 활용 방안 논의",
                "광주관광기업지원센터는 지역 관광 자원을 효과적으로 활용하기 위한 방안을 논의하는 포럼을 개최했습니다. 이번 포럼에서는 지역의 관광 자원을 활용한 다양한 성공 사례가 공유되었습니다.",
                "47.pdf", "47.png", "2024-11-25T10:00:00"));

        ma.add(create("광주관광기업지원센터, 관광 산업 혁신 포럼 개최",
                "광주관광기업지원센터는 관광 산업 혁신을 주제로 한 포럼을 개최했습니다. 이번 포럼에서는 혁신적인 아이디어와 기술을 활용한 관광 산업 발전 방안이 논의되었습니다.",
                "48.pdf", "48.png", "2024-11-30T10:00:00"));

        ma.add(create("광주관광기업지원센터, 관광 스타트업 네트워킹 행사 성료",
                "광주관광기업지원센터는 관광 스타트업 간의 교류를 촉진하기 위한 네트워킹 행사를 성공적으로 개최했습니다. 이 행사에서는 스타트업들이 서로의 아이디어를 공유하고, 협업 기회를 모색했습니다.",
                "49.pdf", "49.png", "2024-12-05T10:00:00"));

        ma.add(create("광주관광기업지원센터, 관광 분야 취업 박람회 개최",
                "광주관광기업지원센터는 관광 분야 취업 박람회를 개최했습니다. 이 박람회는 관광 산업에 관심 있는 구직자들과 기업들을 연결하는 장을 제공하며, 다양한 취업 기회를 제공했습니다.",
                "50.pdf", "50.png", "2024-12-10T10:00:00"));

        ma.add(create("광주관광기업지원센터, 디지털 마케팅 전략 세미나 개최",
                "광주관광기업지원센터는 관광 기업들을 위한 디지털 마케팅 전략 세미나를 개최했습니다. 이번 세미나에서는 최신 마케팅 트렌드와 효과적인 온라인 마케팅 기법이 소개되었습니다.",
                "51.pdf", "51.png", "2024-12-15T10:00:00"));

        ma.add(create("광주관광기업지원센터, 지역 관광업체와의 협력 강화 회의 개최",
                "광주관광기업지원센터는 지역 관광업체들과의 협력을 강화하기 위한 회의를 개최했습니다. 이번 회의에서는 협력 방안과 공동 프로젝트에 대해 논의했습니다.",
                "52.pdf", "52.png", "2024-12-20T10:00:00"));

        ma.add(create("광주관광기업지원센터, 관광 스타트업 투자 유치 설명회",
                "광주관광기업지원센터는 관광 스타트업을 위한 투자 유치 설명회를 개최했습니다. 이번 설명회에서는 투자 유치 전략과 성공 사례가 공유되었으며, 참가자들은 실질적인 조언을 받을 수 있었습니다.",
                "53.pdf", "53.png", "2024-12-25T10:00:00"));

        ma.add(create("광주관광기업지원센터, 관광 인재 양성 프로그램 시작",
                "광주관광기업지원센터는 관광 인재 양성 프로그램을 시작했습니다. 이 프로그램은 관광 산업에 필요한 다양한 역량을 개발하고, 전문 인력을 양성하는 것을 목표로 합니다.",
                "54.pdf", "54.png", "2024-12-30T10:00:00"));

        ma.add(create("광주관광기업지원센터, 관광 콘텐츠 크리에이터 양성 프로그램",
                "광주관광기업지원센터는 관광 콘텐츠 크리에이터 양성 프로그램을 시작했습니다. 이 프로그램은 콘텐츠 제작 기술과 전략을 교육하여 새로운 관광 콘텐츠 크리에이터를 발굴하고 지원합니다.",
                "55.pdf", "55.png", "2025-01-05T10:00:00"));

        ma.add(create("광주관광기업지원센터, 관광 스타트업 경진대회 개최",
                "광주관광기업지원센터는 관광 스타트업 경진대회를 개최했습니다. 이 대회는 창의적이고 혁신적인 관광 아이디어를 발굴하고, 우수한 아이디어를 가진 팀들에게 상금과 지원을 제공합니다.",
                "56.pdf", "56.png", "2025-01-10T10:00:00"));

        ma.add(create("광주관광기업지원센터, 관광 스타트업 데모데이 성료",
                "광주관광기업지원센터는 관광 스타트업 데모데이를 성공적으로 개최했습니다. 이 행사에서는 지역 관광 벤처 기업들이 자신의 제품과 서비스를 발표하고, 투자자들과 네트워킹할 수 있는 기회를 제공했습니다.",
                "57.pdf", "57.png", "2025-01-15T10:00:00"));

        ma.add(create("광주관광기업지원센터, 지역 관광 발전을 위한 연구 발표회",
                "광주관광기업지원센터는 지역 관광 발전을 위한 연구 발표회를 개최했습니다. 이번 발표회에서는 최신 연구 결과와 관광 산업 발전 방안이 공유되었습니다.",
                "58.pdf", "58.png", "2025-01-20T10:00:00"));

        ma.add(create("광주관광기업지원센터, 관광 기업가 정신 교육 세미나",
                "광주관광기업지원센터는 관광 기업가 정신을 주제로 한 교육 세미나를 개최했습니다. 이 세미나에서는 성공적인 관광 사업 운영에 필요한 기업가 정신과 리더십에 대해 교육했습니다.",
                "59.pdf", "59.png", "2025-01-25T10:00:00"));

        ma.add(create("광주관광기업지원센터, 관광 산업의 미래를 위한 전략 세미나",
                "광주관광기업지원센터는 관광 산업의 미래를 주제로 한 전략 세미나를 개최했습니다. 이 세미나에서는 미래의 관광 산업 트렌드와 이에 대응하는 전략이 소개되었습니다.",
                "60.pdf", "60.png", "2025-01-30T10:00:00"));

        ma.add(create("광주관광기업지원센터, 관광 스타트업 교류 행사 개최",
                "광주관광기업지원센터는 관광 스타트업 간의 교류를 촉진하기 위한 행사를 개최했습니다. 이 행사에서는 스타트업들이 서로의 아이디어를 공유하고, 협업 기회를 모색했습니다.",
                "61.pdf", "61.png", "2025-02-05T10:00:00"));

        Optional<Member> member = memberRepository.findById("admin");
        List<PressRelease> pressReleaseList = new ArrayList<>();
        for (Map<String, String> map : ma) {
            PressRelease pressRelease = new PressRelease();
            pressRelease.setTitle(map.get("제목"));
            pressRelease.setView(0);
            LocalDateTime time = LocalDateTime.parse(map.get("날짜"));
            pressRelease.setMember(member.get());
            pressRelease.setContent(map.get("내용"));
            pressRelease.setFileUrl(map.get("파일"));
            pressRelease.setImage(map.get("이미지"));
            pressReleaseList.add(pressRelease);
        }
        pressReleaseRepository.saveAll(pressReleaseList);
    }
}
