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
import CompIntroPage from "./components/pages/compIntro/CompIntroPage";
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
import ModifyConsultant from "./components/pages/mypage/functionPage/ModifyConsultant";
import ModifyJobConsult from "./components/pages/mypage/functionPage/ModifyJobConsult";
import JobConsult from "./components/pages/jobConsult/JobConsult";
import MainHomepage from "./components/fragments/mainHomepage/MainHomepage";
import Sidebar from "./components/fragments/sidebar/Sidebar";
import SearchResult from "./components/pages/search/SearchResult";
import Startup from "./components/pages/explainpage/Startup";
import Educonsult from "./components/pages/explainpage/Educonsult";
import Tourism from "./components/pages/explainpage/Tourism";
import OrgChart from "./components/pages/orgChart/OrgChart";
import WayToCome from "./components/pages/wayToCome/WayToCome";
import FindId from "./components/pages/find/FindId";
import FindPwd from "./components/pages/find/FindPwd";
import MemberManagement from "./components/pages/admin/MemberManagement";
import BusinessUpgrade from "./components/pages/mypage/businessUpgrade/BusinessUpgrade";
import ReserveForm from "./components/baseComponents/ReserveForm";

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

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [memberId, setMemberId] = useState("");
    const [memberState, setMemberState] = useState("");

    useEffect(() => {
        const checkLoginStatus = async () => {
            console.log("check");
            try {
                const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰을 가져옴
                if (token) {
                    // 토큰이 존재하면 로그인 상태로 설정
                    setIsLoggedIn(true);
                    axios.all([
                        axios.get("/state", { headers: { 'Authorization': 'Bearer ' + token } }),
                        axios.get("/id", { headers: { 'Authorization': 'Bearer ' + token } })
                    ])
                    .then(axios.spread((stateRes, idRes) => {
                        setMemberState(stateRes.data);
                        setMemberId(idRes.data);
                    }))
                    .catch((err) => {
                        console.error("요청 중 에러: ", err);
                    });
                }
            } catch (error) {
                console.error("로그인 상태 확인 중 에러: ", error);
            }
        };
        checkLoginStatus();
    }, [isLoggedIn]);

    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     if (token) {
    //         axios.all([
    //             axios.get("/state", { headers: { 'Authorization': 'Bearer ' + token } }),
    //             axios.get("/id", { headers: { 'Authorization': 'Bearer ' + token } })
    //         ])
    //         .then(axios.spread((stateRes, idRes) => {
    //             setMemberState(stateRes.data);
    //             setMemberId(idRes.data);
    //         }))
    //         .catch((err) => {
    //             console.error("요청 중 에러: ", err);
    //         });
    //     } else {
    //         console.error("토큰이 없습니다.");
    //     }
    // }, [isLoggedIn]);

    const logout = async () => {
        try {
            localStorage.removeItem("token"); // 로컬 스토리지에서 토큰을 제거
            setIsLoggedIn(false);
            setMemberId("");
            setMemberState("");
            alert("로그아웃 되었습니다.");
            window.location.reload();
        } catch (error) {
            console.error("로그아웃 중 에러 발생:", error);
        }
    }


    return (

        <BrowserRouter>
            <div className="main">
                <LogAccess/>
                <Header logout={logout} isLoggedIn={isLoggedIn} memberState={memberState}/>

                <Routes>
                    <Route path='/' exact element={<MainHomepage/>}/>
                    <Route path="/login" element={<LoginForm isLoggedIn={isLoggedIn} setIsLoggedIn={(value) => setIsLoggedIn(value)}/>}/>
                    <Route path="/signup" element={<SignUpSelect isLoggedIn={isLoggedIn}/>}/>
                    <Route path="/signup/normal" element={<SignUp isLoggedIn={isLoggedIn} isComp={false}/>}/>
                    <Route path="/signup/company" element={<SignUp isLoggedIn={isLoggedIn} isComp={true}/>}/>
                    <Route path="/logout" element={<LoginForm/>}/>

                    <Route path="/admin" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="admin"/>
                            <MemberList isLoggedIn={isLoggedIn} memberState={memberState}/>
                        </div>
                    }/>
                    <Route path="/admin/member-list" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="admin"/>
                            <MemberList isLoggedIn={isLoggedIn} memberState={memberState}/>
                        </div>
                    }/>
                    <Route path="/admin/member-management" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="admin"/>
                            <MemberManagement isLoggedIn={isLoggedIn} memberState={memberState}/>
                        </div>
                    }/>

                    <Route path="/admin/site-management" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="admin"/>
                            <SiteManagement isLoggedIn={isLoggedIn} memberState={memberState}/>
                        </div>
                    }/>
                    <Route path="/admin/reservation-confirmation" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="admin"/>
                            <ReservationConfirmation isLoggedIn={isLoggedIn} memberState={memberState}/>
                        </div>
                    }/>
                    <Route path="/admin/access-log" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="admin"/>
                            <AccessLog isLoggedIn={isLoggedIn} memberState={memberState}/>
                        </div>
                    }/>


                    <Route path="/myPage" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="mypage"/>
                            <MyHome memberId={memberId} memberState={memberState}/>
                        </div>
                    }/>
                    <Route path="/myPage/reserve" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="mypage"/>
                            <ReservDetails memberId={memberId} />
                        </div>
                    }/>
                    <Route path="/myPage/corp-info" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="mypage"/>
                            <CorpInfo memberId={memberId} memberState={memberState}/>
                        </div>
                    }/>
                    <Route path="/myPage/modify-info" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="mypage"/>
                            <ModiInfo memberId={memberId} memberState={memberState}/>
                        </div>
                    }/>
                    <Route path="/myPage/modify-corp" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="mypage"/>
                            <ModiCorp memberId={memberId} memberState={memberState}/>
                        </div>
                    }/>
                    <Route path="/myPage/delete-info" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="mypage"/>
                            <DeleteInfo logout={logout} memberId={memberId} memberState={memberState}/>
                        </div>
                    }/>
                    <Route path="myPage/modify-reserv/:index" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="mypage"/>
                            <ModifyReserv memberId={memberId} memberState={memberState}/>
                        </div>
                    } />
                    <Route path="myPage/modify-consultant/:num" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="mypage"/>
                            <ModifyConsultant memberId={memberId} memberState={memberState}/>
                        </div>
                    } />
                    <Route path="myPage/modify-jobConsult/:num" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="mypage"/>
                            <ModifyJobConsult memberId={memberId} memberState={memberState}/>
                        </div>
                    } />

                    <Route path="/centerIntro" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="center"/>
                            <CenterIntroduction/>
                        </div>
                    }/>
                    <Route path="/facility" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="center"/>
                            <FacilityGuideMain/>
                        </div>
                    }/>
                    <Route path="/orgchart" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="center"/>
                            <OrgChart/>
                        </div>
                    }/>
                    <Route path="/wayToCome" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="center"/>
                            <WayToCome/>
                        </div>
                    }/>

                    <Route path="/compIntroPage" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="comp"/>
                            <CompIntroPage/>
                        </div>
                    }/>
                    <Route path="/tnotice" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="comp"/>
                            <TNoticeList memberState={memberState}/>
                        </div>
                    }/>
                    <Route path="/tnotice/create" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="comp"/>
                            <TNoticeForm memberId={memberId} memberState={memberState}/>
                        </div>
                    }/>
                    <Route path="/tnotice/:num" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="comp"/>
                            <TNoticeDetail memberState={memberState}/>
                        </div>
                    }/>
                    <Route path="/tnotice/edit/:num" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="comp"/>
                            <TNoticeEdit memberState={memberState}/>
                        </div>
                    }/>


                    <Route path="/notices" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="notices"/>
                            <NoticeList memberState={memberState}/>
                        </div>
                    }/>
                    <Route path="/notices/:num" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="notices"/>
                            <NoticeDetail  memberState={memberState}/>
                        </div>
                    }/>
                    <Route path="/notices/new" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="notices"/>
                            <CreateNotice memberState={memberState}/>
                        </div>
                    }/>
                    <Route path="/notices/update/:num" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="notices"/>
                            <UpdateNotice memberState={memberState}/>
                        </div>
                    }/>

                    <Route path="/centernews" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="notices"/>
                            <CenterNewsList memberState={memberState}/>
                        </div>
                    }/>
                    <Route path="/centernews/create" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="notices"/>
                            <CenterNewsForm memberId={memberId} memberState={memberState}/>
                        </div>
                    }/>
                    <Route path="/centernews/update/:num" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="notices"/>
                            <CenterNewsEdit memberState={memberState}/>
                        </div>
                    }/>
                    <Route path="/centernews/:num" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="notices"/>
                            <CenterNewsDetail memberState={memberState}/>
                        </div>
                    }/>

                    <Route path="/pressrelease" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="notices"/>
                            <PressReleaseList memberState={memberState}/>
                        </div>
                    }/>
                    <Route path="/pressrelease/create" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="notices"/>
                            <PressReleaseForm memberId={memberId} memberState={memberState}/>
                        </div>
                    }/>
                    <Route path="/pressrelease/update/:num" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="notices"/>
                            <PressReleaseEdit memberState={memberState}/>
                        </div>
                    }/>
                    <Route path="/pressrelease/:num" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="notices"/>
                            <PressReleaseDetail memberState={memberState}/>
                        </div>
                    }/>

                    <Route path="/reserve/:type" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="reserve"/>
                            <ReserveForm />
                        </div>
                    }/>


                    <Route path="/rental" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="reserve"/>
                            <Rental memberId={memberId}/>
                        </div>
                    }/>

                    <Route path="/jobConsult" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="reserve"/>
                            <JobConsult memberId={memberId}/>
                        </div>
                    }/>

                    <Route path="/consultants" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="reserve"/>
                            <ConsultantForm memberId={memberId}/>
                        </div>
                    }/>

                    <Route path="/reservation" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="reserve"/>
                            <ReservationList memberState={memberState}/>
                        </div>
                    }/>
                    <Route path="/reservation/create" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="reserve"/>
                            <ReservationForm memberId={memberId} memberState={memberState}/>
                        </div>
                    }/>
                    <Route path="/reservation/update/:num" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="reserve"/>
                            <ReservationEdit memberState={memberState}/>
                        </div>
                    }/>
                    <Route path="/reservation/:num" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="reserve"/>
                            <ReservationDetail memberState={memberState}/>
                        </div>
                    }/>

                    
                    <Route path="/search-results" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="reserve"/>
                            <SearchResult/>
                        </div>
                    }/>
                    

                    <Route path="/startup" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="programs" />
                            <Startup />
                        </div>
                    }/>
                    <Route path="/eduConsult" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="programs" />
                            <Educonsult />
                        </div>
                    }/>
                    <Route path="/tourism" element={
                        <div className="outter">
                            <Sidebar memberState={memberState} type="programs" />
                            <Tourism />
                        </div>
                    }/>
                    
                <Route path="/find-id" element={<FindId />} />
                <Route path="/find-pwd" element={<FindPwd />} />
                <Route path="/businessUpgrade" element={<BusinessUpgrade memberId={memberId} memberState={memberState}/>} />

            </Routes>
            <ChatbotToggle />
            </div>
            <Footer/>
        </BrowserRouter>

    );
}

export default App;
