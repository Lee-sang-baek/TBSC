import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './TNoticeEdit.css';

const TNoticeEdit = ({memberState}) => {
    const { num } = useParams();
    const [notice, setNotice] = useState({
        title: '',
        content: '',
        image: null
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchNotice();
    }, []);

    const fetchNotice = async () => {
        try {
            const response = await axios.get(`/tnotice/${num}`);
            setNotice(response.data);
        } catch (error) {
            console.error("There was an error fetching the notice!", error);
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNotice({
            ...notice,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('notice', new Blob([JSON.stringify(notice)], { type: 'application/json' }));
        if (selectedFile) {
            formData.append('file', selectedFile);
        }

        try {
            await axios.put(`/tnotice/update/${num}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('게시글이 수정되었습니다');
            navigate(`/tnotice/${num}`);
        } catch (error) {
            console.error("There was an error updating the notice!", error);
            alert('수정 중 오류가 발생했습니다. 다시 시도해 주세요.');
        }
    };


    if (memberState !== "ADMIN") {
        return (
            <div className="TNoticeForm-copo">
                <h2>권한이 없습니다</h2>
            </div>
        );
    }

    return (
        <div className="TNoticeEdit-copo">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={notice.title}
                    onChange={handleChange}
                    placeholder="Title"
                    required
                />
                <textarea
                    name="content"
                    value={notice.content}
                    onChange={handleChange}
                    placeholder="Content"
                    required
                />
                {notice.image && (
                    <div className="detail-image">
                        <img
                            src={`/uploads/${notice.image}`}
                            alt={notice.title}
                        />
                    </div>
                )}
                <label className="file-input-label">
                    썸네일 변경
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                </label>
                <button type="submit">수정</button>
            </form>
        </div>
    );
};

export default TNoticeEdit;
