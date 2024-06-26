import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useParams, useNavigate, Link} from 'react-router-dom';
import './ReservationDetail.css';

const ReservationDetail = ({memberState}) => {
    const { num } = useParams();
    const [reservation, setReservation] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchReservation();
    }, []);

    const fetchReservation = async () => {
        try {
            const response = await axios.get(`/api/reservation/${num}`);
            setReservation(response.data);
        } catch (error) {
            console.error("에러", error);
        }
    };

    // const handleEdit = () => {
    //     navigate(`/reservation/update/${num}`);
    // };

    const handleDelete = async () => {
        if (window.confirm("정말로 삭제 하시겠습니까?")) {
            try {
                await axios.delete(`/api/reservation/delete/${num}`);
                alert('삭제가 완료되었습니다.');
                navigate('/reservation');
            } catch (error) {
                console.error("삭제 실패", error);
            }
        }
    };

    if (!reservation) {
        return;
    }

    return (
        <div className="ReservationDetail-copo">
            <div className="detail-container">
                <div className="detail-header">
                    <h1>{reservation.title}</h1>
                </div>
                <div className="detail-meta">
                    <p><strong>작성자:</strong> {reservation.member.id}</p> {/* Adjusted here */}
                    <p><strong>조회수:</strong> {reservation.view}</p>
                    <p>작성일: {new Date(reservation.date).toLocaleString()}</p>
                </div>
                <div className="detail-content">
                    <p>{reservation.content}</p>
                </div>
                {reservation.image && (
                    <div className="detail-image">
                        <img src={`/api/uploads/${reservation.image}`} alt={reservation.title} />
                    </div>
                )}
                {reservation.fileUrl && (
                    <div className="file-download">
                        <a href={`/files/${reservation.fileUrl}`} download>첨부파일 다운로드</a>
                    </div>
                )}
                {memberState === "ADMIN" && (
                    <div className="detail-actions">
                        <Link to={`/reservation/update/${num}`}>
                            <button type="button">수정</button>
                        </Link>
                        <button onClick={handleDelete}>삭제</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReservationDetail;
