import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './CenterNewsList.css'; // Import the CSS file

const CenterNewsList = () => {
    const [news, setNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredNews, setFilteredNews] = useState([]);
    const newsPerPage = 8;
    const navigate = useNavigate();
    const MemberState = sessionStorage.getItem("state");

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await axios.get('/centernews');
            const sortedNews = response.data.sort((a, b) => b.num - a.num);
            setNews(sortedNews);
            setFilteredNews(sortedNews); // 초기에는 전체 뉴스를 설정
        } catch (error) {
            console.error("There was an error fetching the news!", error);
        }
    };

    const handleWriteClick = () => {
        navigate('/centernews/create');
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchClick = () => {
        const newFilteredNews = news.filter(newsItem =>
            newsItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            newsItem.member.id.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredNews(newFilteredNews);
        setCurrentPage(1);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearchClick();
        }
    };

    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentNews = filteredNews.slice(indexOfFirstNews, indexOfLastNews);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredNews.length / newsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="CenterNewsList-copo">
            <div className="container">
                <div className="header">
                    <h1>센터 뉴스</h1>
                    {MemberState === "ADMIN" && (
                        <button onClick={handleWriteClick}>글쓰기</button>
                    )}
                </div>
                <div className="info-bar">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="검색어를 입력하세요"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onKeyDown={handleKeyDown}
                        />
                        <button onClick={handleSearchClick}>검색</button>
                    </div>
                </div>
                <div className="total-news">
                    <p>총 게시물: {filteredNews.length}개</p>
                </div>
                <div className="news-grid">
                    {currentNews.map(newsItem => (
                        <div key={newsItem.num} className="news-card">
                            {newsItem.image && (
                                <img
                                    src={`/uploads/${newsItem.image}`}
                                    alt={newsItem.title}
                                />
                            )}
                            <h3>
                                <Link to={`/centernews/${newsItem.num}`}>{newsItem.title}</Link>
                            </h3>
                            <div className="news-meta">
                                <p>작성자: {newsItem.member.id}</p>
                                <p>작성일: {new Date(newsItem.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))}
                    {[...Array(newsPerPage - currentNews.length)].map((_, index) => (
                        <div key={`empty-${index}`} className="news-card empty-card"></div>
                    ))}
                </div>
                <div className="pagination">
                    {pageNumbers.map(number => (
                        <button
                            key={number}
                            onClick={() => handlePageChange(number)}
                            className={number === currentPage ? 'active' : ''}
                        >
                            {number}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CenterNewsList;
