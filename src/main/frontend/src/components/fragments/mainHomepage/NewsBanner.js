import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewsBanner.css';

const NewsBanner = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get('/api/news')
      .then(response => {
        setNews(response.data);
      })
      .catch(error => {
        console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
      });
  }, []);

  return (
    <div className="Notice-compo">
      <div className="news">
        <div className="background">
          <div className="title">
           <h3>뉴스</h3>
             <div className='write'>

              <ul>
              <li>공지사항</li>
               <li>센터 소식</li>
                <li>보도 자료</li>
                 </ul>
                 </div>

          </div>
        </div>
      </div>
      <div className="content">
        {news.map(item => (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsBanner;
