import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './CenterNewsDetail.css';

const CenterNewsDetail = ({memberState}) => {
    const { num } = useParams();
    const [centerNews, setCenterNews] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCenterNews();
    }, []);

    const fetchCenterNews = async () => {
        try {
            const response = await axios.get(`/centernews/${num}`);
            setCenterNews(response.data);
        } catch (error) {
            console.error("에러", error);
        }
    };

    const handleEdit = () => {
        navigate(`/centernews/update/${num}`);
    };

    const handleDelete = async () => {
        if (window.confirm("정말로 삭제 하시겠습니까?")) {
            try {
                await axios.delete(`/centernews/delete/${num}`);
                alert('삭제가 완료되었습니다.');
                navigate('/centernews');
            } catch (error) {
                console.error("삭제 실패", error);
            }
        }
    };

    const downloadFile = async (fileName) => {
        try {
            const response = await axios.get(`/files/${fileName}`, {
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

    if (!centerNews) {
        return null;
    }

    const fileName = centerNews.fileUrl ? centerNews.fileUrl.split(";").pop() : "";

    return (
        <div className="CenterNewsDetail-copo">
            <div className="detail-container">
                <div className="detail-header">
                    <h1>{centerNews.title}</h1>
                </div>
                <div className="detail-meta">
                    <p><strong>작성자:</strong> {centerNews.member.id}</p>
                    <p><strong>조회수:</strong> {centerNews.view}</p>
                    <p>작성일: {new Date(centerNews.date).toLocaleString()}</p>
                    {fileName && (
                        <div className="file-download">
                           첨부파일: <a href="#" onClick={(e) => { e.preventDefault(); downloadFile(fileName); }}>{fileName}</a>
                        </div>
                    )}
                </div>
                <div className="detail-content">
                    <p>{centerNews.content}</p>
                </div>
                {centerNews.image && (
                    <div className="detail-image">
                        <img src={`/uploads/${centerNews.image}`} alt={centerNews.title} />
                    </div>
                )}

                {memberState === "ADMIN" && (
                    <div className="detail-actions">
                        <button onClick={handleEdit}>수정</button>
                        <button onClick={handleDelete}>삭제</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CenterNewsDetail;
