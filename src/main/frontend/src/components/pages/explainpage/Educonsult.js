import React, { useState } from 'react';
import './Educonsult.css'; // CSS 파일 import

function Educonsult() {
    // 상태 변수를 사용하여 제목과 컨테이너 내용을 관리합니다.
    const [title, setTitle] = useState("DX 역량강화");
    const [containerContent, setContainerContent] = useState("전통적 관광기업의 디지털 역량 강화 교육 지원");
    const [firtitle, setFirtitle] = useState("추진대상");
    const [fircontent, setFircontent] = useState("DX 역량강화 의지가 있는 지역 소재 관광 유관기업 종사자");
    const [sectitle, setSectitle] = useState("지원내용");
    const [seccontent, setSeccontent] = useState("디지털 역량진단, 맞춤형 교육 프로그램 등 * 맞춤형 교육(관광 트렌드 분석, 디지털 마케팅, 여행홍보자료 제작을 위한 PPT 활용 교육 등)");




    // 버튼 클릭 시 제목과 컨테이너 내용을 업데이트하는 함수를 만듭니다.
    const handleButtonClick = (newTitle, newContainerContent, newFirtitle, newFircontent,newSectitle,newSeccontent) => {
        setTitle(newTitle);
        setContainerContent(newContainerContent);
        setFirtitle(newFirtitle);
        setFircontent(newFircontent);
        setSectitle(newSectitle);
       setSeccontent(newSeccontent);

    };

    return (
        <div className="Educonsult-info">
            <div className="block">
                <div className="title">
                    <a href="#apply-now" className="button" onClick={() => handleButtonClick("DX 역량강화", "전통적 관광기업의 디지털 역량 강화 교육 지원","추진대상",
                                                                                              "DX 역량강화 의지가 있는 지역 소재 관광 유관기업 종사자","지원내용","디지털 역량진단, 맞춤형 교육 프로그램 등  * 맞춤형 교육(관광 트렌드 분석, 디지털 마케팅, 여행홍보자료 제작을 위한 PPT 활용 교육 등)")}>DX 역량강화</a>
                    <a href="#apply-now" className="button" onClick={() => handleButtonClick("교육 및 컨설팅", "예비창업자 교육, 공모전, 단계별 맞춤지원 등 센터 진행 프로그램 참여자 대상 맞춤형 컨설팅, 멘토링 및 교육 통합 운영","추진대상","광주 관광기업지원센터 추진 프로그램 참여자 및 입주기업","지원내용","1대1 및 1대다 구성을 통한 실무 멘토링·컨설팅 및 교육 프로그램")}>교육 및 컨설팅</a>
                    <a href="#apply-now" className="button" onClick={() => handleButtonClick("관광 OJT 아카데미", "산학 연계 이론·실무 복합과정 관광 미래인재 양성 아카데미","추진대상","관광분야 취업 의사가 있는 지역 소재 및 출신 대학생","지원내용","우수 수료자 대상 인턴십, 2개월 인턴 급여 등")}>관광 OJT 아카데미</a>
                    <a href="#apply-now" className="button" onClick={() => handleButtonClick("로컬크리에이터 육성", "지역 관광자원을 활용한 미디어 콘텐츠 제작 로컬크리에이터를 발굴 · 양성 · 육성","모집대상","지역 거주 로컬크리에이터를 희망하는 누구나", "지원내용","지역 관광자원 활용 관광사업을 운영 중인 관광스타트업, 관광벤처(KTO), 전통적 중소 관광사업체, 관광 유관 분야 기업 등","지원내용","촬영장비, 편집프로그램, 활동비, 콘텐츠 제작 교육 등")}>로컬크리에이터 육성</a>
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


            </div>
        </div>
    );
}

export default Educonsult;
