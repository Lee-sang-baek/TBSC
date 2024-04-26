import React, { useState } from 'react';
import './Header.css'; // CSS 파일 경로에 맞게 수정해주세요.

const Header = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const categories = [
        { title: '광주관광기업지원센터', submenus: ['센터 소개', '시설안내', '조직도', '오시는길'] },
        { title: '지원/운영사업', submenus: ['창업 및 성장지원', '교육 및 컨설팅', '관광일자리 지원'] },
        { title: '입주기업홍보관', submenus: ['기업 소개', '기업 홍보'] },
        { title: '센터 이용예약', submenus: ['이용예약 안내', '기업 컨설팅 신청', '일자리 상담신청', '회의실 대관 신청'] },
        { title: '알림마당', submenus: ['공지사항', '센터소식', '보도자료'] },
    ];

    return (
        <nav className="navbar">
            <div className="nav-categories-container" onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
                <ul className="nav-categories">
                    {categories.map((category, index) => (
                        <li key={index}>{category.title}</li>
                    ))}
                </ul>
                {showDropdown && <div className="dropdown-content">
                    {/* title을 제거하고 submenus만 표시 */}
                    {categories.map((category, index) => (
                        <div key={index} className="dropdown-section">
                            <div className="submenu-list">
                                {category.submenus.map((submenu, i) => (
                                    <div key={i}>{submenu}</div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>}
            </div>
        </nav>
    );
};

export default Header;
