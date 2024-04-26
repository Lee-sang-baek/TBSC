import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logoImage from '../Imgs/logo.png';
import loginImage from '../Imgs/login.png';

const Header = () => {
    const [showSubmenu, setShowSubmenu] = useState(false);

    const categories = [
        {
            title: '광주 관광사업 지원센터',
            submenus: [
                { name: '센터 소개', path: '/about' },
                { name: '시설 안내', path: '/facilities' },
                { name: '조직도', path: '/organization' },
                { name: '오시는 길', path: '/directions' }
            ]
        },
        {
            title: '지원/운영 사업',
            submenus: [
                { name: '창업 및 성장 지원', path: '/startup-support' },
                { name: '교육 및 컨설팅', path: '/education-consulting' },
                { name: '관광 일자리 지원', path: '/tourism-jobs-support' }
            ]
        },
        {
            title: '기업 홍보관',
            submenus: [
                { name: '기업 소개', path: '/company-introduction' },
                { name: '기업 홍보', path: '/company-promotion' }
            ]
        },
        {
            title: '센터 시설 예약',
            submenus: [
                { name: '예약 정보', path: '/reservation-info' },
                { name: '기업 상담 신청', path: '/consulting-application' },
                { name: '취업 상담 신청', path: '/job-consulting-application' },
                { name: '회의실 신청', path: '/meeting-room-application' }
            ]
        },
        {
            title: '공지 사항',
            submenus: [
                { name: '공지사항', path: '/notices' },
                { name: '센터 뉴스', path: '/news' },
                { name: '보도자료', path: '/press-releases' }
            ]
        },
    ];

    const handleMouseEnter = () => {
        setShowSubmenu(true);
    };

    const handleMouseLeave = () => {
        setShowSubmenu(false);
    };

    return (
        <header>
            <div className="logo-container">
                <img src={logoImage} alt="Logo" className="logo"/>
                <img src={loginImage} alt="Login" className="login"/>
            </div>

            <ul className="menu">
            {categories.map((category, index) => (
                    <li key={index} className="menu-item" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <Link to="/" className="menu-link">{category.title}</Link>
                        <ul className={`submenu ${showSubmenu ? 'show' : ''}`}>
                            {showSubmenu && category.submenus.map((submenu, subIndex) => (
                                <li key={subIndex} className="submenu-item">
                                    <Link to={submenu.path} className="submenu-link">{submenu.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
            <div className="login-container">

            </div>
        </header>
    );
};

export default Header;
