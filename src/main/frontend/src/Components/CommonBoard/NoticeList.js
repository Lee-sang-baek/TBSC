import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../Header/Header";
import './NoticeList.css';
import {Link} from "react-router-dom"; // CSS 파일을 import

function NoticeList() {
    // 공지사항 리스트 상태 변수
    const [notices, setNotices] = useState([]);

    // 공지사항 목록을 가져오는 useEffect
    useEffect(() => {
        axios.get("/notices") // 백엔드 서버 URL에 맞게 수정
            .then(res => setNotices(res.data))
            .catch(error => console.error("Error fetching notices:", error));
    }, []);

    return (
        <div>
            <Header />

        <div className="noticeListContainer">

            {/* 공지사항 목록 표시 */}
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
                    {/* 공지사항 목록을 반복하여 표시 */}
                    {notices.map((notice, num) => (
                        <tr key={notice.num}>
                            <td>{notice.num}</td>
                            <td><Link to={`/notices/${notice.num}`}>{notice.title}</Link></td>
                            <td>{notice.state}</td>
                            <td className="date">{notice.date.split('T')[0]}</td>

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
