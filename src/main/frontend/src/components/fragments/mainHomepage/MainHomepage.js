import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // 화살표 아이콘 import
import './MainHomepage.css'; // CSS 파일 import
import NewsBanner from './NewsBanner'; // NewsBanner 컴포넌트를 import합니다.
import axios from 'axios';
import NewsPicture from './NewsPicture';
import Popup from '../popup/Popup';
import CompBanner from './CompBanner';
import ContentsViewer from '../../pages/mypage/functionPage/Viewer';
import MainBanner from './MainBanner';

function MainHomepage() {
    const [imageList, setImageList] = useState([]);
    const [popupList, setPopupList] = useState([]);

    useEffect(() => {
        axios.get("/api/mainImage")
        .then((res) => {
            setImageList(res.data);
        });
        axios.get("/api/popup")
        .then((res) => {
            setPopupList(res.data);
        });
    }, []);

    // 이전 화살표 컴포넌트
    const PrevArrow = (props) => {
        const { onClick } = props;
        return (
            <div className="arrow prev" onClick={onClick}>
                <FaChevronLeft />
            </div>
        );
    };

    // 다음 화살표 컴포넌트
    const NextArrow = (props) => {
        const { onClick } = props;
        return (
            <div className="arrow next" onClick={onClick}>
                <FaChevronRight />
            </div>
        );
    };

    const settings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true, //자동 재생 여부
        autoplaySpeed: 10000, // 자동 재생 시 슬라이드 간의 간격(초) 지정
        prevArrow: <PrevArrow />, // 이전 화살표 설정
        nextArrow: <NextArrow /> // 다음 화살표 설정
    };

    const modifiedImageList = imageList.length === 1 ? imageList.concat(imageList) : imageList;

    const setRandomPositionNearCenter = () => {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const popupWidth = 500;
        const popupHeight = 650;
    
        const centerX = (windowWidth - popupWidth) / 2;
        const centerY = (windowHeight - popupHeight) / 2;
    
        const randomOffsetX = (Math.random() - 0.5) * 400; // -200px ~ +200px
        const randomOffsetY = (Math.random() - 0.5) * 200;
    
        const finalX = centerX + randomOffsetX;
        const finalY = centerY + randomOffsetY;
    
        return {
          top: `${finalY}px`,
          left: `${finalX}px`,
          width: `${popupWidth}px`,
          height: `${popupHeight}px`,
          position: 'fixed'
        };
      };

    return (

        <div className="MainHomepage-compo">
            {popupList && popupList.map((item, index) => (
                <div key={index}>
                    <Popup item={item} setRandomPositionNearCenter={setRandomPositionNearCenter} />
                </div>
            ))}
            <MainBanner settings={settings} modifiedImageList={modifiedImageList}/>
            <NewsBanner />
            <div className='bottom-banner'>
                <NewsPicture />
                <CompBanner />
            </div>
        </div>

    );
}

export default MainHomepage;
