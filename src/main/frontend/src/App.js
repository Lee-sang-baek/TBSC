import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'; // Routes import 추가
import Header from './Components/Header/Header';
import SignUp from './Components/Pages/SignUp';
import LoginForm from './Components/Pages/LoginForm';
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

    return (
    <BrowserRouter>
        <div>
            <Header />
            <div>
                {!sessionStorage.getItem('id') && <Link to={"/login"}> 로그인 </Link>}
                {sessionStorage.getItem('id') && <a href="#" onClick={logout}> 로그아웃 </a>}
                {!sessionStorage.getItem('id') && <Link to={"/signup"}> 회원가입 </Link>}
            </div>
            <Routes>
                <Route path='/login' element={<LoginForm />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/logout' element={<LoginForm />} />
            </Routes>
        </div>
    </BrowserRouter>
    );
}

export default App;
