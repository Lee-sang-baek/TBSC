import React, {useEffect, useState} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import EduconsultData from '../../pages/explainpage/EduconsultData';
import StartUpData from '../../pages/explainpage/StartUpData';
import TourismData from '../../pages/explainpage/TourismData';
import './NewsPicture.css';

function NewsPicture() {
    const [selectedDataset, setSelectedDataset] = useState(EduconsultData.concat(StartUpData).concat(TourismData));

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
        <div className="NewsPicture-compo">
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

export default NewsPicture;
