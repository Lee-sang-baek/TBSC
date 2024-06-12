import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"; // Axios 임포트 추가
import "./NoticeDetail.css";
import Button from "../../baseComponents/Button";

function NoticeDetail({memberState}) {
    const { num } = useParams();
    const navigate = useNavigate();
    const [notice, setNotice] = useState(null);

    useEffect(() => {
        const fetchNotice = async () => {
            try {
                const response = await fetch(`/api/notices/${num}`);
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
                const response = await fetch(`/api/notices/delete/${num}`, {
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

    const downloadFile = async (fileName) => {
        try {
            const response = await axios.get(`/api/files/${fileName}`, {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("파일 다운로드 중 오류가 발생했습니다.", error);
            alert("파일 다운로드 중 오류가 발생했습니다.");
        }
    };

    if (!notice) {
        return null;
    }

    const fileName = notice.fileUrl ? notice.fileUrl.split(";").pop() : "";

    return (
        <div className="NoticeDetail-compo">
                <h1 className="title">{notice.title}</h1>
                <div className="meta">
                    <p>작성자: {notice.member.id}</p>
                    <p>작성일: {new Date(notice.date).toLocaleString()}</p>
                    <p>조회수: {notice.view}</p>
                    {fileName && (
                        <p className="file-link">첨부 파일: <a href="#" onClick={(e) => { e.preventDefault(); downloadFile(fileName); }}>{fileName}</a></p>
                    )}
                </div>
                <div className="content" dangerouslySetInnerHTML={{ __html: notice.content }}></div>
                <div className="imgWidth">
                    {notice.imageUrl && (
                        <img className="imgWidth" src={`/api/uploads/${notice.imageUrl}`} alt={notice.imageUrl} />
                    )}
                </div>
                {memberState === 'ADMIN' && (
                    <div className="btn-box">
                        <button className="btns" link={`/notices/update/${num}`}>수정하기</button>
                        <button className="btns" onClick={deleteNotice}>삭제하기</button>
                    </div>
                )}
        </div>
    );
}

export default NoticeDetail;
