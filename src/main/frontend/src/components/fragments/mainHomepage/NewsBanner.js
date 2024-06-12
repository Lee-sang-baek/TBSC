import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './NewsBanner.css';
import { DateFormatExceptTime } from "../../util/DateFormat";
import { Link } from 'react-router-dom';

const NoticeBanner = () => {
    const [notices, setNotices] = useState([]);
    const [centerNews, setCenterNews] = useState([]);
    const [pressReleases, setPressReleases] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('notices');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        axios.get('/api/notices/banner')
            .then((res) => {
                setNotices(res.data);
            })
            .catch((err) => {
                console.error(err);
            });

        axios.get('/api/centernews/banner')
            .then((res) => {
                setCenterNews(res.data);
            })
            .catch((err) => {
                console.error(err);
            });

        axios.get('/api/pressrelease/banner')
            .then((res) => {
                setPressReleases(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const items = getItems();
            if (items.length > 0) {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
            }
        }, 5000); // #초마다 슬라이드 변경

        return () => clearInterval(interval);
    }, [selectedCategory, notices, centerNews, pressReleases]);

    const handlePageChange = (count) => {
        const items = getItems();
        if (items.length > 0) {
            if (currentIndex + count < 0) {
                setCurrentIndex(items.length - 1)
            } else {
                setCurrentIndex((prevIndex) => (prevIndex + count) % items.length);
            }
        }
    }

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentIndex(0); // 카테고리가 변경될 때 인덱스를 0으로 초기화
    };

    const getItems = () => {
        switch (selectedCategory) {
            case 'notices':
                return notices;
            case 'centerNews':
                return centerNews;
            case 'pressrelease':
                return pressReleases;
            default:
                return [];
        }
    };

    const items = getItems();
    const currentItem = items.length > 0 ? items[currentIndex] : null;

    return (
        <div className="NoticeBanner-compo">
            <div className='banner-box'>
                <div className='menu'>
                    <h3>News</h3>
                    <h4 onClick={() => handleCategoryChange('notices')} className={selectedCategory === 'notices' ? 'active' : ''}>공지사항</h4>
                    <h4 onClick={() => handleCategoryChange('centerNews')} className={selectedCategory === 'centerNews' ? 'active' : ''}>센터소식</h4>
                    <h4 onClick={() => handleCategoryChange('pressrelease')} className={selectedCategory === 'pressrelease' ? 'active' : ''}>보도자료</h4>
                </div>
                <div className='page-btn'>
                    <div className='up' onClick={() => {handlePageChange(-1)}}> ▲ </div>
                    <div className='down' onClick={() => {handlePageChange(1)}}> ▼ </div>
                </div>
                <div className='write'>
                    {currentItem ? (
                        <>
                            <div className='title'>
                                <h4>
                                    <Link to={`/${selectedCategory}/${currentItem.num}`}>{currentItem.title}</Link>
                                </h4>
                                <p>작성일 : {DateFormatExceptTime(currentItem.date)}</p>
                            </div>
                            {selectedCategory === 'notices' && (
                                <div className='content' dangerouslySetInnerHTML={{ __html: currentItem.content }}></div>
                            )}
                            {selectedCategory !== 'notices' && (
                                <div className='content'>
                                    <p>{currentItem.content}</p>
                                </div>
                            )}
                        </>
                    ) : (
                        <h1>표시할 내용이 없습니다.</h1>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NoticeBanner;
