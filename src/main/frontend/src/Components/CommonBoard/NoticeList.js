import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../Header/Header";
import './NoticeList.css';
import { Link } from "react-router-dom";
import Pagination from './Pagination';

function NoticeList() {
    const [notices, setNotices] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState(""); // 상태 필터 상태 관리
    const [currentPage, setCurrentPage] = useState(1);
    const [noticesPerPage] = useState(10);

    useEffect(() => {
        axios.get("/notices")
            .then(res => {
                const sortedNotices = res.data.sort((a, b) => b.num - a.num);  // 글 번호 내림차순 정렬
                setNotices(sortedNotices);
            })
            .catch(error => console.error("Error fetching notices:", error));
    }, []);
    // 작성일 포맷 조정
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    };


    // 검색과 상태 필터를 모두 적용한 공지사항 필터링
    const filteredNotices = notices.filter(notice => {
        return notice.title.toLowerCase().includes(search.toLowerCase()) &&
            (statusFilter ? notice.state === statusFilter : true);
    });

    // 페이지 변경 핸들러
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // 현재 페이지 공지사항 계산
    const indexOfLastNotice = currentPage * noticesPerPage;
    const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
    const currentNotices = filteredNotices.slice(indexOfFirstNotice, indexOfLastNotice);

    return (
        <div>
            <Header />
            <div className="noticeListContainer">
                <div className="noticeList">
                    <h1>공지사항</h1>
                    <div className="topBar">
                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
                                className="statusFilter">
                            <option value="">전체</option>
                            <option value="진행중">진행중</option>
                            <option value="마감">마감</option>
                        </select>
                        <input
                            type="text"
                            placeholder="검색..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="searchInput"
                        />

                        <span>총 게시물: {filteredNotices.length}개</span>
                        <Link to="/notices/new" className="writeButton">글쓰기</Link>
                    </div>
                    <table>
                        <thead>
                        <tr>
                            <th>제목</th>
                            <th>상태</th>
                            <th>작성일</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentNotices.map((notice) => (
                            <tr key={notice.num}>
                                <td><Link to={`/notices/${notice.num}`}>{notice.title}</Link></td>
                                <td>{notice.state}</td>
                                <td>{formatDate(notice.date)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <Pagination noticesPerPage={noticesPerPage} totalNotices={filteredNotices.length}
                                paginate={paginate}/>
                </div>
            </div>
        </div>
    );
}

export default NoticeList;
