import React, { useEffect, useState } from "react";
import axios from "axios";
import "./NoticeList.css";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import Button from "../../baseComponents/Button";

function NoticeList({memberState}) {
    const [notices, setNotices] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [noticesPerPage] = useState(10);
    const [filteredNotices, setFilteredNotices] = useState([]);

    useEffect(() => {
        axios.get("/api/notices")
            .then(res => {
                const sortedNotices = res.data.sort((a, b) => b.num - a.num);
                setNotices(sortedNotices);
                setFilteredNotices(sortedNotices); // 초기에는 전체 공지사항을 설정
            })
            .catch(error => console.error("Error fetching notices:", error));
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    };

    const handleSearchClick = () => {
        const newFilteredNotices = notices.filter(notice =>
            notice.title.toLowerCase().includes(search.toLowerCase()) &&
            (statusFilter ? notice.state === statusFilter : true)
        );
        setFilteredNotices(newFilteredNotices);
        setCurrentPage(1);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearchClick();
        }
    };

    const paginate = pageNumber => setCurrentPage(pageNumber);
    const indexOfLastNotice = currentPage * noticesPerPage;
    const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
    const currentNotices = filteredNotices.slice(indexOfFirstNotice, indexOfLastNotice);

    return (
        <div className="NoticeList-compo">
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
                            placeholder="검색어를 입력하세요"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="searchInput"
                        />
                        <Button className="searchButton" text="검색" onClick={handleSearchClick} />
                        
                    </div>
                    <div className="count-write">
                        <span className="totalCount">총게시물:{filteredNotices.length}개</span>
                        {memberState === 'ADMIN' && (
                                <Button className="writeButton" text="글쓰기" link="notices/new" />
                        )}
                    </div>
                    <table>
                        
                        <thead className="notice-header">
                            <tr>
                                <td>공지</td>
                                <td>상태</td>
                                <td>제목</td>
                                <td>작성일</td>
                            </tr>
                        </thead>
                        <tbody>
                        {currentNotices.map((notice) => (
                            <tr key={notice.num} className="noticeRow">
                                <td><span className="noticeTag">공지</span></td>
                                <td>{notice.state}</td>
                                <td><Link to={`/notices/${notice.num}`}>{notice.title}</Link></td>
                                <td>{formatDate(notice.date)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <Pagination
                        noticesPerPage={noticesPerPage}
                        totalNotices={filteredNotices.length}
                        paginate={paginate}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>
        </div>
    );
}

export default NoticeList;
