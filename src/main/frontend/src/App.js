import React from 'react';
import Header from './Components/Header/Header';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Form from "./Components/Map/Form";
import ModiInfo from "./Components/mypage/ReservationPage/mypageModify";
import MyHome from "./Components/mypage/mypageHome";
import ReservDetails from "./Components/mypage/ReservationPage/mypageReserv";
import ModiCorp from "./Components/mypage/ReservationPage/mypageModiCorp";
import CorpInfo from "./Components/mypage/ReservationPage/mypageCorpInfo";

function App() {
    return (
        <Router>
            <div>
                <Header/>

                <div className="AddressSearch">
                    <Form/>
                </div>

                <div className="Profile">

                </div>

            </div>

            <div>
                <Header/>
                <div>
                    <Link to={"/myhome"}> /마이홈/ </Link>
                    <Link to={"/reserv"}> /예약/ </Link>
                    <Link to={"/corpinfo"}> /등록기업정보/ </Link>
                    <Link to={"/modiinfo"}> /개인정보수정/ </Link>
                    <Link to={"/modicorp"}> /기업정보수정/ </Link>
                </div>
                <Routes>
                    <Route path='/myhome' element={<MyHome/>}/>
                    <Route path='/reserv' element={<ReservDetails/>}/>
                    <Route path='/corpinfo' element={<CorpInfo/>}/>
                    <Route path='/modiinfo' element={<ModiInfo/>}/>
                    <Route path='/modicorp' element={<ModiCorp/>}/>
                </Routes>
            </div>

        </Router>

    );
}

export default App;
