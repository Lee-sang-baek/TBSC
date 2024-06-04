import React, { useState } from 'react';
import './Startup.css'; // CSS 파일 import
import StartUpData from './StartUpData'; // 데이터 파일 import

function Startup() {
    // 상태 변수를 사용하여 제목과 컨테이너 내용을 관리합니다.
    const [title, setTitle] = useState(StartUpData[0].title);
    const [containerContent, setContainerContent] = useState(StartUpData[0].content);
    const [firtitle, setFirtitle] = useState(StartUpData[0].firtitle);
    const [fircontent, setFircontent] = useState(StartUpData[0].fircontent);
    const [sectitle, setSectitle] = useState(StartUpData[0].sectitle);
    const [seccontent, setSeccontent] = useState(StartUpData[0].seccontent);
    const [thrtitle, setThrtitle] = useState(StartUpData[0].thrtitle);
    const [thrcontent, setThrcontent] = useState(StartUpData[0].thrcontent);

    // 버튼 클릭 시 제목과 컨테이너 내용을 업데이트하는 함수를 만듭니다.
    const handleButtonClick = (index) => {
        setTitle(StartUpData[index].title);
        setContainerContent(StartUpData[index].content);
        setFirtitle(StartUpData[index].firtitle);
        setFircontent(StartUpData[index].fircontent);
        setSectitle(StartUpData[index].sectitle);
        setSeccontent(StartUpData[index].seccontent);
        setThrtitle(StartUpData[index].thrtitle);
        setThrcontent(StartUpData[index].thrcontent);
    };

    return (
        <div className="Startup-info">
            <div className="block">
                <div className="title">
                    {StartUpData.map((data, index) => (
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
