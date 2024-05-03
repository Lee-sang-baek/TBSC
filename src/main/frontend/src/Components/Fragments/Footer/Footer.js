import React, { useState } from 'react';
import './Footer.css';

function Footer() {
    const [showRelatedSites, setShowRelatedSites] = useState(false); // 상태 변수 추가

    // 관련 사이트 목록을 토글하는 함수
    const toggleRelatedSites = () => {
        setShowRelatedSites(!showRelatedSites);
    };

    return (
        <div className="blank">
            <footer className="Footer-compo">

                <div className="left-box">
                    <div className="ft-info">
                        <ul>
                            <li>61948 광주 서구 운천로 247 스타타워 4층(치평동, 스타타워)</li>
                            <li>Tel : 062-367-0641</li>
                            <li>Fax : 062-367-0649</li>
                        </ul>
                    </div>
                    <div id="ft_copy"> Copyright (c) 광주 관광기업지원센터. All Rights Reserved.</div>
                </div>
                <div className="right-box">
                    <div className="list">
                        <ul>
                            <li>
                                <a href="/index.do">홈</a>
                            </li>
                            <li>
                                <a href="/index.do">센터소개</a>
                            </li>
                            <li>
                                <a href="/index.do">이용약관</a>
                            </li>
                            <li>
                                <a href="/index.do">개인정보처리방침</a>
                            </li>
                        </ul>
                    </div>

                    <div className="related-sites">
                        <button onClick={toggleRelatedSites}>관련 사이트</button>
                        {showRelatedSites && ( /* 상태에 따라 목록을 보여줄지 결정 */
                            <ul className="dropdown-menu">
                                <li><a href="https://www.mcst.go.kr/">문화체육관광부</a></li>
                                <li><a href="https://kto.visitkorea.or.kr/">한국관광공사</a></li>
                                <li><a href="https://www.gwangju.go.kr/">광주광역시</a></li>
                                <li><a href="https://www.gjto.or.kr/">광주관광재단</a></li>
                                <li><a href="https://tour.gwangju.go.kr/">오매광주</a></li>
                                <li><a href="http://www.gjtravel.or.kr/">광주광역시관광협회</a></li>
                                <li><a href="https://academy.visitkorea.or.kr/">관광인</a></li>
                                <li><a href="https://www.tourbiz.or.kr/">관광기업지원센터</a></li>
                                <li><a href="http://busan.tourbiz.or.kr/">부산관광기업지원센터</a></li>
                                <li><a href="https://incheon.tourbiz.or.kr/">인천관광기업지원센터</a></li>
                                <li><a href="http://www.daejeonsejong.tourbiz.or.kr/">대전세종관광기업지원센터</a></li>
                                <li><a href="https://gyeongnam.tourbiz.or.kr/">경남관광기업지원센터</a></li>
                                <li><a href="https://gb.tourbiz.or.kr/">경북관광기업지원센터</a></li>
                            </ul>
                        )}
                    </div>
                </div>

            </footer>
        </div>
    );
}

export default Footer;
