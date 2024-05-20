import React, { useEffect, useState } from 'react';
import './Sidebar.css'; // 스타일 파일

const Sidebar = ({ type }) => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    console.log("Type prop value:", type);

    if (!type) {
      console.error("Type prop is undefined or null");
      return;
    }

    // 타입에 따라 메뉴 항목 설정
    if (type === 'site1') {
      setMenuItems([
        {
          type: 'main',
          items: [
            { label: '구글', link: 'https://www.google.co.kr/?hl=ko' }
          ]
        },
        {
          type: 'list',
          items: [
            { label: '개인 정보 수정', link: "/myPage/modify-info" },
            { label: '예약 내역', link: "/myPage/reserve" },
            { label: '개인 정보 수정', link: "/myPage/modify-info" },
            { label: '예약 내역', link: "/myPage/reserve" }
          ]
        }
      ]);
    } else if (type === 'site2') {
      setMenuItems([
        {
          type: 'main',
          items: [
            { label: '사이트2 메인페이지', link: 'https://www.naver.com/' }
          ]
        },
        {
          type: 'list',
          items: [
            { label: '관리자페이지1', link: "/admin" },
            { label: '관리자페이지2', link: "/admin" }
          ]
        }
      ]);
    } else {
      console.warn("Unhandled type value:", type);
    }
  }, [type]); // 의존성 배열에 type 포함

  return (
    <div className="Sidebar-compo">
      {menuItems.map((menu, index) => (
        <div key={index} className={menu.type === 'main' ? 'main' : 'list'}>
          <ul>
            {menu.items.map((item, subIndex) => (
              <li key={subIndex}>
                <a href={item.link}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
