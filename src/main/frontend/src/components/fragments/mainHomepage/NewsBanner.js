import React, { useEffect, useState } from 'react';

const NoticeBanner = () => {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await fetch('/banner');
                const data = await response.json();
                setNotices(data?.notices || []); // 데이터가 없는 경우 빈 배열로 설정
            } catch (error) {
                console.error('Error fetching notices:', error);
            }
        };

        fetchNotices();
    }, []);

    return (
        <div className="notice-banner">
            <h1>Notice Banner</h1>
            <ul className="notice-list">
                {notices.map((notice, index) => (
                    <li key={index} className="notice-item">{notice.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default NoticeBanner;
