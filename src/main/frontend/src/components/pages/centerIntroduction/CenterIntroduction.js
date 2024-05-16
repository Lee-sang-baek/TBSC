import React from 'react';
import './CenterIntroduction.css';

function CenterIntroduction() {
    return (
        <div className="CenterIntroduction-compo">
            <div className="headerCenter">
            <h2>센터소개</h2>
            </div>
            <div className="container my-5">
                <div className="contentContainer">
                    <div className="center-intro-container">
                        <div className="center-intro-txt">
                            <img src="./img/CenterIntroduction/center_intro_03.jpg" alt="맨위 화면" className="img-fluid"/>
                            <h5>광주관광기업지원센터는 현장 밀착 산업인 관광이 <br/>지역 특성에 맞는 자생구조를 확립 할 수 있도록 지원하고자 구축되었습니다.</h5>
                            <p>광주광역시만의 특화 관광사업 아이디어 및 콘텐츠를 보유한 관광스타트업을 발굴하고 지역관광 전문인력 및 관광기업 육성을 통하여 지역 관광산업의 활성화를
                                도모하겠습니다.</p>
                            <p><b>지역 관광기업 및 센터 입주기업 대상 체계적 지원을 통해 건강하고 자생력 있는 관광산업 생태계를 조성</b>하고, 광주형 관광 일자리 창출과 전통적
                                관광기업 교육 및 활성화에 기여하여 광주 관광기업의 든든한 지원군이자 창업·성장 허브가 되도록 노력하겠습니다.</p>
                        </div>
                    </div>
                    <div className="center-intro-container">
                        <div className="text-center mt-5">
                            <img src="./img/CenterIntroduction/center_intro_03.png"
                                 alt="관광 스타트업 발굴, 지역 관광산업 활성화, 광주형 관광 분야 일자리 창출" className="img-fluid"/>
                        </div>
                        <div className="text-center mt-3">
                            <img src="./img/CenterIntroduction/center_vision_top.png" alt="vision 빛고을 스마트 관광산업 메가시티 구축"
                                 className="img-fluid"/>
                            <img src="./img/CenterIntroduction/center_vision_btm.png"
                                 alt="1 스마트 관광벤처 육성 기반구축 2 광주형 특화 관광기업 육성 3 스마트 관광벤처 육성 기반구축" className="img-fluid"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CenterIntroduction;
