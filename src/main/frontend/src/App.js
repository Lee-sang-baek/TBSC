import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"; // Routes import 추가
import {createRoot} from "react-dom/client";
import axios from "axios";
import Header from "./Components/Fragments/Header/Header";
import Sidebar from "./Components/Fragments/Sidebar/Sidebar";
import Footer from "./Components/Fragments/Footer/Footer";
import SignUp from "./Components/Pages/SignUp/SignUp";
import SignUpSelect from "./Components/Pages/SignUp/SignUpSelect";
import LoginForm from "./Components/Pages/LoginForm/LoginForm";
import AdminPage from "./Components/Pages/Admin/AdminPage";
import MemberList from "./Components/Pages/Admin/MemberList";
import SiteManagement from "./Components/Pages/Admin/SiteManagement";
import ReservationConfirmation from "./Components/Pages/Admin/ReservationConfirmation";
import AccessLog from "./Components/Pages/Admin/AccessLog";
import NoticeList from "./Components/Pages/CommonBoard/NoticeList";
import NoticeDetail from "./Components/Pages/CommonBoard/NoticeDetail";
import CreateNotice from "./Components/Pages/CommonBoard/CreateNotice";
import UpdateNotice from "./Components/Pages/CommonBoard/UpdateNotice";
import Form from "./Components/Util/Map/Form";
import ModiInfo from "./Components/Pages/mypage/ReservationPage/mypageModify";
import MyHome from "./Components/Pages/mypage/mypageHome";
import ReservDetails from "./Components/Pages/mypage/ReservationPage/mypageReserv";
import ModiCorp from "./Components/Pages/mypage/ReservationPage/mypageModiCorp";
import CorpInfo from "./Components/Pages/mypage/ReservationPage/mypageCorpInfo";
import CenterIntroduction from "./Components/Pages/CenterIntroduction/CenterIntroduction";
import Rental from "./Components/Pages/Rental/Rental";
import FacilityGuideMain from "./Components/Pages/FacilityGuide/FacilityGuideMain";
import FacilityGuide from "./Components/Pages/FacilityGuide/FacilityGuide";
import ConsultantForm from "./Components/Pages/Consultant/ConsultantForm";
import LogAccess from "./Components/Util/LogAccess";
//import Verification from "./Components/Auth/Verification";

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
        axios.get("/logout")
        .then(response => {
            console.log(response.data);
        });
        alert("로그아웃 되었습니다.")
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("state");
        window.location.reload();
    }

    const create = () => {
        axios.get("/create")
        .then(response => {
            alert(response.data);
        })
    }

    return (
    <BrowserRouter>
        <LogAccess />
            <Header />
            <div>
                {!sessionStorage.getItem("id") && <Link to={"/login"}> [로그인] </Link>}
                {sessionStorage.getItem("id") && <a href="#" onClick={logout}> [로그아웃] </a>}
                {!sessionStorage.getItem("id") && <Link to={"/signup"}> [회원가입] </Link>}
                <a href="#" onClick={create}> [어드민생성] </a>
                <Link to={"/admin"}> [관리자페이지] </Link>
                <Link to={"/myPage"}> [마이홈] </Link>
                <Link to={"/myPage/reserve"}> [예약] </Link>
                <Link to={"/myPage/corp-info"}> [등록기업정보] </Link>
                <Link to={"/myPage/modify-info"}> [개인정보수정] </Link>
                <Link to={"/centerIntro"}> [센터 소개] </Link>
                <Link to={"/facility"}> [시설 안내] </Link>
                <Link to={"/notices"}> [공지사항] </Link>
            </div>
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<SignUpSelect />} />
                <Route path="/signup/normal" element={<SignUp isComp={false} />} />
                <Route path="/signup/company" element={<SignUp isComp={true} />} />
                <Route path="/logout" element={<LoginForm />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/member-list" element={<MemberList />} />
                <Route path="/admin/site-management" element={<SiteManagement />} />
                <Route path="/admin/reservation-confirmation" element={<ReservationConfirmation />} />
                <Route path="/admin/access-log" element={<AccessLog />} />
                <Route path="/notices" element={<NoticeList />} />
                <Route path="/centerIntro" element={<CenterIntroduction />} />
                <Route path="/notices/:num" element={<NoticeDetail />} />
                <Route path="/notices/new" element={<CreateNotice />} />
                <Route path="/notices/update/:num" element={<UpdateNotice />} />
                <Route path="/facility" element={<FacilityGuide />} />
                <Route path="/myPage" element={<MyHome/>}/>
                <Route path="/myPage/reserve" element={<ReservDetails/>}/>
                <Route path="/myPage/corp-info" element={<CorpInfo/>}/>
                <Route path="/myPage/modify-info" element={<ModiInfo/>}/>
                <Route path="/myPage/modify-corp" element={<ModiCorp/>}/>
                <Route path="/rental" element={<Rental />} />
                <Route path="/consultants" element={<ConsultantForm />} />
            </Routes>
            <Footer />
    </BrowserRouter>
    );
}

export default App;
