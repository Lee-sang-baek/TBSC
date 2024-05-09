import React, { useState } from "react";
import "./Header.css";
import logoImage from "../../Imgs/logo.png";
import loginImage from "../../Imgs/login.png";
import { Link } from "react-router-dom";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [loginMenuOpen, setLoginMenuOpen] = useState(false);

    const menus = [
        {
            main: "광주관광기업지원센터",
            subs: [
                { title: "센터소개", link: "/CenterIntroduction" },
                { title: "시설안내", link: "/facility" },
                { title: "조직도", link: "" },
                { title: "오시는 길", link: "" }
            ]
        },
        {
            main: "운영 프로그램",
            subs: [
                { title: "창업 및 성장지원", link: "" },
                { title: "교육 및 컨설팅", link: "" },
                { title: "관광일자리 지원", link: "" }
            ]
        },
        {
            main: "입주기업 홍보관",
            subs: [
                { title: "기업 소개", link: "" },
                { title: "기업 홍보", link: "" }
            ]
        },
        {
            main: "센터 이용예약",
            subs: [
                { title: "이용예약 안내", link: "" },
                { title: "기업 컨설팅 신청", link: "/consultants" },
                { title: "일자리 상담신청", link: "" },
                { title: "회의실 대관신청", link: "/rental" }
            ]
        },
        {
            main: "알림마당",
            subs: [
                { title: "공지사항", link: "/notices" },
                { title: "센터소식", link: "" },
                { title: "보도자료", link: "" }
            ]
        }
    ];

    const logout = () => {
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("state");
        window.location.reload();
    };

    const handleGnbWrapEnter = () => {
        setIsOpen(true);
    };

    const handleGnbWrapLeave = () => {
        setIsOpen(false);
    };

    const toggleLoginMenu = (event) => {
        event.stopPropagation();
        setLoginMenuOpen(prev => !prev);
    };

    const isLoggedIn = !!sessionStorage.getItem("id");
    const MemberState = sessionStorage.getItem("state");

    return (
        <div className="Header-compo">
            <div id="gnb_wrap" onMouseEnter={handleGnbWrapEnter} onMouseLeave={handleGnbWrapLeave}>
                <div id="gnb_container">
                    <div className="logo-container">
                        <a href="/"> <img src={logoImage} alt="Logo" className="logo-img" /></a>
                    </div>
                    <ul id="gnb_1dul">
                        {menus.map((menu, index) => (
                            <li key={index} className="gnb_1dli">
                                <a href="#" className="gnb_1da">{menu.main}</a>
                            </li>
                        ))}
                    </ul>
                    <div className="login-container" onMouseEnter={toggleLoginMenu} onMouseLeave={toggleLoginMenu}>
                        <img src={loginImage} alt="Login" className="login-img" />
                        {loginMenuOpen && (
                            <div className="login-dropdown">
                                {!isLoggedIn ? (
                                    <>
                                        <Link to="/login">로그인</Link>
                                        <Link to="/signup">회원가입</Link>
                                    </>
                                ) : (
                                    <>
                                        <a href="#" onClick={logout}>로그아웃</a>
                                        <Link to="/myhome">마이페이지</Link>
                                        {MemberState === "ADMIN" && <Link to="/admin">관리자 페이지</Link>}
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                {isOpen && (
                    <div className="gnb_2dul_container">
                        <div id="gnb_2dul">
                            {menus.map((menu, index) => (
                                <div key={index} className="gnb_2dcol">
                                    <ul className="gnb_2dul">
                                        {menu.subs.map((sub, subIdx) => (
                                            <li key={subIdx} className="gnb_2dli">
                                                <a href={sub.link} className="gnb_2da">{sub.title}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
