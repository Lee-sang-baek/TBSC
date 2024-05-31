import React, { useState } from 'react';
import './Startup.css'; // CSS 파일 import

function Startup() {
    // 상태 변수를 사용하여 제목과 컨테이너 내용을 관리합니다.
    const [title, setTitle] = useState("스타트업 공모전");
    const [containerContent, setContainerContent] = useState("혁신적 지역 관광콘텍츠 발굴 및 사업화 유도");
    const [firtitle, setFirtitle] = useState("모집분야");
    const [fircontent, setFircontent] = useState("지역상생 전통 관광기업, 지역혁신 관광벤처·스타트업, ICT 기반 융복합 기술 관광기업, 예비 관광 스타트업");
    const [sectitle, setSectitle] = useState("추천대상");
    const [seccontent, setSeccontent] = useState("추천 대상관광 유관 분야 업력 7년 이내 스타트업 및 예비창업자");
    const [thrtitle, setThrtitle] = useState("지원 내용");
    const [thrcontent, setThrcontent] = useState("창업지원금, 센터 입주공간 제공, 사업화 컨설팅 등");



    // 버튼 클릭 시 제목과 컨테이너 내용을 업데이트하는 함수를 만듭니다.
    const handleButtonClick = (newTitle, newContainerContent, newFirtitle, newFircontent,newSectitle,newSeccontent,newThrtitle,newThrcontent) => {
        setTitle(newTitle);
        setContainerContent(newContainerContent);
        setFirtitle(newFirtitle);
        setFircontent(newFircontent);
        setSectitle(newSectitle);
       setSeccontent(newSeccontent);
       setThrtitle(newThrtitle);
       setThrcontent(newThrcontent);
    };

    return (
        <div className="Startup-info">
            <div className="block">
                <div className="title">
                    <a href="#apply-now" className="button" onClick={() => handleButtonClick("스타트업 공모전", "혁신적 지역 관광콘텍츠 발굴 및 사업화 유도","모집분야","지역상생 전통 관광기업, 지역혁신 관광벤처·스타트업, ICT 기반 융복합 기술 관광기업, 예비 관광 스타트업",
                        "추천대상","추천 대상관광 유관 분야 업력 7년 이내 스타트업 및 예비창업자","지원 내용","창업지원금, 센터 입주공간 제공, 사업화 컨설팅 등")}>스타트업 공모전</a>
                    <a href="#apply-now" className="button" onClick={() => handleButtonClick("입주기업 발굴", "혁신적 지역 관광콘텍츠 발굴 및 사업화 유도","추진대상","관광 유관 분야 업력 7년 이내 스타트업 및 예비창업자","지원내용","창업지원금, 센터 입주공간 제공, 사업화 컨설팅 등")}>입주기업 발굴</a>
                    <a href="#apply-now" className="button" onClick={() => handleButtonClick("예비창업자 교육", "창업 및 경영 실무 교육을 통한 창업 역량 강화","추진대상","지역 관광자원 활용 창업 아이템 보유 예비창업자  * 차년도 입주 가점","지원내용","창업실무교육, 맞춤형 멘토링, 시장연계검증, 사업화지원 등   *창업 관련 법규·실무 등 창업 초기 애로사항 관련 교육, 창업전문가 1:多 매칭 멘토링 및 컨설팅 운영 등")}>예비창업자 교육</a>
                    <a href="#apply-now" className="button" onClick={() => handleButtonClick("성장단계별 맞춤지원", "초기-성장-성숙(정체) 단계별 경영개선 지원","모집분야","지역 관광자원 활용 관광사업을 운영중인 관광스타트업, 관광벤터, 전통적 중소 관광사업체, 관광 유관 분야 기업등", "추진대상","지역 관광자원 활용 관광사업을 운영 중인 관광스타트업, 관광벤처(KTO), 전통적 중소 관광사업체, 관광 유관 분야 기업 등","지원내용","맞춤형 컨설팅, 투자유치 IR, 사업화지원금, CEO 네트워킹 등 * 성장단계별 기업육성 지원(기업진단 → 과제도출 → 컨설팅 → 맞춤형 사업 지원 등)")}>성장단계별 맞춤지원</a>
                    
                </div>
                <h1>{title}</h1>
                <div className="box">
                    <h3>{containerContent}</h3>
                </div>
            </div>

            <div className="Recruitment">
                <div className="container">
                    <div className="line"></div>
                    <div className="text"><h2>{firtitle}</h2></div>
                </div>

                <div className="container2">
                    <div className="line"></div>
                    <div className="text"><h3>{fircontent}</h3></div>
                </div>

                <div className="container3">
                    <div className="line"></div>
                    <div className="text"><h2>{sectitle}</h2></div>
                </div>

                <div className="container4">
                    <div className="line"></div>
                    <div className="text"><h3>{seccontent}</h3></div>
                </div>

                <div className="container5">
                    <div className="line"></div>
                    <div className="text"><h2>{thrtitle}</h2></div>
                </div>

                <div className="container6">
                    <div className="line"></div>
                    <div className="text"><h3>{thrcontent}</h3></div>
                </div>
            </div>
        </div>
    );
}

export default Startup;
