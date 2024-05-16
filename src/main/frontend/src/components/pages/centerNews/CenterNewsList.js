import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './CenterNewsList.css'; // Import the CSS file

const CenterNewsList = () => {
    const [news, setNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const newsPerPage = 6;
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
        setCurrentPage(1);
    };

    const filteredNews = news.filter(newsItem =>
        newsItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        newsItem.member.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                            <p>{newsItem.member.id}</p>
                        </div>
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
