import React, { useEffect, useState } from 'react';
import './Sidebar.css'; // 스타일 파일
import SideBanner from '../sideBanner/SideBanner';
import { Link } from 'react-router-dom';

const Sidebar = ({ type, memberState }) => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {

    // 타입에 따라 메뉴 항목 설정
    if (type === 'mypage' && (memberState === "COMP" || memberState === "ADMIN")) {
      setMenuItems([
        {
          type: 'main',
          items: [
            { label: '마이페이지', link: '/mypage' }
          ]
        },
        {
          type: 'list',
          items: [
            { label: '개인 정보 수정', link: "/myPage/modify-info" },
            { label: '예약 내역', link: "/myPage/reserve" },
            { label: '등록 기업 정보', link: "/myPage/corp-info" },
            { label: '기업 정보 수정', link: "/myPage/modify-corp" },
          ]
        }
      ]);
    } else if (type === 'mypage' && memberState === "NORMAL") {
      setMenuItems([
        {
          type: 'main',
          items: [
            { label: '마이페이지', link: '/mypage' }
          ]
        },
        {
          type: 'list',
          items: [
            { label: '개인 정보 수정', link: "/myPage/modify-info" },
            { label: '예약 내역', link: "/myPage/reserve" },
          ]
        }
      ]);
    } else if (type === 'admin' && memberState === "ADMIN") {
      setMenuItems([
        {
          type: 'main',
          items: [
            { label: '관리자 페이지', link: '/admin/member-list' }
          ]
        },
        {
          type: 'list',
          items: [
            { label: '회원 목록', link: "/admin/member-list" },
            { label: '기업 회원 신청 관리', link: "/admin/member-management" },

            { label: '사이트 관리', link: "/admin/site-management" },
            { label: '예약 신청 확인', link: "/admin/reservation-confirmation" },
            { label: '접속 로그 확인', link: "/admin/access-log" },
          ]
        }
      ]);
    } else if (type === 'center') {
      setMenuItems([
        {
          type: 'main',
          items: [
            { label: '광주관광기업지원센터', link: '/centerIntro' }
          ]
        },
        {
          type: 'list',
          items: [
            { label: '센터소개', link: "/centerIntro" },
            { label: '시설안내', link: "/facility" },
            { label: '조직도', link: "/orgchart" },
            { label: '오시는 길', link: "/wayToCome" },
          ]
        }
      ]);
    } else if (type === 'programs') {
      setMenuItems([
        {
          type: 'main',
          items: [
            { label: '운영 프로그램', link: '/startup' }
          ]
        },
        {
          type: 'list',
          items: [
            { label: '창업 및 성장지원', link: "/startup" },
            { label: '교육 및 컨설팅', link: "/eduConsult" },
            { label: '관광일자리 지원', link: "/tourism" },
          ]
        }
      ]);
    } else if (type === 'comp') {
      setMenuItems([
        {
          type: 'main',
          items: [
            { label: '입주기업 홍보관', link: '/compIntroPage' }
          ]
        },
        {
          type: 'list',
          items: [
            { label: '기업 소개', link: "/compIntroPage" },
            { label: '기업 홍보', link: "/tnotice" },
          ]
        }
      ]);
    } else if (type === 'reserve') {
      setMenuItems([
        {
          type: 'main',
          items: [
            { label: '센터 이용예약', link: '/reservation' }
          ]
        },
        {
          type: 'list',
          items: [
            { label: '이용예약 안내', link: "/reservation" },
            { label: '기업 컨설팅 신청', link: "/reserve/consultants" },
            { label: '일자리 상담신청', link: "/reserve/jobConsult" },
            { label: '회의실 대관신청', link: "/reserve/rental" },
          ]
        }
      ]);
    } else if (type === 'notices') {
      setMenuItems([
        {
          type: 'main',
          items: [
            { label: '알림마당', link: '/notices' }
          ]
        },
        {
          type: 'list',
          items: [
            { label: '공지사항', link: "/notices" },
            { label: '센터소식', link: "/centernews" },
            { label: '보도자료', link: "/pressrelease" },
          ]
        }
      ]);
    } else {
      console.warn("Unhandled type value:", type);
    }
  }, [type, memberState]); // 의존성 배열에 type 포함

  return (
    <div className='side-box'>
    <div className="Sidebar-compo">
      {menuItems.map((menu, index) => (
        <div key={index} className={menu.type === 'main' ? 'main' : 'list'}>
            {menu.items.map((item, subIndex) => (
              <Link to={item.link} key={subIndex}>
                <div>
                  {item.label}
                </div>
              </Link>
            ))}
        </div>
      ))}
    </div>
    <SideBanner />
    </div>
    
  );
}

export default Sidebar;
