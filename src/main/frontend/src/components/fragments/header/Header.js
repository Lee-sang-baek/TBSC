import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Header.css";
import logoImage from "../../imgs/logo.png";
import loginImage from "../../imgs/login.png";
import searchImage from "../../imgs/search.png";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Header = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [loginMenuOpen, setLoginMenuOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [warningMessage, setWarningMessage] = useState('');
    const navigate = useNavigate();

    const menus = [
        {
            main: "광주관광기업지원센터",
            subs: [
                { title: "센터소개", link: "/centerIntro" },
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
                { title: "기업 홍보", link: "/tnotice" }
            ]
        },
        {
            main: "센터 이용예약",
            subs: [
                { title: "이용예약 안내", link: "/reservation" },
                { title: "기업 컨설팅 신청", link: "/consultants" },
                { title: "일자리 상담신청", link: "/jobConsult" },
                { title: "회의실 대관신청", link: "/rental" }
            ]
        },
        {
            main: "알림마당",
            subs: [
                { title: "공지사항", link: "/notices" },
                { title: "센터소식", link: "/centernews" },
                { title: "보도자료", link: "/pressrelease" }
            ]
        }
    ];

    const logout = () => {
        axios.get("/logout")
            .then(response => {
                console.log(response.data);
            });
        alert("로그아웃 되었습니다.")
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("state");
        window.location.reload();
    }

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

    const toggleMobileMenu = () => {
        setMobileMenuOpen(prev => !prev);
    };

    const toggleSearch = (event) => {
        event.stopPropagation();
        setSearchOpen(prev => !prev);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        if (e.target.value.length >= 2) {
            setWarningMessage('');
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.length < 2) {
            alert('검색은 두 글자 이상부터 할 수 있습니다.')
            return;
        }
        navigate(`/search-results?title=${searchQuery}`);
    };

    const handleSearchContainerClick = (event) => {
        event.stopPropagation();
    };

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    const isLoggedIn = !!sessionStorage.getItem("id");
    const MemberState = sessionStorage.getItem("state");

    return (
        <div className="Header-compo" onClick={() => setSearchOpen(false)}>
            <div id="gnb_wrap">
                <div id="gnb_container">
                    <div className="logo-container">
                        <a href="/"> <img src={logoImage} alt="Logo" className="logo-img"/></a>
                    </div>
                    <div className="gnb_1dul" onMouseEnter={handleGnbWrapEnter}>
                        {menus.map((menu, index) => (
                            <div key={index} className="gnb_1dli">
                                <a href="#" className="gnb_1da">{menu.main}</a>
                            </div>
                        ))}
                    </div>
                    <div className="search-icon" onClick={toggleSearch}>
                        <img src={searchImage} alt="search" className="searchImage"/>
                        {searchOpen && (
                            <div className="search-dropdown" onClick={handleSearchContainerClick}>
                                <form onSubmit={handleSearchSubmit}>
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                        placeholder="검색어를 입력하세요"
                                    />
                                    <button type="submit">검색</button>
                                    {warningMessage && <p className="warning-message">{warningMessage}</p>}
                                </form>
                            </div>
                        )}
                    </div>
                    <div className="login-container" onMouseEnter={toggleLoginMenu} onMouseLeave={toggleLoginMenu}>
                        <img src={loginImage} alt="Login" className="login-img"/>
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
                                        <Link to="/myPage">마이페이지</Link>
                                        {MemberState === "ADMIN" && <Link to="/admin">관리자 페이지</Link>}
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="hamburger-menu" onClick={toggleMobileMenu}>
                        &#9776; {/* 햄버거 아이콘 */}
                    </div>
                </div>
                {isOpen && (
                    <div className="gnb_2dul_container" onMouseLeave={handleGnbWrapLeave}>
                        <div id="gnb_2dul">
                            {menus.map((menu, index) => (
                                <div key={index} className="gnb_2dcol">
                                    <div className="gnb_2dul">
                                        {menu.subs.map((sub, subIdx) => (
                                            <div key={subIdx} className="gnb_2dli">
                                                <a href={sub.link} className="gnb_2da">{sub.title}</a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            {mobileMenuOpen && (
                <div className="mobile-menu">
                    <ul className="mobile-menu-list">
                        {menus.map((menu, index) => (
                            <li key={index} className="mobile-menu-item">
                                <span className="mobile-menu-main">{menu.main}</span>
                                <ul className="mobile-sub-menu">
                                    {menu.subs.map((sub, subIdx) => (
                                        <li key={subIdx} className="mobile-sub-menu-item">
                                            <Link to={sub.link}>{sub.title}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Header;
