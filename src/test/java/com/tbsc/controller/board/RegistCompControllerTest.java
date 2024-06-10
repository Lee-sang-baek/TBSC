package com.tbsc.controller.board;

import com.tbsc.member.Member;
import com.tbsc.member.MemberRepository;
import com.tbsc.registComp.RegistComp;
import com.tbsc.registComp.RegistCompRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.*;

@SpringBootTest
public class RegistCompControllerTest {

    @Autowired
    RegistCompRepository registCompRepository;

    @Autowired
    MemberRepository memberRepository;

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

        ma.add(create("차놀자 모빌리티",
                "기업 G는 혁신적인 암 치료법을 개발합니다.",
                "68.png", "2024-01-07T16:00:00"));
        ma.add(create("기업 H 소개",
                "기업 H는 친환경 제품 라인을 출시했습니다.",
                "69.png", "2024-01-08T17:00:00"));
        ma.add(create("기업 I 소개",
                "기업 I는 맞춤형 여행 패키지 플랫폼을 운영합니다.",
                "70.png", "2024-01-09T18:00:00"));
        ma.add(create("기업 J 소개",
                "기업 J는 재생 가능 에너지 솔루션을 제공합니다.",
                "71.png", "2024-01-10T19:00:00"));
        ma.add(create("기업 K 소개",
                "기업 K는 최신 건강 관리 기술을 도입합니다.",
                "72.png", "2024-01-11T20:00:00"));
        ma.add(create("헬스케어 플러스",
                "헬스케어 플러스는 최신 건강 관리 기술을 도입하여 사용자들에게 더욱 효과적인 건강 관리 솔루션을 제공합니다. 이 기술은 개인 건강 데이터를 기반으로 맞춤형 관리 서비스를 제공합니다.",
                "73.png", "2024-01-12T10:00:00"));
        ma.add(create("퓨처 테크",
                "퓨처 테크는 차세대 스마트 기기를 공개했습니다. 이 기기는 혁신적인 기능과 디자인을 갖추고 있으며, 사용자 경험을 극대화할 것입니다.",
                "74.png", "2024-01-13T11:00:00"));
        ma.add(create("에코 테크",
                "에코 테크는 환경 친화적인 기술을 개발하여 지속 가능한 미래를 만들어가고 있습니다. 이 기술은 자원 절약과 환경 보호에 기여합니다.",
                "75.png", "2024-01-14T12:00:00"));
        ma.add(create("스마트 트래블",
                "스마트 트래블은 혁신적인 여행 서비스를 출시하여 여행객들에게 새로운 경험을 제공합니다. 이 서비스는 여행 계획, 예약, 현지 가이드까지 모든 것을 포함합니다..",
                "76.png", "2024-01-15T13:00:00"));
        ma.add(create("테크 솔루션즈",
                "테크 솔루션즈는 AI 기반의 비즈니스 솔루션을 제공하여 기업들이 더욱 효율적으로 운영할 수 있도록 지원합니다. 이 솔루션은 데이터 분석과 자동화를 통해 업무 효율을 높입니다.",
                "77.png", "2024-01-16T14:00:00"));
        ma.add(create("모바일 마스터즈",
                "모바일 마스터즈는 최신 스마트폰을 공개했습니다. 이 스마트폰은 최신 기술과 혁신적인 기능을 갖추고 있어 사용자들에게 최고의 경험을 제공합니다.",
                "78.png", "2024-01-17T15:00:00"));
        ma.add(create("에듀케이션 인사이트",
                "에듀케이션 인사이트는 새로운 교육 프로그램을 출시하여 학생들에게 혁신적인 학습 경험을 제공합니다. 이 프로그램은 최신 교육 기술을 활용하여 학습 효과를 극대화합니다.",
                "79.png", "2024-01-18T16:00:00"));
        ma.add(create("헬스 인노베이션",
                "헬스 인노베이션은 건강 관리 앱을 출시하여 사용자들이 자신의 건강을 쉽게 관리할 수 있도록 지원합니다. 이 앱은 개인 맞춤형 건강 관리 계획을 제공합니다.",
                "80.png", "2024-01-19T17:00:00"));
        ma.add(create("에코 프렌즈",
                "에코 프렌즈는 환경 보호 캠페인을 시작하여 지속 가능한 생활을 촉진하고 있습니다. 이 캠페인은 환경 보호의 중요성을 알리고, 실질적인 행동을 촉구합니다.",
                "81.png", "2024-01-20T18:00:00"));
        ma.add(create("차놀자 모빌리티",
                "차놀자 모빌리티는 산업 자동화 솔루션을 발표하여 제조업체들이 생산성을 높이고 비용을 절감할 수 있도록 지원합니다. 이 솔루션은 최신 기술을 활용하여 자동화 프로세스를 최적화합니다.",
                "82.png", "2024-01-21T18:00:00"));

        List<Member> members = memberRepository.findAll();
        int i = 0;
        List<RegistComp> registCompList = new ArrayList<>();
        for (Map<String, String> map : ma) {
            RegistComp registComp = new RegistComp();
            registComp.setTitle(map.get("제목"));
            registComp.setCorpName(map.get("제목"));

            registComp.setView(0);
            LocalDateTime time = LocalDateTime.parse(map.get("날짜"));
            registComp.setDate(time);
            registComp.setMember(members.get(i));
            registComp.setContent(map.get("내용"));
            registComp.setCompImage(map.get("이미지"));
            registCompList.add(registComp);
            i++;
        }
        registCompRepository.saveAll(registCompList);
    }
}
