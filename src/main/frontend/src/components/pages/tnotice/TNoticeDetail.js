import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './TNoticeDetail.css';

const TNoticeDetail = ({memberState}) => {
    const { num } = useParams();
    const [notice, setNotice] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchNotice();
    }, []);

    const fetchNotice = async () => {
        try {
            const response = await axios.get(`/tnotice/${num}`);
            setNotice(response.data);
        } catch (error) {
            console.error("에러", error);
        }
    };

    const handleEdit = () => {
        navigate(`/tnotice/edit/${num}`);
    };

    const handleDelete = async () => {
        if (window.confirm("정말로 삭제 하시겠습니까?")) {
            try {
                await axios.delete(`/tnotice/delete/${num}`);
                alert('삭제가 완료되었습니다.');
                navigate('/tnotice');
            } catch (error) {
                console.error("삭제 실패", error);
            }
        }
    };

    if(!notice) {
        return;
    }

    return (
        <div className="TNoticedetail-copo">
            <div className="detail-container">
                <div className="detail-header">
                    <h1>{notice.title}</h1>
                </div>
                <div className="detail-meta">
                    <p><strong>작성자:</strong> {notice.member.id}</p>
                    <p><strong>조회수:</strong> {notice.view}</p>
                    <p>작성일: {new Date(notice.date).toLocaleString()}</p>
                </div>
                <div className="detail-content">
                    <p>{notice.content}</p>
                </div>
                {notice.image && (
                    <div className="detail-image">
                        <img
                            src={`/uploads/${notice.image}`}
                            alt={notice.title}
                        />
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

export default TNoticeDetail;
