import React, { useState } from 'react';
import axios from 'axios';
import './ReservationForm.css';

const ReservationForm = ({ memberId, memberState }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [attachment, setAttachment] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);

        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleAttachmentChange = (e) => {
        setAttachment(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const id = memberId;
        formData.append('reservation', new Blob([JSON.stringify({ title, content, member: { id } })], { type: 'application/json' }));
        if (selectedFile) {
            formData.append('file', selectedFile);
        }
        if (attachment) {
            formData.append('attachment', attachment);
        }

        try {
            await axios.post('/api/reservation/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setTitle('');
            setContent('');
            setSelectedFile(null);
            setAttachment(null);
            setImagePreview(null);
            alert('게시글이 작성되었습니다');
            window.location.href = '/reservation';
        } catch (error) {
            console.error("There was an error creating the reservation!", error);
        }
    };

    if (memberState !== "ADMIN") {
        return (
            <div className="ReservationForm-copo">
                <h2>권한이 없습니다.</h2>
            </div>
        )
    }

    return (
        <div className="ReservationForm-copo">
            <h3>이용 예약 게시글 작성</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="제목"
                    required
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="내용"
                    required
                />
                {imagePreview && (
                    <div className="image-preview">
                        <img src={imagePreview} alt="Selected" />
                    </div>
                )}
                <label className="file-input-label">
                    이미지 선택
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                </label>
                <label className="file-input-label">
                    파일 첨부
                    <input
                        type="file"
                        onChange={handleAttachmentChange}
                        style={{ display: 'none' }}
                    />
                </label>
                <button type="submit">글작성</button>
            </form>
        </div>
    );
};

export default ReservationForm;
