import React from 'react';
import './Sidebar.css'; // 스타일 파일

const Sidebar = () => {
    return (



        <div className="Sidebar-compo">

            <div className='main'>메인</div>
            <ul>
                <li><a href='https://www.naver.com'>메뉴 1</a></li>
                <li><a href='https://www.naver.com'>메뉴 2</a></li>
                <li><a href='https://www.naver.com'>메뉴 3</a></li>
            </ul>
        </div>
    );
}

export default Sidebar;