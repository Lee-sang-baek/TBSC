package com.tbsc.controller;

import com.tbsc.member.Member;
import com.tbsc.member.MemberRepository;
import com.tbsc.pressrelease.PressRelease;
import com.tbsc.pressrelease.PressReleaseRepository;
import com.tbsc.tnotice.TNotice;
import com.tbsc.tnotice.TNoticeRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.*;

@SpringBootTest
public class TNoticeServiceTest {

    @Autowired
    private TNoticeRepository tNoticeRepository;

    @Autowired
    private MemberRepository memberRepository;

    public Map<String, String> create(String title, String content, String image, String date) {
        Map<String, String> ma2 = new HashMap<>();
        ma2.put("제목", title);
        ma2.put("내용", content);
        ma2.put("이미지", image);
        ma2.put("날짜", date);
        return ma2;
    }

    @Test
    void test1() {
        List<Map<String, String>> ma = new ArrayList<>();

        ma.add(create("테크 이노베이터스, AI 기술 혁신 발표",
                "테크 이노베이터스는 AI 기술의 최신 혁신을 발표하여 업계를 혁신할 준비를 마쳤습니다. 이번 혁신은 AI 기술의 새로운 가능성을 열어줄 것입니다.",
                "62.png", "2024-11-01T10:00:00"));

        ma.add(create("그린 에너지 솔루션, 지속 가능한 에너지 제품 출시",
                "그린 에너지 솔루션은 탄소 발자국을 줄이기 위한 새로운 지속 가능한 에너지 제품 라인을 출시했습니다. 이 제품들은 환경 보호에 기여할 것입니다.",
                "63.png", "2024-11-05T10:00:00"));

        ma.add(create("헬스플러스, 맞춤형 건강 추천 앱 출시",
                "헬스플러스는 사용자 데이터를 기반으로 맞춤형 건강 추천을 제공하는 새로운 앱을 출시했습니다. 이 앱은 개인 맞춤형 건강 관리에 도움을 줄 것입니다.",
                "64.png", "2024-11-10T10:00:00"));

        ma.add(create("핀테크 벤처스, 시리즈 B 자금 확보",
                "핀테크 벤처스는 금융 서비스 플랫폼 확장을 위해 시리즈 B에서 5천만 달러를 확보했습니다. 이번 자금은 플랫폼의 기능 확장과 서비스 개선에 사용될 예정입니다.",
                "65.png", "2024-11-15T10:00:00"));

        ma.add(create("스마트 홈 인코퍼레이티드, 새로운 스마트 홈 기기 발표",
                "스마트 홈 인코퍼레이티드는 가정의 편리함을 높이는 새로운 스마트 홈 기기들을 발표했습니다. 이 기기들은 스마트 기술을 통해 집안의 모든 것을 자동화합니다.",
                "66.png", "2024-11-20T10:00:00"));

        ma.add(create("에듀테크 솔루션, AI 기반 온라인 교육 플랫폼 출시",
                "에듀테크 솔루션은 온라인 교육 플랫폼에 혁신적인 AI 기술을 도입하여 학습 경험을 향상시켰습니다. 이 플랫폼은 학생들에게 맞춤형 학습을 제공합니다.",
                "67.png", "2024-11-25T10:00:00"));

        ma.add(create("바이오헬스코, 혁신적인 암 치료법 개발",
                "바이오헬스코는 암 치료에 새로운 가능성을 열어줄 혁신적인 치료법을 개발했습니다. 이 치료법은 기존 치료법보다 효과적이며 부작용이 적습니다.",
                "68.png", "2024-11-30T10:00:00"));

        ma.add(create("에코라이프, 친환경 제품 라인 출시",
                "에코라이프는 지속 가능한 생활을 촉진하는 새로운 친환경 제품 라인을 출시했습니다. 이 제품들은 환경 보호와 지속 가능성을 강조합니다.",
                "69.png", "2024-12-05T10:00:00"));

        ma.add(create("트래블 익스피리언스, 맞춤형 여행 패키지 플랫폼 출시",
                "트래블 익스피리언스는 맞춤형 여행 패키지를 제공하는 새로운 플랫폼을 소개했습니다. 이 플랫폼은 사용자의 여행 취향에 맞춘 개인화된 여행 계획을 제공합니다.",
                "70.png", "2024-12-10T10:00:00"));

        ma.add(create("클린 에너지 인코퍼레이티드, 재생 가능 에너지 솔루션 발표",
                "클린 에너지 인코퍼레이티드는 재생 가능 에너지 솔루션을 통해 환경을 보호하는 데 앞장서고 있습니다. 이 솔루션은 친환경 에너지 생산을 목표로 합니다.",
                "71.png", "2024-12-15T10:00:00"));

        ma.add(create("헬스케어 플러스, 최신 건강 관리 기술 도입",
                "헬스케어 플러스는 최신 건강 관리 기술을 도입하여 사용자들에게 더욱 효과적인 건강 관리 솔루션을 제공합니다. 이 기술은 개인 건강 데이터를 기반으로 맞춤형 관리 서비스를 제공합니다.",
                "72.png", "2024-12-20T10:00:00"));

        ma.add(create("퓨처 테크, 차세대 스마트 기기 공개",
                "퓨처 테크는 차세대 스마트 기기를 공개했습니다. 이 기기는 혁신적인 기능과 디자인을 갖추고 있으며, 사용자 경험을 극대화할 것입니다.",
                "73.png", "2024-12-25T10:00:00"));

        ma.add(create("에코 테크, 환경 친화적인 기술 개발",
                "에코 테크는 환경 친화적인 기술을 개발하여 지속 가능한 미래를 만들어가고 있습니다. 이 기술은 자원 절약과 환경 보호에 기여합니다.",
                "74.png", "2024-12-30T10:00:00"));

        ma.add(create("스마트 트래블, 혁신적인 여행 서비스 출시",
                "스마트 트래블은 혁신적인 여행 서비스를 출시하여 여행객들에게 새로운 경험을 제공합니다. 이 서비스는 여행 계획, 예약, 현지 가이드까지 모든 것을 포함합니다.",
                "75.png", "2025-01-05T10:00:00"));

        ma.add(create("테크 솔루션즈, AI 기반 비즈니스 솔루션 제공",
                "테크 솔루션즈는 AI 기반의 비즈니스 솔루션을 제공하여 기업들이 더욱 효율적으로 운영할 수 있도록 지원합니다. 이 솔루션은 데이터 분석과 자동화를 통해 업무 효율을 높입니다.",
                "76.png", "2025-01-10T10:00:00"));

        ma.add(create("모바일 마스터즈, 최신 스마트폰 공개",
                "모바일 마스터즈는 최신 스마트폰을 공개했습니다. 이 스마트폰은 최신 기술과 혁신적인 기능을 갖추고 있어 사용자들에게 최고의 경험을 제공합니다.",
                "77.png", "2025-01-15T10:00:00"));

        ma.add(create("에듀케이션 인사이트, 새로운 교육 프로그램 출시",
                "에듀케이션 인사이트는 새로운 교육 프로그램을 출시하여 학생들에게 혁신적인 학습 경험을 제공합니다. 이 프로그램은 최신 교육 기술을 활용하여 학습 효과를 극대화합니다.",
                "78.png", "2025-01-20T10:00:00"));

        ma.add(create("헬스 인노베이션, 건강 관리 앱 출시",
                "헬스 인노베이션은 건강 관리 앱을 출시하여 사용자들이 자신의 건강을 쉽게 관리할 수 있도록 지원합니다. 이 앱은 개인 맞춤형 건강 관리 계획을 제공합니다.",
                "79.png", "2025-01-25T10:00:00"));

        ma.add(create("에코 프렌즈, 환경 보호 캠페인 시작",
                "에코 프렌즈는 환경 보호 캠페인을 시작하여 지속 가능한 생활을 촉진하고 있습니다. 이 캠페인은 환경 보호의 중요성을 알리고, 실질적인 행동을 촉구합니다.",
                "80.png", "2025-01-30T10:00:00"));

        ma.add(create("스마트 인더스트리, 산업 자동화 솔루션 발표",
                "스마트 인더스트리는 산업 자동화 솔루션을 발표하여 제조업체들이 생산성을 높이고 비용을 절감할 수 있도록 지원합니다. 이 솔루션은 최신 기술을 활용하여 자동화 프로세스를 최적화합니다.",
                "81.png", "2025-02-05T10:00:00"));

        Optional<Member> member = memberRepository.findById("admin");
        List<TNotice> tNotices = new ArrayList<>();
        for (Map<String, String> map : ma) {
            TNotice tNotice = new TNotice();
            tNotice.setTitle(map.get("제목"));
            tNotice.setView(0);
            LocalDateTime time = LocalDateTime.parse(map.get("날짜"));
            tNotice.setMember(member.get());
            tNotice.setContent(map.get("내용"));
            tNotice.setImage(map.get("이미지"));
            tNotices .add(tNotice);
        }
        tNoticeRepository.saveAll(tNotices);
    }
}
