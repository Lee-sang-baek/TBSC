import React, { useState } from 'react';
import './CompBanner.css'; // CSS 파일 import
import Slider from 'react-slick';
import EduconsultData from '../../pages/explainpage/EduconsultData';

function CompBanner() {
    const [selectedDataset, setSelectedDataset] = useState(EduconsultData);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div class="CompBanner-compo">
            <div className='content'>
                <Slider {...settings}>
                    {selectedDataset.map((item, index) => (
                        <div key={index} className="slide">
                            <div className='back-box' style={{ 
                                backgroundImage: `url("${item.image}")`,
                                backgroundSize: 'cover', // or 'contain', 'fill', etc.
                                backgroundPosition: 'center', // Optional for positioning the background
                                backgroundRepeat: 'no-repeat' // Optional to prevent repeating the image
                            }}>
                            <div className='shape'>
                                <h2>{item.title}</h2>
                                <h3>{item.containerContent}</h3>
                                <h4>{item.firtitle}</h4>
                                <p>{item.fircontent}</p>
                                <h4>{item.sectitle}</h4>
                                <p>{item.seccontent}</p>
                                {item.thrtitle && <h4>{item.thrtitle}</h4>}
                                {item.thrcontent && <p>{item.thrcontent}</p>}
                            </div>
                            </div>
                        </div>
                        ))
                    }
                </Slider>
            </div>
        </div>
    );
}

export default CompBanner;