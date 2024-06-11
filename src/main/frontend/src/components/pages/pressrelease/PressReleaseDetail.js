import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './PressReleaseDetail.css';

const PressReleaseDetail = ({memberState}) => {
    const { num } = useParams();
    const [pressRelease, setPressRelease] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPressRelease();
    }, []);

    const fetchPressRelease = async () => {
        try {
            const response = await axios.get(`/pressrelease/${num}`);
            setPressRelease(response.data);
        } catch (error) {
            console.error("에러", error);
        }
    };

    const handleEdit = () => {
        navigate(`/pressrelease/update/${num}`);
    };

    const handleDelete = async () => {
        if (window.confirm("정말로 삭제 하시겠습니까?")) {
            try {
                await axios.delete(`/pressrelease/delete/${num}`);
                alert('삭제가 완료되었습니다.');
                navigate('/pressrelease');
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

    if (!pressRelease) {
        return null;
    }

    const fileName = pressRelease.fileUrl ? pressRelease.fileUrl.split(";").pop() : "";

    return (
        <div className="PressReleaseDetail-copo">
            <div className="detail-container">
                <div className="detail-header">
                    <h1>{pressRelease.title}</h1>
                </div>
                <div className="detail-meta">
                    <p><strong>작성자:</strong> {pressRelease.member.id}</p>
                    <p><strong>조회수:</strong> {pressRelease.view}</p>
                    <p>작성일: {new Date(pressRelease.date).toLocaleString()}</p>
                    {fileName && (
                        <div className="file-download">
                            첨부파일:<a href="#" onClick={(e) => { e.preventDefault(); downloadFile(fileName); }}>{fileName}</a>
                        </div>
                    )}
                </div>
                <div className="detail-content">
                    <p>{pressRelease.content}</p>
                </div>
                {pressRelease.image && (
                    <div className="detail-image">
                        <img src={`/uploads/${pressRelease.image}`} alt={pressRelease.title} />
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

export default PressReleaseDetail;
