import React from 'react';
import './Sidebar.css'; // 스타일 파일

const Sidebar = () => {
    return (



        <div className="Sidebar-compo">

            <div className='main'>

                <a href='http://localhost:3000/myhome'>메인페이지</a>

            </div>
            <div className='list'>
            <ul>
                <li><a href='http://localhost:3000/modiinfo'>개인 정보 수정</a></li>
                <li><a href='http://localhost:3000/reserv'>예약 내역</a></li>
                <li><a href='https://www.naver.com'>회원 탈퇴</a></li>
            </ul>
            </div>
            <div className='main'>기업 회원 페이지</div>
            <div className='list'>
             <ul>
             <li><a href='http://localhost:3000/corpinfo?'>등록 기업 정보</a></li>
             </ul>
        </div>
        </div>
    );
}

export default Sidebar;