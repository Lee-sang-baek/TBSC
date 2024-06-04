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
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className="NewsPicture-compo">
            <div className='shape'>
                <div className='content'>
            <Slider {...settings}>
                {selectedDataset.map((item, index) => (


                            <div key={index} className="slide">

                                <h2>{item.title}</h2>
                                <h3>{item.containerContent}</h3>
                                <h4>{item.firtitle}</h4>
                                <p>{item.fircontent}</p>
                                <h4>{item.sectitle}</h4>
                                <p>{item.seccontent}</p>
                                {item.thrtitle && <h4>{item.thrtitle}</h4>}
                                {item.thrcontent && <p>{item.thrcontent}</p>}
                            </div>

                            ))
                        }
                        </Slider>


</div></div>

                    </div>
                    );
                }

export default NewsPicture;
