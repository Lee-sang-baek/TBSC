import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './NoticeDetail.css';
import Header from "../Header/Header"; // CSS 파일을 import합니다.

function NoticeDetail() {
    const { num } = useParams(); // 게시글 번호를 URL 파라미터로부터 가져옵니다.
    const [notice, setNotice] = useState(null);

    useEffect(() => {
        const fetchNotice = async () => {
            try {
                const response = await fetch(`/notices/${num}`);
                if (response.ok) {
                    const data = await response.json();
                    setNotice(data);
                } else {
                    console.error('게시글 조회에 실패했습니다.');
                }
            } catch (error) {
                console.error('서버와의 통신 중 오류가 발생했습니다.', error);
            }
        };

        fetchNotice();

        // cleanup 함수
        return () => {
            // 이펙트의 정리(clean-up) 작업을 수행할 수 있습니다.
        };
    }, [num]); // num이 변경될 때마다 useEffect가 실행됩니다.

    if (!notice) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
            <div className="notice-detail">
                <h2>{notice.title}</h2>
                <p>작성자: {notice.id}</p>
                <p>상태: {notice.state}</p>
                <p>작성일자: {new Date(notice.date).toLocaleDateString()}</p>
                <div className="content" dangerouslySetInnerHTML={{ __html: notice.content }}></div>
            </div>
        </div>

    );
}

export default NoticeDetail;
