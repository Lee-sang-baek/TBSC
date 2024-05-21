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
import ModiInfo from "./components/pages/mypage/reservationPage/MypageModify";
import MyHome from "./components/pages/mypage/MypageHome";
import ReservDetails from "./components/pages/mypage/reservationPage/MypageReserv";
import ModiCorp from "./components/pages/mypage/reservationPage/MypageModiCorp";
import CorpInfo from "./components/pages/mypage/reservationPage/MypageCorpInfo";
import CenterIntroduction from "./components/pages/centerIntroduction/CenterIntroduction";
import Rental from "./components/pages/rental/Rental";
import FacilityGuide from "./components/pages/facilityGuide/FacilityGuide";
import ConsultantForm from "./components/pages/consultant/ConsultantForm";
import LogAccess from "./components/util/LogAccess";
import VisualAssetManager from "./components/pages/admin/VisualAssetManager";
import DeleteInfo from "./components/pages/mypage/functionPage/DeleteInfo";
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
import ModifyReserv from "./components/pages/mypage/functionPage/ModifyReserv";
import JobConsult from "./components/pages/jobConsult/JobConsult";
import MainHomepage from "./components/fragments/mainHomepage/MainHomepage";
import Sidebar from "./components/fragments/sidebar/Sidebar";
import SearchResult from "./components/pages/search/SearchResult";


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



    return (

        <BrowserRouter>
        <div className="main">
            <LogAccess />
            <Header />

            <Routes>
                <Route path='/' exact element={<MainHomepage />}/>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<SignUpSelect />} />
                <Route path="/signup/normal" element={<SignUp isComp={false} />} />
                <Route path="/signup/company" element={<SignUp isComp={true} />} />
                <Route path="/logout" element={<LoginForm />} />

                <Route path="/admin" element={
                    <div className="outter">
                        <Sidebar type="admin" />
                        <AdminPage />
                    </div>
                } />
                <Route path="/admin/member-list" element={
                    <div className="outter">
                        <Sidebar type="admin" />
                        <MemberList />
                    </div>
                } />
                <Route path="/admin/site-management" element={
                    <div className="outter">
                        <Sidebar type="admin" />
                        <SiteManagement />
                    </div>
                } />
                <Route path="/admin/reservation-confirmation" element={
                    <div className="outter">
                        <Sidebar type="admin" />
                        <ReservationConfirmation />
                    </div>
                } />
                <Route path="/admin/access-log" element={
                    <div className="outter">
                        <Sidebar type="admin" />
                        <AccessLog />
                    </div>
                } />


                <Route path="/myPage" element={
                    <div className="outter">
                        <Sidebar type="mypage" />
                        <MyHome/>
                    </div>
                }/>
                <Route path="/myPage/reserve" element={
                    <div className="outter">
                        <Sidebar type="mypage" />
                        <ReservDetails/>
                    </div>
                }/>
                <Route path="/myPage/corp-info" element={
                    <div className="outter">
                        <Sidebar type="mypage" />
                        <CorpInfo/>
                    </div>
                }/>
                <Route path="/myPage/modify-info" element={
                    <div className="outter">
                        <Sidebar type="mypage" />
                        <ModiInfo/>
                    </div>
                }/>
                <Route path="/myPage/modify-corp" element={
                    <div className="outter">
                        <Sidebar type="mypage" />
                        <ModiCorp/>
                    </div>
                }/>
                <Route path="/myPage/delete-info" element={
                    <div className="outter">
                    <Sidebar type="mypage" />
                <DeleteInfo logout={logout} />
                </div>
                } />

                <Route path="/centerIntro" element={
                    <div className="outter">
                        <Sidebar type="center" />
                        <CenterIntroduction />
                    </div>
                } />
                <Route path="/facility" element={
                    <div className="outter">
                        <Sidebar type="center" />
                        <FacilityGuideMain />
                    </div>
                } />

                <Route path="/tnotice" element={
                    <div className="outter">
                        <Sidebar type="comp" />
                        <TNoticeList />
                    </div>
                } />
                <Route path="/tnotice/create" element={
                    <div className="outter">
                        <Sidebar type="comp" />
                        <TNoticeForm />
                    </div>
                } />
                <Route path="/tnotice/:num" element={
                    <div className="outter">
                        <Sidebar type="comp" />
                        <TNoticeDetail />
                    </div>
                } />
                <Route path="/tnotice/edit/:num" element={
                    <div className="outter">
                        <Sidebar type="comp" />
                        <TNoticeEdit />
                    </div>
                } />


                <Route path="/notices" element={
                    <div className="outter">
                        <Sidebar type="notices" />
                        <NoticeList />
                    </div>
                } />
                <Route path="/notices/:num" element={
                    <div className="outter">
                        <Sidebar type="notices" />
                        <NoticeDetail />
                    </div>
                } />
                <Route path="/notices/new" element={
                    <div className="outter">
                        <Sidebar type="notices" />
                        <CreateNotice />
                    </div>
                } />
                <Route path="/notices/update/:num" element={
                    <div className="outter">
                        <Sidebar type="notices" />
                        <UpdateNotice />
                    </div>
                } />

                <Route path="/centernews" element={
                    <div className="outter">
                        <Sidebar type="notices" />
                        <CenterNewsList />
                    </div>
                } />
                <Route path="/centernews/create" element={
                    <div className="outter">
                        <Sidebar type="notices" />
                        <CenterNewsForm />
                    </div>
                } />
                <Route path="/centernews/update/:num" element={
                    <div className="outter">
                        <Sidebar type="notices" />
                        <CenterNewsEdit />
                    </div>
                } />
                <Route path="/centernews/:num" element={
                    <div className="outter">
                        <Sidebar type="notices" />
                        <CenterNewsDetail />
                    </div>
                } />

                <Route path="/pressrelease" element={
                    <div className="outter">
                    <Sidebar type="notices" />
                        <PressReleaseList />
                        </div>
                } />
                <Route path="/pressrelease/create" element={
                    <div className="outter">
                        <Sidebar type="notices" />
                        <PressReleaseForm />
                    </div>
                } />
                <Route path="/pressrelease/update/:num" element={
                    <div className="outter">
                        <Sidebar type="notices" />
                        <PressReleaseEdit />
                        </div>
                } />
                <Route path="/pressrelease/:num" element={
                    <div className="outter">
                        <Sidebar type="notices" />
                        <PressReleaseDetail />
                    </div>
                } />


                <Route path="/rental" element={
                    <div className="outter">
                        <Sidebar type="reserve" />
                        <Rental />
                    </div>
                } />

                <Route path="/consultants" element={
                    <div className="outter">
                        <Sidebar type="reserve" />
                        <ConsultantForm />
                    </div>
                } />

                <Route path="/reservation" element={
                    <div className="outter">
                    <Sidebar type="reserve" />
                <ReservationList />
                </div>
                } />
                <Route path="/reservation/create" element={
                    <div className="outter">
                    <Sidebar type="reserve" />
                <ReservationForm />
                </div>
                } />
                <Route path="/reservation/update/:num" element={
                    <div className="outter">
                    <Sidebar type="reserve" />
                <ReservationEdit />
                </div>
                } />
                <Route path="/reservation/:num" element={
                    <div className="outter">
                    <Sidebar type="reserve" />
                <ReservationDetail />
                </div>
                } />

                <Route path="/jobConsult" element={
                <div className="outter">
                <Sidebar type="reserve" />
                <JobConsult />
                </div>
                } />
                <Route path="/search-results" element={
                <div className="outter">
                <Sidebar type="reserve" />
                <SearchResult />
                </div>
                }/>

                <Route path="/addAsset" element={<VisualAssetManager />} />

            </Routes>
            <ChatbotToggle />
            </div>
            <Footer />
        </BrowserRouter>

    );
}

export default App;
