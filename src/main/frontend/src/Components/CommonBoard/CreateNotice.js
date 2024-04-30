import React, { useState } from 'react';
import CustomEditor from './CustomEditor';
import './CreateNotice.css';
import Header from "../Header/Header"; // 추가된 CSS 파일을 불러옵니다.

function CreateNotice() {
    const [title, setTitle] = useState('');
    const [id, setId] = useState('');
    const [state, setState] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState(new Date());

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleIdChange = (e) => {
        setId(e.target.value);
    };

    const handleStateChange = (e) => {
        setState(e.target.value);
    };

    const handleContentChange = (content) => {
        setContent(content);
    };

    const handleSubmit = async () => {
        const data = {
            title: title,
            id: id,
            state: state,
            content: content,
            date: date
        };

        try {
            const response = await fetch('/notices/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                console.log('게시글이 성공적으로 작성되었습니다.');
                // 작성 성공 시 /notices로 이동
                window.location.href = '/notices';
            } else {
                console.error('게시글 작성에 실패했습니다.');
            }
        } catch (error) {
            console.error('서버와의 통신 중 오류가 발생했습니다.', error);
        }
    };


    return (
        <div>
            <Header />
            <div className="create-notice-container">
                <div className="form-group">
                    <label>제목:</label>
                    <input type="text" value={title} onChange={handleTitleChange}/>
                </div>
                <div className="form-group">
                    <label>작성자:</label>
                    <input type="text" value={id} onChange={handleIdChange}/>
                </div>
                <div className="form-group">
                    <label>진행중:</label>
                    <input type="radio" name="state" value="진행중" checked={state === "진행중"} onChange={handleStateChange}/>
                    <label>마감:</label>
                    <input type="radio" name="state" value="마감" checked={state === "마감"} onChange={handleStateChange}/>
                </div>

                <CustomEditor handleContentChange={handleContentChange}/>
                <button onClick={handleSubmit}>작성</button>
            </div>
        </div>
    );
}

export default CreateNotice;
