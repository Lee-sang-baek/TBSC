import React, { useState } from 'react';
import axios from 'axios';
import './TNoticeForm.css';

const TNoticeForm = ({ memberId, memberState }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);

        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        if (!selectedFile) {
            alert("썸네일 이미지를 넣어주세요.");
            return;
        }
        e.preventDefault();
        const formData = new FormData();
        const id = memberId;
        formData.append('file', selectedFile);
        formData.append('notice', new Blob([JSON.stringify({ title, content, id })], { type: 'application/json' }));

        try {
            await axios.post('/api/tnotice/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setTitle('');
            setContent('');
            setSelectedFile(null);
            setImagePreview(null);
            alert('게시글이 작성되었습니다');
            window.location.href = '/tnotice';
        } catch (error) {
            console.error("There was an error creating the notice!", error);
        }
    };

    if (memberState !== "ADMIN" && memberState !== "COMP") {
        return (
            <div className="TNoticeForm-copo">
                <h2>권한이 없습니다.</h2>
            </div>
        );
    }

    return (
        <div className="TNoticeForm-copo">
            <h3>기업 홍보 게시판</h3>
            <form>
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
                        <img src={imagePreview} alt="Selected Thumbnail" />
                    </div>
                )}
                <label className="file-input-label">
                    썸네일 선택
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                </label>
                <button type="button" onClick={handleSubmit}>글작성</button>
            </form>
        </div>
    );
};

export default TNoticeForm;
