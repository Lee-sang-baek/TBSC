import React, {useEffect, useState} from "react";
import "./MypageReserv.css";
import Sidebar from "../../../fragments/sidebar/Sidebar";
import Button from "../../../baseComponents/Button";
import axios from "axios";
import img from "../../../imgs/login.png";
import {useNavigate} from "react-router-dom";

const ReservDetails = (props) => {
    const memberId = sessionStorage.getItem("id");

    const [memberInfo, setMemberInfo] = useState([{
        memberId: "",
        num: "",
        comp_name: "",
        gender: "",
        endDate: "",
        startDate: "",
        place: "",
        prepare: "",
        purpose: "",
        state: ""
    }])

    useEffect(() => {
        if (memberId) {
            getMemberInfo();
        }
    }, [memberId]); // memberId가 변경되면 getMemberInfo 함수를 호출합니다.

    useEffect(() => {
        console.log("Updated memberInfo:", memberInfo);
        // memberInfo가 업데이트 되면 여기에서 처리하면 됩니다.
    }, [memberInfo]); // memberInfo가 변경될 때마다 실행됩니다.

    const getMemberInfo = () => {
        axios.get(`/rental/member/${memberId}`)
            .then((res) => {
                console.log(res.data);
                setMemberInfo(res.data);
                console.log(memberInfo);
            });
    }

    // 날짜와 시간 형식을 변환하는 함수
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(); // 형식을 원하는 대로 변경할 수 있습니다.
    }

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString(); // 형식을 원하는 대로 변경할 수 있습니다.
    }

    // 예약 취소 버튼 클릭 시 호출되는 함수
    const cancelReservation = (num) => {
        axios.delete(`/rental/delete/${num}`)
            .then((res) => {
                console.log("Reservation cancelled successfully");
                // 예약 정보를 다시 가져옵니다. (업데이트된 정보 반영)
                getMemberInfo();
            })
            .catch((error) => {
                console.error("Error cancelling reservation:", error);
            });
    }

    const navigate = useNavigate();

    const modifyLink = (index) => {
        navigate(`/myPage/modify-reserv/${index}`);
    }

    if (!memberId) {
        return (
            <div className="rental-compo">
                <div className="rental-compo-in">
                    <h1>로그인 후 이용해주세요</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="ReservDetails-compo">
            <h1 className="pageTitle">예약 내역</h1>
            {memberInfo.map((reservation, index) => (
                <div className="pageInfo" onClick={() => modifyLink(index)} key={index}>
                    <div className="reservContainer">
                        <div className="reservHeader">
                            <div className="reservTitle">
                                {reservation.place || ""}
                            </div>
                            <div className="reservDate">
                                <div className="startDate">
                                    {formatDate(reservation.startDate) || ""}
                                </div>
                                <p>~</p>
                                <div className="endDate">
                                    {formatDate(reservation.endDate) || ""}
                                </div>
                            </div>
                        </div>
                        <div className="detailContent">
                            <img className="reservImg" src={img} alt=""/>
                            <div className="reservTime">
                                <div className="startDate">
                                    {formatTime(reservation.startDate) || ""}
                                </div>
                                <p>~</p>
                                <div className="endDate">
                                    {formatTime(reservation.endDate) || ""}
                                </div>
                            </div>
                            <div className={reservation.state ? "true" : "false"}>
                                예약완료
                            </div>
                            <Button text="예약취소" onClick={() => cancelReservation(reservation.num)}/>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ReservDetails;