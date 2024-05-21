import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './PressReleaseList.css';

const PressReleaseList = () => {
    const [pressReleases, setPressReleases] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPressReleases, setFilteredPressReleases] = useState([]);
    const pressReleasesPerPage = 6;
    const pagesPerGroup = 10;
    const navigate = useNavigate();
    const MemberState = sessionStorage.getItem("state");

    useEffect(() => {
        fetchPressReleases();
    }, []);

    const fetchPressReleases = async () => {
        try {
            const response = await axios.get('/pressrelease');
            const sortedPressReleases = response.data.sort((a, b) => b.num - a.num);
            setPressReleases(sortedPressReleases);
            setFilteredPressReleases(sortedPressReleases);
        } catch (error) {
            console.error("There was an error fetching the press releases!", error);
        }
    };

    const handleWriteClick = () => {
        navigate('/pressrelease/create');
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchClick = () => {
        const newFilteredPressReleases = pressReleases.filter(pressRelease =>
            pressRelease.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pressRelease.member.id.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredPressReleases(newFilteredPressReleases);
        setCurrentPage(1);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearchClick();
        }
    };

    const indexOfLastPressRelease = currentPage * pressReleasesPerPage;
    const indexOfFirstPressRelease = indexOfLastPressRelease - pressReleasesPerPage;
    const currentPressReleases = filteredPressReleases.slice(indexOfFirstPressRelease, indexOfLastPressRelease);

    const totalPages = Math.ceil(filteredPressReleases.length / pressReleasesPerPage);
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
        <div className="PressReleaseList-copo">
            <div className="container">
                <div className="header">
                    <h1>보도자료</h1>
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
                <div className="total-pressReleases">
                    <p>총 게시물: {filteredPressReleases.length}개</p>
                </div>
                <div className="pressRelease-grid">
                    {currentPressReleases.map(pressRelease => (
                        <div key={pressRelease.num} className="pressRelease-card">
                            {pressRelease.image && (
                                <img
                                    src={`/uploads/${pressRelease.image}`}
                                    alt={pressRelease.title}
                                />
                            )}
                            <h3>
                                <Link to={`/pressrelease/${pressRelease.num}`}>{pressRelease.title}</Link>
                            </h3>
                            <div className="pressRelease-meta">
                                <p>작성자: {pressRelease.member.id}</p>
                                <p>작성일: {new Date(pressRelease.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))}
                    {[...Array(pressReleasesPerPage - currentPressReleases.length)].map((_, index) => (
                        <div key={`empty-${index}`} className="pressRelease-card empty-card"></div>
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

export default PressReleaseList;
