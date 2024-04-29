import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from "../Header/Header";

function NoticeDetail() {
    const { id } = useParams(); // URL 파라미터에서 게시물 번호 가져오기

    // 게시물 상세 정보를 담을 상태 변수
    const [notice, setNotice] = useState(null);

    // 게시물 상세 정보 가져오는 useEffect
    useEffect(() => {
        axios.get(`/notices/${id}`) // 게시물 번호에 해당하는 정보 가져오기
            .then(res => setNotice(res.data))
            .catch(error => console.error("Error fetching notice detail:", error));
    }, [id]);

    return (
        <div>
            <Header />
            {/* 게시물 상세 정보 표시 */}
            {notice && (
                <div className="noticeDetail">
                    <h2>{notice.title}</h2>
                    <p>작성자: {notice.id}</p>
                    <p>작성일: {notice.date}</p>
                    <p>조회수: {notice.view}</p>
                    <hr />
                    <p>{notice.content}</p>
                </div>
            )}
        </div>
    );
}

export default NoticeDetail;
