import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './CenterNewsForm.css';

const CenterNewsEdit = ({memberState}) => {
    const { num } = useParams();
    const [centerNews, setCenterNews] = useState({
        title: '',
        content: '',
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [attachment, setAttachment] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCenterNews();
    }, []);

    const fetchCenterNews = async () => {
        try {
            const response = await axios.get(`/api/centernews/${num}`);
            setCenterNews(response.data);
            if (response.data.image) {
                setImagePreview(`/api/uploads/${response.data.image}`);
            }
        } catch (error) {
            console.error("There was an error fetching the centerNews!", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCenterNews({
            ...centerNews,
            [name]: value
        });
    };

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
        formData.append('centerNews', new Blob([JSON.stringify(centerNews)], { type: 'application/json' }));
        if (selectedFile) {
            formData.append('file', selectedFile);
        }
        if (attachment) {
            formData.append('attachment', attachment);
        }

        try {
            await axios.put(`/api/centernews/update/${num}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('게시글이 수정되었습니다');
            navigate(`/centernews/${num}`);
        } catch (error) {
            console.error("There was an error updating the centerNews!", error);
            alert('수정 중 오류가 발생했습니다. 다시 시도해 주세요.');
        }
    };

    // Check if the user is an ADMIN
    if (memberState !== "ADMIN") {
        return (
            <div className="CenterNewsForm-copo">
                <h2>권한이 없습니다</h2>
            </div>
        );
    }

    return (
        <div className="CenterNewsForm-copo">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={centerNews.title}
                    onChange={handleChange}
                    placeholder="제목"
                    required
                />
                <textarea
                    name="content"
                    value={centerNews.content}
                    onChange={handleChange}
                    placeholder="내용"
                    required
                />
                {imagePreview && (
                    <div className="image-preview">
                        <img src={imagePreview} alt="Selected" />
                    </div>
                )}
                <label className="file-input-label">
                    이미지 변경
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                </label>
                <label className="file-input-label">
                    파일 첨부 변경
                    <input
                        type="file"
                        onChange={handleAttachmentChange}
                        style={{ display: 'none' }}
                    />
                </label>
                <button type="submit">수정</button>
            </form>
        </div>
    );
};

export default CenterNewsEdit;
