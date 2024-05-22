import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './CenterNewsDetail.css';

const CenterNewsDetail = () => {
    const { num } = useParams();
    const [centerNews, setCenterNews] = useState(null);
    const navigate = useNavigate();
    const MemberState = sessionStorage.getItem("state");

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
                </div>
                <div className="detail-content">
                    <p>{centerNews.content}</p>
                </div>
                {centerNews.image && (
                    <div className="detail-image">
                        <img src={`/uploads/${centerNews.image}`} alt={centerNews.title} />
                    </div>
                )}
                {centerNews.fileUrl && (
                    <div className="file-download">
                        <a href={`http://localhost:8090/files/${centerNews.fileUrl}`} download>{centerNews.fileUrl}</a>
                    </div>
                )}
                {MemberState === "ADMIN" && (
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
