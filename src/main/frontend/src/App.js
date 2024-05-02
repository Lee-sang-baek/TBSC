import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'; // Routes import 추가
import Header from './Components/Header/Header';
import SignUp from './Components/Pages/SignUp';
import SignUpSelect from './Components/Pages/SignUpSelect';
import CompSignUp from './Components/Pages/CompSignUp';
import LoginForm from './Components/Pages/LoginForm';
import AdminPage from './Components/Pages/AdminPage';
import MemberList from './Components/Pages/Admin/MemberList';
import SiteManagement from './Components/Pages/Admin/SiteManagement';
import ReservationConfirmation from './Components/Pages/Admin/ReservationConfirmation';
import AccessLog from './Components/Pages/Admin/AccessLog';
import NoticeList from './Components/CommonBoard/NoticeList';
import NoticeDetail from "./Components/CommonBoard/NoticeDetail";
import CreateNotice from "./Components/CommonBoard/CreateNotice";
import UpdateNotice from "./Components/CommonBoard/UpdateNotice";
import {createRoot} from "react-dom/client";
import axios from "axios";

function App() {

    useEffect(() => {
        // 서버에서 렌더링된 HTML 문서에서 CSRF 토큰을 가져오는 로직
        const csrfTokenMeta = document.querySelector("meta[name='_csrf']");

        // CSRF 토큰이 존재하는지 확인 후 요청 헤더에 추가
        if (csrfTokenMeta) {
            const csrfToken = csrfTokenMeta.content;
            axios.defaults.headers.common["X-XSRF-TOKEN"] = csrfToken;
        }
    }, []);

    const logout = () => {
        axios.get('/logout')
        .then(response => {
            console.log(response.data);
        });
        alert("로그아웃 되었습니다.")
        sessionStorage.removeItem("id");
        window.location.reload();
    }

    const create = () => {
        axios.get('/create')
        .then(response => {
            alert(response.data);
        })
    }

    return (
    <BrowserRouter>
        <div>
            <Header />
            <div>
                {!sessionStorage.getItem('id') && <Link to={"/login"}> 로그인 </Link>}
                {sessionStorage.getItem('id') && <a href="#" onClick={logout}> 로그아웃 </a>}
                {!sessionStorage.getItem('id') && <Link to={"/signup"}> 회원가입 </Link>}
                <a href="#" onClick={create}> 어드민생성 </a>
                <Link to={"/admin"}> 관리자페이지 </Link>
            </div>
            <Routes>
                <Route path='/login' element={<LoginForm />} />
                <Route path='/signup' element={<SignUpSelect />} />
                <Route path='/normal-signup' element={<SignUp />} />
                <Route path='/company-signup' element={<CompSignUp />} />
                <Route path='/logout' element={<LoginForm />} />
                <Route path='/admin' element={<AdminPage />} />
                <Route path="/admin/member-list" element={<MemberList />} />
                <Route path="/admin/site-management" element={<SiteManagement />} />
                <Route path="/admin/reservation-confirmation" element={<ReservationConfirmation />} />
                <Route path="/admin/access-log" element={<AccessLog />} />
                <Route path="notices" element={<NoticeList />} />
                <Route path="notices/:num" element={<NoticeDetail />} />
                <Route path="notices/new" element={<CreateNotice />} />
                <Route path="notices/update/:num" element={<UpdateNotice />} />
            </Routes>
        </div>
    </BrowserRouter>
    );
}

export default App;
