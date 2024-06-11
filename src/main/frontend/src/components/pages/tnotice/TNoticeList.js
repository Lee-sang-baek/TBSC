import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './TNoticeList.css';

const TNoticeList = ({memberState}) => {
    const [notices, setNotices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredNotices, setFilteredNotices] = useState([]);
    const noticesPerPage = 8; // 페이지당 게시글표시임
    const pagesPerGroup = 10; // 10페이지씩보이게
    const navigate = useNavigate();

    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        try {
            const response = await axios.get('/tnotice');
            const sortedNotices = response.data.sort((a, b) => b.num - a.num);
            setNotices(sortedNotices);
            setFilteredNotices(sortedNotices);
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
        const newFilteredNotices = notices.filter(notice =>
            (notice.title && notice.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (notice.id && notice.id.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        setFilteredNotices(newFilteredNotices);
        setCurrentPage(1);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearchClick();
        }
    };

    const indexOfLastNotice = currentPage * noticesPerPage;
    const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
    const currentNotices = filteredNotices.slice(indexOfFirstNotice, indexOfLastNotice);

    const totalPages = Math.ceil(filteredNotices.length / noticesPerPage);
    const currentGroup = Math.ceil(currentPage / pagesPerGroup);

    const startPage = (currentGroup - 1) * pagesPerGroup + 1;
    const endPage = Math.min(currentGroup * pagesPerGroup, totalPages);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePreviousGroup = () => {
        setCurrentPage(startPage - 1);
    };

    const handleNextGroup = () => {
        setCurrentPage(endPage + 1);
    };

    return (
        <div className="TNoticeList-copo">
            <div className="container">
                <div className="header">
                    <h2>기업 홍보</h2>
                    {memberState === "ADMIN" && (
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
                            <div className="notice-meta">
                                <p>작성자: {notice.member.id}</p>
                                <p>작성일: {new Date(notice.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))}
                    {[...Array(noticesPerPage - currentNotices.length)].map((_, index) => (
                        <div key={`empty-${index}`} className="notice-card empty-card"></div>
                    ))}
                </div>
                <div className="pagination">
                    {startPage > 1 && (
                        <button onClick={handlePreviousGroup}>&laquo;</button>
                    )}
                    {[...Array(endPage - startPage + 1)].map((_, index) => {
                        const pageNumber = startPage + index;
                        return (
                            <button
                                key={pageNumber}
                                onClick={() => handlePageChange(pageNumber)}
                                className={pageNumber === currentPage ? 'active' : ''}
                            >
                                {pageNumber}
                            </button>
                        );
                    })}
                    {endPage < totalPages && (
                        <button onClick={handleNextGroup}>&raquo;</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TNoticeList;
