import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // 화살표 아이콘 import
import './SideBanner.css'; // CSS 파일 import
import axios from 'axios';
import ContentsViewer from '../../pages/mypage/functionPage/Viewer';

function SideBanner() {
    const [scrollY, setScrollY] = useState(0);
    const containerRef = useRef(null);
    const [imageList, setImageList] = useState([]);

    useEffect(() => {
        axios.get("/api/banner")
        .then((res) => {
            setImageList(res.data);
        });
    }, []);


    const handleScroll = () => {
        if (containerRef.current) {
            const containerTop = containerRef.current.getBoundingClientRect().top;
            const scrollPosition = Math.max(0, window.scrollY - containerTop);
            setScrollY(scrollPosition);
        }
    };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const bannerStyle = {
    position: 'absolute',
    top: `${scrollY / 2 - 50}px`,
    right: '20px',
    transition: 'top 0.1s ease-out',
  };

    // 이전 화살표 컴포넌트
    const PrevArrow = (props) => {
        const { onClick } = props;
        return (
            <div className=" arrow prev" onClick={onClick}>
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
        autoplaySpeed: 5000, // 자동 재생 시 슬라이드 간의 간격(초) 지정
        prevArrow: <PrevArrow />, // 이전 화살표 설정
        nextArrow: <NextArrow /> // 다음 화살표 설정

    };

    const modifiedImageList = imageList.length === 1 ? imageList.concat(imageList) : imageList;

    return (

    <div ref={containerRef} style={{ display: 'block', position: 'relative', height: 'fit-content', margin: '20px' }}>
        {(modifiedImageList && modifiedImageList.length >= 1) && 
        <div className="SideBanner-compo" style={bannerStyle}>
            <Slider {...settings} className="autoplay">
                {modifiedImageList && modifiedImageList.map((item, index) => (
                    <div key={index} className='image-box'>
                        <img src={`/api/uploads/${item.image}`} alt={item.title} />
                        <div className='content-box'>
                            <ContentsViewer contents={item.content} isTag={true}/>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
        }
    </div>
    );
}


export default SideBanner;