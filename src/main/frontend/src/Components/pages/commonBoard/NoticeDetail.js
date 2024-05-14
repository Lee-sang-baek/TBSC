import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./NoticeDetail.css";
import Button from "../../baseComponents/Button";

function NoticeDetail() {
    const { num } = useParams();
    const navigate = useNavigate();
    const [notice, setNotice] = useState(null);
    const MemberState = sessionStorage.getItem("state");

    useEffect(() => {
        const fetchNotice = async () => {
            try {
                const response = await fetch(`/notices/${num}`);
                if (response.ok) {
                    const data = await response.json();
                    setNotice(data);
                } else {
                    console.error("공지사항 조회에 실패했습니다.");
                }
            } catch (error) {
                console.error("서버와의 통신 중 오류가 발생했습니다.", error);
            }
        };

        fetchNotice();
    }, [num]);

    const deleteNotice = async () => {
        const confirmDelete = window.confirm("정말로 이 공지를 삭제하시겠습니까?");
        if (confirmDelete) {
            try {
                const response = await fetch(`/notices/delete/${num}`, {
                    method: "DELETE",
                });
                if (response.ok) {
                    alert("공지사항이 삭제되었습니다.");
                    navigate("/notices");
                } else {
                    const errorText = await response.text();
                    console.error("공지사항 삭제에 실패했습니다.", errorText);
                    alert("공지사항 삭제에 실패했습니다.");
                }
            } catch (error) {
                console.error("서버와의 통신 중 오류가 발생했습니다.", error);
                alert("삭제 중 오류가 발생했습니다.");
            }
        }
    };

    if (!notice) {
        return <div className="loading">로딩 중...</div>;
    }

    const fileName = notice.fileUrl ? notice.fileUrl.split(";").pop() : "";
    const fileDownloadUrl = fileName ? `http://localhost:8090/files/${fileName}` : "";

    return (
        <div className="NoticeDetail-compo">
            <div className="notice-detail">
                <h1 className="title">{notice.title}</h1>
                <div className="meta">
                    <p>작성자: {notice.id}</p>
                    <p>작성일: {new Date(notice.date).toLocaleString()}</p>
                    <p>조회수: {notice.view}</p>
                </div>
                {notice.fileUrl && (
                    <p className="file-link">첨부 파일: <a href={fileDownloadUrl} download>{fileName}</a></p>
                )}
                <div className="content" dangerouslySetInnerHTML={{ __html: notice.content }}></div>
                {MemberState === 'ADMIN' && (
                    <>
                        <Button className="editButton" text="수정하기" link={`/notices/update/${num}`} />
                        <br/>
                        <Button className="deleteButton" text="삭제하기" onClick={deleteNotice} />
                    </>
                )}
            </div>
        </div>
    );
}

export default NoticeDetail;
