import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./NoticeDetail.css";
import Header from "../../Fragments/Header/Header";

function NoticeDetail() {
    const { num } = useParams();
    const [notice, setNotice] = useState(null);

    useEffect(() => {
        const fetchNotice = async () => {
            try {
                const response = await fetch(`/notices/${num}`);
                if (response.ok) {
                    const data = await response.json();
                    setNotice(data);
                } else {
                    console.error("게시글 조회에 실패했습니다.");
                }
            } catch (error) {
                console.error("서버와의 통신 중 오류가 발생했습니다.", error);
            }
        };

        fetchNotice();
    }, [num]);

    if (!notice) {
        return <div>Loading...</div>;
    }

    const fileName = notice.fileUrl.split(";").pop(); // 파일 경로에서 파일 이름만 추출
    const fileDownloadUrl = fileName ? `http://localhost:8090/files/${fileName}` : "";

    return (
        <div>
            <Header />
            <div className="notice-detail">
                <h1>{notice.title}</h1>
                <p>작성자: {notice.id}</p>
                <p>작성일: {new Date(notice.date).toLocaleString()}</p>
                <p>조회수: {notice.view}</p>
                {notice.fileUrl && (
                    <p>첨부 파일: <a href={fileDownloadUrl} download>다운로드</a></p>
                )}
                <div className="content" dangerouslySetInnerHTML={{ __html: notice.content }}></div>
                {/* Link 컴포넌트를 사용하여 수정 페이지로 이동 */}
                <Link to={`/notices/update/${num}`} className="edit-button">수정하기</Link>
            </div>
        </div>
    );
}

export default NoticeDetail;
