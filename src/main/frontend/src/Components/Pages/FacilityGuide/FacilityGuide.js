import React, { useState } from 'react';
import './FacilityGuide.css';

const facilitiesData = {
    1: {
        key: 1,
        name: "운영관리사무실",
        mainImage: "./img/Facility/facilities_map01.png",
        thumbnails: ["./img/Facility/facilities_map01.png","./img/Facility/facilities0101.jpg", "./img/Facility/facilities0102.jpg"],
        description: "(운영관리사무실) 상주 사무공간"
    },
    2: {
        key: 2,
        name: "입주기업사무실",
        mainImage: "",
        thumbnails: ["./img/Facility/facilities_map02.png","./img/Facility/facilities0201.jpg", "./img/Facility/facilities0202.jpg", "./img/Facility/facilities0203.jpg", "./img/Facility/facilities0204.jpg"],
        description: "· (1인실) 10석 \n · (2~3인실) 6실 \n · (4~6인실) 4실"
    },
    3: {
        key: 3,
        name: "미팅룸·컨퍼러스룸",
        mainImage: "",
        thumbnails: ["./img/Facility/facilities_map03.png","./img/Facility/facilities0301.jpg", "./img/Facility/facilities0302.jpg", "./img/Facility/facilities0303.jpg"],
        description: "· (소형/6인석) 2실 \n · (중대형/최대5~6인석) 1실 \n * 가벽 활용 유연한 공간 운영 가능"
    },
    4: {
        key: 4,
        name: "컨설팅룸",
        mainImage: "",
        thumbnails: ["./img/Facility/facilities_map04.png","./img/Facility/facilities0401.jpg", "./img/Facility/facilities0402.jpg", "./img/Facility/facilities0403.jpg"],
        description: "· (컨설팅룸/6인석) 2실"
    },
    5: {
        key: 5,
        name: "미디어랩",
        mainImage: "",
        thumbnails: ["./img/Facility/facilities_map05.png","./img/Facility/facilities0501.jpg", "./img/Facility/facilities0502.jpg", "./img/Facility/facilities0503.jpg","./img/Facility/facilities0504.jpg","./img/Facility/facilities0505.jpg"],
        description: "· (콘텐츠 제작실) 1실 \n ·(촬영실) 1실 \n ·(편집실) 2실"
    },
    6: {
        key: 6,
        name: "공유라운지",
        mainImage: "",
        thumbnails: ["./img/Facility/facilities_map06.png","./img/Facility/facilities0601.jpg", "./img/Facility/facilities0602.jpg"],
        description: "· (공유라운지) 1실"
    },
    7: {
        key: 7,
        name: "폰부스·자료보관실",
        mainImage: "",
        thumbnails: ["./img/Facility/facilities_map07.png","./img/Facility/facilities0701.jpg", "./img/Facility/facilities0702.jpg"],
        description: "· (방음 폰부스) 1실 \n · (자료보관실) 1실"
    },
    // 기타 시설 정보 추가
};

function FacilityGuide() {
    const [selectedFacility, setSelectedFacility] = useState(1);
    const [mainImage, setMainImage] = useState(facilitiesData[selectedFacility].thumbnails[0]);
    const facility = facilitiesData[selectedFacility];

    const handleThumbnailClick = (thumbnail) => {
        setMainImage(thumbnail);
    };

    const handleTabClick = (id) => {
        setSelectedFacility(id);
        setMainImage(facilitiesData[id].thumbnails[0]);
    };

    return (
        <div className="FacilityGuide-compo">
            <div className="h2center">
                <h2>시설 안내</h2>
            </div>
            <div className="ptag">
                <p>광주광역시 서구 운천로 247(치평동) 스타타워 4층에 위치하며</p>
            </div>
            <div className="ptag">
                <p><strong>창업·보육 및 일자리 지원시설을 조성·운영중</strong>에 있습니다.</p>
            </div>

            <div className="FacilityGuide-compo2">
                <ul>
                    {Object.entries(facilitiesData).map(([id, data]) => (

                        <li key={id} onClick={() => handleTabClick(id)}
                            className={`tabMenu ${selectedFacility == id ? 'active' : ''}`}>
                            <p>{data.name}</p>
                        </li>
                    ))}
                </ul>
                <div className="facility-display">
                    <img src={mainImage} alt="Main facility" className="main-image"/>

                    <div className="facility-description">
                        <p className="facility-text">{facility.key}</p>
                        <h5>{facility.name}</h5>
                        <p>{facility.description}</p>
                        <div className="thumbnails">
                            {facility.thumbnails.map((thumb, index) => (
                                <img key={index} src={thumb} alt={`Thumbnail ${index}`} className="thumbnail-image"
                                     onClick={() => handleThumbnailClick(thumb)}/>
                            ))}
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default FacilityGuide;
