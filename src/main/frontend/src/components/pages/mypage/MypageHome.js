import userProfile from "../../imgs/userProfile.png";
import "./MypageHome.css";
import Button from "../../baseComponents/Button";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, useNavigate,} from "react-router-dom";

const MyHome = () => {

    const memberId = sessionStorage.getItem("id");
    const [reserveList, setReserveList] = useState([]);

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
    }]);

    useEffect(() => {
        console.log(memberId);
        if (memberId) {
            getMemberInfo();
        }
    }, [memberId]); // memberId가 변경되면 getMemberInfo 함수를 호출합니다.

    useEffect(() => {
        console.log("Updated memberInfo:", memberInfo);
        // memberInfo가 업데이트 되면 여기에서 처리하면 됩니다.
    }, [memberInfo]); // memberInfo가 변경될 때마다 실행됩니다.

    const getMemberInfo = () => {
        axios.get(`/myPage/member/getMember?id=${memberId}`)
            .then((res) => {
                console.log(res.data);
                setMemberInfo(res.data);
                console.log(memberInfo);
            });

        axios.get(`/rental/member/${memberId}`)
            .then((res) => {
                console.log(res.data);
                setReserveList(res.data);
            })
    };

    // 날짜와 시간 형식을 변환하는 함수
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(); // 형식을 원하는 대로 변경할 수 있습니다.
    };

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
        navigate(`modify-reserv/${index}`);
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
        <div className="mypage-container">
            <div className="container">
                <h1 className="myTitle">마이페이지</h1>
                <h3 className="profile">
                    <img className="profileImg" src={userProfile} alt="profile"/>

                    <div className="profileInfo">
                        <div>
                            <div className="profileId">아이디</div>
                            <div className="profileName">이름</div>
                            <div className="profileEmail">Email</div>
                        </div>
                        <div>
                            <div className="idText">{memberInfo.id}</div>
                            <div className="nameText">{memberInfo.name}</div>
                            <div className="emailText">{memberInfo.email}</div>
                        </div>
                    </div>
                </h3>

            </div>
            <div className="profileModify">
                <Link to="/myPage/modify-info">
                    <Button onClick={() => {
                    }} text="개인정보수정" className="btn-two cyan rounded"/>
                </Link>
                {/*<a href="/#" className="btn-two cyan rounded">*/}
                {/*    <button onClick={() => {*/}
                {/*    }}>*/}
                {/*        개인정보수정*/}
                {/*    </button>*/}
                {/*</a>*/}
                <div className="userDelete">
                    <Link to="/myPage/delete-info">
                        <Button text="계정 탈퇴" onClick={() => {

                        }}/>
                    </Link>
                </div>
            </div>

            <div className="detailsContainer">
                <h2 className="reservDetailTitle">
                    예약내역
                </h2>
                <hr/>
                {reserveList.map((reservation, index) => (
                    <div className="reservDetails" >
                        <h3 className="reservDate">
                            {formatDate(reservation.startDate) || ""} ~ {formatDate(reservation.endDate) || ""}
                        </h3>
                        <h3 className="reservTitle" onClick={() => modifyLink(index)} key={index}>
                            {reservation.place || ""}
                        </h3>
                        <h3 className="reservState">
                            {(reservation.state === "RESERVE") &&
                                <div className="RESERVE">
                                    예약완료
                                </div>
                            }
                            {(reservation.state === "CHECK") &&
                                <div className="CHECK">
                                    검토 중
                                </div>
                            }
                            {(reservation.state === "APPROVE") &&
                                <div className="APPROVE">
                                    승인됨
                                </div>
                            }
                            {(reservation.state === "DENY") &&
                                <div className="DENY">
                                    거절됨
                                </div>
                            }
                        </h3>
                        {/*<Link to="/myPage/reserve">*/}
                        {/*    <Button onClick={() => {*/}
                        {/*        console.log("dk");*/}
                        {/*    }} text="버틍" className="btn-two blue"/>*/}
                        {/*</Link>*/}
                        <Button text="예약취소" onClick={() => cancelReservation(reservation.num)}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyHome;