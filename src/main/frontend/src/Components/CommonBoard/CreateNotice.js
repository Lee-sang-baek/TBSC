import React, { useState } from 'react';
import axios from 'axios';

function CreateNotice() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [state, setState] = useState('Active');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const currentDate = new Date().toISOString(); // 현재 날짜를 ISO 형식으로 변환
        const noticeData = {
            title: title,
            content: content,
            state: state,
            view: 0, // 초기값 설정
            date: currentDate // 현재 날짜 추가
        };

        try {
            const response = await axios.post('/notices/create', noticeData);
            console.log('Notice created:', response.data);
            window.location.href = '/notices'; // 성공적으로 생성되면 홈페이지로 이동
        } catch (error) {
            console.error('Error creating notice:', error);
        }
    };

    return (
        <div>
            <h1>글쓰기</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">제목</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="content">내용</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <div>
                    <label>상태</label>
                    <div>
                        <input
                            type="radio"
                            id="active"
                            value="Active"
                            checked={state === 'Active'}
                            onChange={() => setState('Active')}
                        />
                        <label htmlFor="active">Active</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="inactive"
                            value="Inactive"
                            checked={state === 'Inactive'}
                            onChange={() => setState('Inactive')}
                        />
                        <label htmlFor="inactive">Inactive</label>
                    </div>
                </div>
                <button type="submit">제출</button>
            </form>
        </div>
    );
}

export default CreateNotice;
