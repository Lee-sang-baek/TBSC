import React from 'react';
import './Tourism.css';
import TourismData from './TourismData';

function Tourism() {
    return (
        <div className="explain-info">
            <div className="block">
                <div className="title">
                    <a href="#apply-now" className="button">{TourismData.title}</a>
                </div>
                <h1>{TourismData.title}</h1>
                <div className="box">
                    <h3>{TourismData.content}</h3>
                </div>
            </div>

            <div className="Recruitment">
                <div className="container">
                    <div className="line"></div>
                    <div className="text"><h2>{TourismData.firtitle}</h2></div>
                </div>
                <div className="container2">
                    <div className="line"></div>
                    <div className="text"><h3>{TourismData.fircontent}</h3></div>
                </div>
                <div className="container3">
                    <div className="line"></div>
                    <div className="text"><h2>{TourismData.sectitle}</h2></div>
                </div>
                <div className="container4">
                    <div className="line"></div>
                    <div className="text"><h3>{TourismData.seccontent}</h3></div>
                </div>
                <div className="container5">
                    <div className="line"></div>
                    <div className="text"><h2>{TourismData.thrtitle}</h2></div>
                </div>
                <div className="container6">
                    <div className="line"></div>
                    <div className="text"><h3>{TourismData.thrcontent}</h3></div>
                </div>
            </div>
        </div>
    );
}

export default Tourism;
