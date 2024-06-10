package com.tbsc.controller.board;

import com.tbsc.member.Member;
import com.tbsc.member.MemberRepository;
import com.tbsc.notice.Notice;
import com.tbsc.reservation.Reservation;
import com.tbsc.reservation.ReservationRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.*;

@SpringBootTest
public class ReservationControllerTest {

    @Autowired
    private ReservationRepository reservationRepository;

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
        ma.add(create("회의실 예약 안내",
                "회의실 예약이 가능합니다. 사용을 원하시는 분들은 사전에 예약 부탁드립니다.",
                "82.pdf", "82.png", "2024-01-01T10:00:00"));
        ma.add(create("세미나실 이용 안내",
                "세미나실 이용 안내입니다. 세미나실 예약은 온라인으로 가능합니다.",
                "83.pdf", "83.png", "2024-01-02T11:00:00"));
        ma.add(create("연구실 예약 공지",
                "연구실 예약이 필요하신 분들은 예약 시스템을 통해 신청해주시기 바랍니다.",
                "84.pdf", "84.png", "2024-01-03T12:00:00"));
        ma.add(create("스튜디오 사용 안내",
                "스튜디오 사용을 원하시는 분들은 예약 후 이용해주시기 바랍니다.",
                "85.pdf", "85.png", "2024-01-04T13:00:00"));
        ma.add(create("회의실 예약 공지",
                "회의실 예약 안내입니다. 온라인으로 예약해주시기 바랍니다.",
                "86.pdf", "86.png", "2024-01-05T14:00:00"));
        ma.add(create("교육실 이용 안내",
                "교육실 예약은 선착순으로 진행되며, 예약 후 사용 가능합니다.",
                "87.pdf", "87.png", "2024-01-06T15:00:00"));
        ma.add(create("회의실 예약 시스템 안내",
                "회의실 예약 시스템 안내입니다. 온라인으로 예약해주시기 바랍니다.",
                "88.pdf", "88.png", "2024-01-07T16:00:00"));
        ma.add(create("스튜디오 예약 공지",
                "스튜디오 예약 공지입니다. 사용을 원하시는 분들은 사전 예약 부탁드립니다.",
                "89.pdf", "89.png", "2024-01-08T17:00:00"));
        ma.add(create("회의실 이용 예약 안내",
                "회의실 이용 예약 안내입니다. 온라인으로 예약해주시기 바랍니다.",
                "90.pdf", "90.png", "2024-01-09T18:00:00"));
        ma.add(create("세미나실 예약 공지",
                "세미나실 예약 공지입니다. 예약 후 사용 가능합니다.",
                "91.pdf", "91.png", "2024-01-10T19:00:00"));
        ma.add(create("교육실 예약 안내",
                "교육실 예약 안내입니다. 온라인으로 예약해주시기 바랍니다.",
                "92.pdf", "92.png", "2024-01-11T20:00:00"));
        ma.add(create("연구실 사용 예약 공지",
                "연구실 사용 예약 안내입니다. 사전 예약 후 사용해주시기 바랍니다.",
                "93.pdf", "93.png", "2024-01-12T10:00:00"));
        ma.add(create("회의실 예약 안내",
                "회의실 예약이 가능합니다. 사용을 원하시는 분들은 사전에 예약 부탁드립니다.",
                "94.pdf", "94.png", "2024-01-13T11:00:00"));
        ma.add(create("스튜디오 이용 안내",
                "스튜디오 이용을 원하시는 분들은 예약 후 사용 가능합니다.",
                "95.pdf", "95.png", "2024-01-14T12:00:00"));
        ma.add(create("세미나실 예약 공지",
                "세미나실 예약 공지입니다. 예약 후 사용 가능합니다.",
                "96.pdf", "96.png", "2024-01-15T13:00:00"));
        ma.add(create("회의실 사용 예약 안내",
                "회의실 사용 예약 안내입니다. 온라인으로 예약해주시기 바랍니다.",
                "97.pdf", "97.png", "2024-01-16T14:00:00"));
        ma.add(create("교육실 예약 시스템 안내",
                "교육실 예약 시스템 안내입니다. 사전 예약 후 사용 가능합니다.",
                "98.pdf", "98.png", "2024-01-17T15:00:00"));
        ma.add(create("스튜디오 예약 안내",
                "스튜디오 예약 안내입니다. 사용을 원하시는 분들은 사전에 예약 부탁드립니다.",
                "99.pdf", "99.png", "2024-01-18T16:00:00"));
        ma.add(create("연구실 예약 공지",
                "연구실 예약 안내입니다. 온라인으로 예약해주시기 바랍니다.",
                "100.pdf", "100.png", "2024-01-19T17:00:00"));
        ma.add(create("회의실 예약 시스템 안내",
                "회의실 예약 시스템 안내입니다. 사전 예약 후 사용 가능합니다.",
                "101.pdf", "101.png", "2024-01-20T18:00:00"));

        Optional<Member> member = memberRepository.findById("admin");
        List<Reservation> reservationList = new ArrayList<>();
        for(Map<String, String> map: ma) {
            Reservation reservation = new Reservation();
            reservation.setTitle(map.get("제목"));
            reservation.setView(0);
            LocalDateTime time = LocalDateTime.parse(map.get("날짜"));
            reservation.setDate(time);
            reservation.setMember(member.get());
            reservation.setContent(map.get("내용"));
            reservation.setFileUrl(map.get("파일"));
            reservation.setImage(map.get("이미지"));
            reservationList.add(reservation);
        }
        reservationRepository.saveAll(reservationList);
    }
}
