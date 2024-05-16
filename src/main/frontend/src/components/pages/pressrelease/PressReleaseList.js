import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './PressReleaseList.css';

const PressReleaseList = () => {
    const [pressReleases, setPressReleases] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const pressReleasesPerPage = 6;
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
        setCurrentPage(1);
    };

    const filteredPressReleases = pressReleases.filter(pressRelease =>
        pressRelease.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pressRelease.member.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastPressRelease = currentPage * pressReleasesPerPage;
    const indexOfFirstPressRelease = indexOfLastPressRelease - pressReleasesPerPage;
    const currentPressReleases = filteredPressReleases.slice(indexOfFirstPressRelease, indexOfLastPressRelease);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredPressReleases.length / pressReleasesPerPage); i++) {
        pageNumbers.push(i);
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
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
                            <p>{pressRelease.member.id}</p>
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

export default PressReleaseList;
