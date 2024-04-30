import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../Header/Header";
import './NoticeList.css';
import { Link } from "react-router-dom";

function NoticeList() {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        axios.get("/notices")
            .then(res => setNotices(res.data))
            .catch(error => console.error("Error fetching notices:", error));
    }, []);

    return (
        <div>
            <Header />
            <div className="noticeListContainer">
                <div className="noticeList">
                    <h1>공지사항</h1>
                    <Link to="/notices/new" className="writeButton">글쓰기</Link>
                    <table>
                        <thead>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>상태</th>
                            <th>작성일</th>
                        </tr>
                        </thead>
                        <tbody>
                        {notices.map((notice, index) => (
                            <tr key={notice.num}>
                                <td>{index + 1}</td>
                                <td><Link to={`/notices/${notice.num}`}>{notice.title}</Link></td>
                                <td>{notice.state}</td>
                                <td>{notice.date}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default NoticeList;
