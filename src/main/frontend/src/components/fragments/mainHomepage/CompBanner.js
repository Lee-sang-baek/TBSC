import React, { useEffect, useState } from 'react';
import './CompBanner.css'; // CSS 파일 import
import Slider from 'react-slick';
import EduconsultData from '../../pages/explainpage/EduconsultData';
import Viewer from "../../pages/mypage/functionPage/Viewer";
import axios from 'axios';

function CompBanner() {
    const [selectedDataset, setSelectedDataset] = useState(EduconsultData);

    useEffect(() => {
        getDataset();
    }, []);

    const getDataset = () => {
        axios.get('/api/registcomp/list')
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
                                backgroundImage: `url("/api/uploads/${item.compImage}")`
                            }}>
                                <div className='shape' style={{ width: "80%" }}>
                                    <p>{item.content && (<Viewer contents={item.content} isTag={false} />)}</p>
                                    <h4>{item.title} ({item.writer})</h4>
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