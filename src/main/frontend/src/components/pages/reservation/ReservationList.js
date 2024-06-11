import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './ReservationList.css';

const ReservationList = ({memberState}) => {
    const [reservations, setReservations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const reservationsPerPage = 10;
    const navigate = useNavigate();

    useEffect(() => {
        fetchReservations();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    const fetchReservations = async () => {
        try {
            const response = await axios.get('/reservation');
            const sortedReservations = response.data.sort((a, b) => b.num - a.num);
            setReservations(sortedReservations);
        } catch (error) {
            console.error("There was an error fetching the reservations!", error);
        }
    };

    const handleWriteClick = () => {
        navigate('/reservation/create');
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchClick = () => {
        setCurrentPage(1);
    };

    const filteredReservations = reservations.filter(reservation =>
        (reservation.title && reservation.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (reservation.content && reservation.content.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (reservation.id && reservation.id.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const indexOfLastReservation = currentPage * reservationsPerPage;
    const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;
    const currentReservations = filteredReservations.slice(indexOfFirstReservation, indexOfLastReservation);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredReservations.length / reservationsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="ReservationList-copo">
            <div className="container">
                <div className="header">
                    <h1>이용예약 안내</h1>
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
                <div className="total-reservations">
                    <p>총 게시글 {filteredReservations.length}개</p>
                    {memberState === "ADMIN" && (
                        <button onClick={handleWriteClick}>글쓰기</button>
                    )}
                </div>
                <div className="reservation-table">
                    <div className="reservation-header">
                        <span>번호</span>
                        <span>제목</span>
                        <span>내용</span>
                        <span>작성일</span>
                    </div>
                    {currentReservations.map(reservation => (
                        <div key={reservation.num} className="reservation-row">
                            <span>{reservation.num}</span>
                            <span>
                                <Link to={`/reservation/${reservation.num}`}>{reservation.title}</Link>
                            </span>
                            <span>
                                <Link to={`/reservation/${reservation.num}`}>
                                    {reservation.content.split('\n')[0]}
                                </Link>
                            </span>
                            <span className='date'>{new Date(reservation.date).toLocaleDateString()}</span>
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

export default ReservationList;
