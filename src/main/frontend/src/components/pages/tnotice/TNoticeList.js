import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './TNoticeList.css';

const TNoticeList = () => {
    const [notices, setNotices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const noticesPerPage = 6;
    const navigate = useNavigate();
    const MemberState = sessionStorage.getItem("state");

    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        try {
            const response = await axios.get('/tnotice');
            const sortedNotices = response.data.sort((a, b) => b.num - a.num);
            setNotices(sortedNotices);
        } catch (error) {
            console.error("There was an error fetching the notices!", error);
        }
    };

    const handleWriteClick = () => {
        navigate('/tnotice/create');
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchClick = () => {
        setCurrentPage(1);
    };

    const filteredNotices = notices.filter(notice =>
        (notice.title && notice.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (notice.id && notice.id.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const indexOfLastNotice = currentPage * noticesPerPage;
    const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
    const currentNotices = filteredNotices.slice(indexOfFirstNotice, indexOfLastNotice);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredNotices.length / noticesPerPage); i++) {
        pageNumbers.push(i);
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="TNoticeList-copo">
            <div className="container">
                <div className="header">
                    <h1>기업홍보</h1>
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
                <div className="total-notices">
                    <p>총 게시물: {filteredNotices.length}개</p>
                </div>
                <div className="notice-grid">
                    {currentNotices.map(notice => (
                        <div key={notice.num} className="notice-card">
                            {notice.image && (
                                <img
                                    src={`/uploads/${notice.image}`}
                                    alt={notice.title}
                                />
                            )}
                            <h3>
                                <Link to={`/tnotice/${notice.num}`}>{notice.title}</Link>
                            </h3>
                            <p>{notice.id}</p>
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

export default TNoticeList;
