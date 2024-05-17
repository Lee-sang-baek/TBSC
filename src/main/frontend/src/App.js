import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"; // Routes import 추가
import axios from "axios";
import Header from "./components/fragments/header/Header";
import Footer from "./components/fragments/footer/Footer";
import SignUp from "./components/pages/signUp/SignUp";
import SignUpSelect from "./components/pages/signUp/SignUpSelect";
import LoginForm from "./components/pages/loginForm/LoginForm";
import AdminPage from "./components/pages/admin/AdminPage";
import MemberList from "./components/pages/admin/MemberList";
import SiteManagement from "./components/pages/admin/SiteManagement";
import ReservationConfirmation from "./components/pages/admin/ReservationConfirmation";
import AccessLog from "./components/pages/admin/AccessLog";
import NoticeList from "./components/pages/commonBoard/NoticeList";
import NoticeDetail from "./components/pages/commonBoard/NoticeDetail";
import CreateNotice from "./components/pages/commonBoard/CreateNotice";
import UpdateNotice from "./components/pages/commonBoard/UpdateNotice";
import ModiInfo from "./components/pages/mypage/reservationPage/mypageModify";
import MyHome from "./components/pages/mypage/mypageHome";
import ReservDetails from "./components/pages/mypage/reservationPage/mypageReserv";
import ModiCorp from "./components/pages/mypage/reservationPage/mypageModiCorp";
import CorpInfo from "./components/pages/mypage/reservationPage/mypageCorpInfo";
import CenterIntroduction from "./components/pages/centerIntroduction/CenterIntroduction";
import Rental from "./components/pages/rental/Rental";
import FacilityGuide from "./components/pages/facilityGuide/FacilityGuide";
import ConsultantForm from "./components/pages/consultant/ConsultantForm";
import LogAccess from "./components/util/LogAccess";
import VisualAssetManager from "./components/pages/admin/VisualAssetManager";
import DeleteInfo from "./components/pages/mypage/functionPage/deleteInfo";
import FacilityGuideMain from "./components/pages/facilityGuide/FacilityGuideMain";
import ChatbotToggle from "./components/pages/chatBot/ChatbotToggle";
import TNoticeList from "./components/pages/tnotice/TNoticeList";
import TNoticeForm from "./components/pages/tnotice/TNoticeForm";
import TNoticeDetail from "./components/pages/tnotice/TNoticeDetail";
import TNoticeEdit from "./components/pages/tnotice/TNoticeEdit";
import ReservationList from "./components/pages/reservation/ReservationList";
import ReservationForm from "./components/pages/reservation/ReservationForm";
import ReservationEdit from "./components/pages/reservation/ReservationEdit";
import ReservationDetail from "./components/pages/reservation/ReservationDetail";
import CenterNewsDetail from "./components/pages/centerNews/CenterNewsDetail";
import CenterNewsEdit from "./components/pages/centerNews/CenterNewsEdit";
import CenterNewsForm from "./components/pages/centerNews/CenterNewsForm";
import CenterNewsList from "./components/pages/centerNews/CenterNewsList";
import PressReleaseList from "./components/pages/pressrelease/PressReleaseList";
import PressReleaseForm from "./components/pages/pressrelease/PressReleaseForm";
import PressReleaseEdit from "./components/pages/pressrelease/PressReleaseEdit";
import PressReleaseDetail from "./components/pages/pressrelease/PressReleaseDetail";
import JobConsult from "./components/pages/jobConsult/JobConsult";

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
                <Link to={"/jobConsult"}> [jobConsult] </Link>

            </div>
            <Routes>
                <Route path='/' exact element=""/>
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
                <Route path="/facility" element={<FacilityGuideMain />} />
                <Route path="/myPage" element={<MyHome/>}/>
                <Route path="/myPage/reserve" element={<ReservDetails/>}/>
                <Route path="/myPage/corp-info" element={<CorpInfo/>}/>
                <Route path="/myPage/modify-info" element={<ModiInfo/>}/>
                <Route path="/myPage/modify-corp" element={<ModiCorp/>}/>
                <Route path="/rental" element={<Rental />} />
                <Route path="/consultants" element={<ConsultantForm />} />
                <Route path="/tnotice" element={<TNoticeList />} />
                <Route path="/tnotice/create" element={<TNoticeForm />} />
                <Route path="/tnotice/:num" element={<TNoticeDetail />} />
                <Route path="/tnotice/edit/:num" element={<TNoticeEdit />} />
                <Route path="/reservation" element={<ReservationList />} />
                <Route path="/reservation/create" element={<ReservationForm />} />
                <Route path="/reservation/update/:num" element={<ReservationEdit />} />
                <Route path="/reservation/:num" element={<ReservationDetail />} />
                <Route path="/centernews" element={<CenterNewsList />} />
                <Route path="/centernews/create" element={<CenterNewsForm />} />
                <Route path="/centernews/update/:num" element={<CenterNewsEdit />} />
                <Route path="/centernews/:num" element={<CenterNewsDetail />} />
                <Route path="/pressrelease" element={<PressReleaseList />} />
                <Route path="/pressrelease/create" element={<PressReleaseForm />} />
                <Route path="/pressrelease/update/:num" element={<PressReleaseEdit />} />
                <Route path="/pressrelease/:num" element={<PressReleaseDetail />} />
                <Route path="/myPage/delete-info" element={<DeleteInfo logout={logout} />} />
                <Route path="/addAsset" element={<VisualAssetManager />} />
                <Route path="/jobConsult" element={<JobConsult />} />
            </Routes>
            <ChatbotToggle />
            <Footer />
        </BrowserRouter>
    );
}

export default App;
