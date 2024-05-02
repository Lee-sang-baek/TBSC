import React, { useState } from "react";
import "./Header.css";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const menus = [
        { main: "광주관광기업지원센터", subs: ["센터소개", "창업 및 성장지원", "기업 소개", "이용예약 안내"] },
        { main: "지원/운영사업", subs: ["공지사항", "시설안내", "교육 및 컨설팅"] },
        { main: "입주기업홍보관", subs: ["기업 홍보", "기업 컨설팅 신청"] },
        { main: "센터 이용예약", subs: ["이용안내", "조직도", "관광일자리 지원",""] },
        { main: "알림마당", subs: ["일자리 상담신청", "보도자료", "오시는길","","","회의실 대관신청"] }
    ];

    return (
        <div className="navbar" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            <div className="navbar-header">
                <div className="logo">Logo</div>
                <div className="menu-container">
                    {menus.map((menu, index) => (
                        <div className="nav-item" key={index}>{menu.main}</div>
                    ))}
                </div>
                <div className="login">Login</div>
            </div>
            {isOpen && (
                <div className="dropdown">
                    {menus.map((menu, idx) => (
                        menu.subs.map(sub => (
                            <div className="dropdown-item" key={sub}>{sub}</div>
                        ))
                    ))}
                </div>
            )}
        </div>
    );
};

export default Header;
