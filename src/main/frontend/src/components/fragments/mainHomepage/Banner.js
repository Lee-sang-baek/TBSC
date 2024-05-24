import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // 화살표 아이콘 import
import './Banner.css'; // CSS 파일 import

function Banner() {
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
        autoplaySpeed: 2000, // 자동 재생 시 슬라이드 간의 간격(초) 지정
        prevArrow: <PrevArrow />, // 이전 화살표 설정
        nextArrow: <NextArrow /> // 다음 화살표 설정
    };

    return (


            <div className="Banner-compo">
                <div className="slider-container">
                    <Slider {...settings} className="autoplay">
                        <div>
                            <img src="imgs/login.png" alt="image1"/>
                        </div>
                        <div>
                            <img src="imgs/logo.png" alt="image2"/>
                        </div>
                        <div>
                            <img src="/imgs/userProfile.png" alt="image3"/>
                        </div>

                    </Slider>

                </div>
            </div>

    );
}

export default Banner;