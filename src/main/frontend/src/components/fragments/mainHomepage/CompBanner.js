import React, { useEffect, useState } from 'react';
import './CompBanner.css'; // CSS 파일 import
import Slider from 'react-slick';
import EduconsultData from '../../pages/explainpage/EduconsultData';
import axios from 'axios';

function CompBanner() {
    const [selectedDataset, setSelectedDataset] = useState(EduconsultData);

    useEffect(() => {
        getDataset();
    }, []);

    const getDataset = () => {
        axios.get('/registcomp/list')
        .then((res) => {
            let list = res.data.length === 1 ? res.data.concat(res.data) : res.data;
            setSelectedDataset(list);
        })
        .catch((err) => {
            setSelectedDataset([]);
        });
    };

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div class="CompBanner-compo">
            <div className='content'>
                <Slider {...settings}>
                    {selectedDataset && selectedDataset.map((item, index) => (
                        <div key={index} className="slide">
                            <div className='back-box' style={{ 
                                backgroundImage: `url("/uploads/${item.compImage}")`,
                                backgroundSize: 'cover', // or 'contain', 'fill', etc.
                                backgroundPosition: 'center', // Optional for positioning the background
                                backgroundRepeat: 'no-repeat' // Optional to prevent repeating the image
                            }}>
                                <div className='shape'>
                                    <h2>{item.title}</h2>
                                    <h3>{item.corpName}</h3>
                                    <h4>{item.writer}</h4>
                                    <p>{item.content}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                    {(!selectedDataset || selectedDataset.length < 1) && (
                        <div className="slide">
                            <div className='back-box'>
                                <div className='shape'>
                                    <h2>등록된 기업이 없습니다.</h2>
                                </div>
                            </div>
                        </div>
                    )}

                    {(!selectedDataset || selectedDataset.length < 1) && (
                        <div className="slide">
                            <div className='back-box'>
                                <div className='shape'>
                                    <h2>등록된 기업이 없습니다.</h2>
                                </div>
                            </div>
                        </div>
                    )}
                </Slider>
            </div>
        </div>
    );
}

export default CompBanner;