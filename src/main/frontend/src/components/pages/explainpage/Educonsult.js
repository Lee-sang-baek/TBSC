import React, { useState } from 'react';
import './Educonsult.css'; // CSS 파일 import
import EduconsultData from './EduconsultData'; // 데이터 파일 import

function Educonsult() {
    // 상태 변수를 사용하여 제목과 컨테이너 내용을 관리합니다.
    const [title, setTitle] = useState(EduconsultData[0].title);
    const [containerContent, setContainerContent] = useState(EduconsultData[0].containerContent);
    const [firtitle, setFirtitle] = useState(EduconsultData[0].firtitle);
    const [fircontent, setFircontent] = useState(EduconsultData[0].fircontent);
    const [sectitle, setSectitle] = useState(EduconsultData[0].sectitle);
    const [seccontent, setSeccontent] = useState(EduconsultData[0].seccontent);

    // 버튼 클릭 시 제목과 컨테이너 내용을 업데이트하는 함수를 만듭니다.
    const handleButtonClick = (index) => {
        setTitle(EduconsultData[index].title);
        setContainerContent(EduconsultData[index].containerContent);
        setFirtitle(EduconsultData[index].firtitle);
        setFircontent(EduconsultData[index].fircontent);
        setSectitle(EduconsultData[index].sectitle);
        setSeccontent(EduconsultData[index].seccontent);
    };

    return (
        <div className="Educonsult-info">
            <div className="block">
                <div className="title">
                    {EduconsultData.map((data, index) => (
                        <a
                            key={index}
                            href="#apply-now"
                            className="button"
                            onClick={() => handleButtonClick(index)}
                        >
                            {data.title}
                        </a>
                    ))}
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
