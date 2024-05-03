import React from "react";
import "./mypageReserv.css";
import Button from "../../../BaseComponents/Button";
import Sidebar from "../../../Fragments/Sidebar/Sidebar";

const ReservDetails = (props) => {

    return (
        <div className="outter">
            <Sidebar />
            <form className="ReservDetails-compo">
            <h1 className="pageTitle">예약 내역</h1>

            <div className="pageInfo">
                <div className="reservContainer">
                    <div className="reservHeader">
                        <div className="reservTitle">
                            회의실 대관신청
                        </div>
                        <div className="reservDate">124214213</div>
                    </div>
                    <div className="detailContent">
                        <img className="reservImg" src={props.img} alt=""/>
                        <div className="reservTime">12:12</div>
                        <div className="reservState">예약상태</div>
                        <Button/>
                    </div>
                </div>
            </div>
        </form>
        </div>
    );
};

export default ReservDetails;