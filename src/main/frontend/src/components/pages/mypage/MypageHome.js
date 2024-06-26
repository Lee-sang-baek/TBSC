import userProfile from "../../imgs/userProfile.png";
import "./MypageHome.css";
import Button from "../../baseComponents/Button";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, useNavigate,} from "react-router-dom";
import NeedLoginForm from "../../baseComponents/NeedLoginForm";

const MyHome = ({ memberId, memberState }) => {

    const [reserveList, setReserveList] = useState([]);
    const [consultantList, setConsultantList] = useState([]);
    const [jobConsultList, setJobConsultList] = useState([]);

    const [memberInfo, setMemberInfo] = useState([{
        // memberId: "",
        // num: "",
        // comp_name: "",
        // gender: "",
        // endDate: "",
        // startDate: "",
        // place: "",
        // prepare: "",
        // purpose: "",
        // state: ""
    }]);

    useEffect(() => {
        if (memberId) {
            getMemberInfo();
        }
    }, [memberId]);

    useEffect(() => {
        console.log("Updated memberInfo:", memberInfo);
        // memberInfo가 업데이트 되면 여기에서 처리하면 됩니다.
    }, [memberInfo]); // memberInfo가 변경될 때마다 실행됩니다.

    const getMemberInfo = () => {
        axios.get(`/api/myPage/member/getMember?id=${memberId}`)
            .then((res) => {
                console.log(res.data);
                setMemberInfo(res.data);
                console.log(memberInfo);
            });

        axios.get(`/api/rental/member/${memberId}`)
            .then((res) => {
                console.log("setReserveList", res.data);
                setReserveList(res.data);
            })

        axios.get(`/api/consultants/member/${memberId}`)
            .then((res) => {
                console.log("setConsultantList", res.data);
                setConsultantList(res.data);
            })

        axios.get(`/api/jobConsult/list?memberId=${memberId}`)
            .then((res) => {
                console.log("setJobConsultList", res.data);
                setJobConsultList(res.data);
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
    };

    // 예약 취소 버튼 클릭 시 호출되는 함수
    const cancelReservation = (num) => {
        axios.delete(`/api/rental/delete/${num}`)
            .then((res) => {
                console.log("Reservation cancelled successfully");
                // 예약 정보를 다시 가져옵니다. (업데이트된 정보 반영)
                getMemberInfo();
            })
            .catch((error) => {
                console.error("Error cancelling reservation:", error);
            });
    };

    const cancelConsultant = (num) => {
        axios.delete(`/api/consultants/delete/${num}`)
            .then((res) => {
                console.log("Consultant cancelled successfully");
                // 예약 정보를 다시 가져옵니다. (업데이트된 정보 반영)
                getMemberInfo();
            })
            .catch((error) => {
                console.error("Error cancelling consultant:", error);
            });
    };

    const cancelJobConsult = (num) => {
        axios.delete(`/api/jobConsult/delete/${num}`)
            .then((res) => {
                console.log("Consultant cancelled successfully");
                // 예약 정보를 다시 가져옵니다. (업데이트된 정보 반영)
                getMemberInfo();
            })
            .catch((error) => {
                console.error("Error cancelling consultant:", error);
            });
    };

    const navigate = useNavigate();

    const modifyLink = (index) => {
        navigate(`modify-reserv/${index}`);
    }

    if (!memberId) {
        return (
            <NeedLoginForm />
        );
    }

    return (
        <div className="MypageHome-compo">
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
                {memberState === "NORMAL" && (
                    <div className="businessUpgrade">
                    <Link to="/businessUpgrade">
                        <Button text="기업회원전환" className="btn-two cyan rounded" />
                    </Link>
                </div>
                )}

                <div className="userDelete">
                    <Link to="/myPage/delete-info">
                        <Button text="계정 탈퇴"/>
                    </Link>
                </div>
            </div>

            <div className="detailsContainer">
                <h2 className="reservDetailTitle">
                    진행중인 예약 목록
                </h2>
                <hr/>
                {reserveList.map((reservation, index) => (
                    <div className="reservDetails">
                        <div>
                            <h3 className="reservDate">{formatDate(reservation.startDate) || ""} ~ </h3>
                            <h3 className="reservDate">{formatDate(reservation.endDate) || ""} </h3>
                        </div>

                        <h3>회의실 대관 신청</h3>
                        <h3 className="reservTitle" onClick={() => modifyLink(reservation.num)} key={index}>
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
                        <Button text="예약취소" onClick={() => cancelReservation(reservation.num)}/>
                    </div>
                ))}
                {consultantList.map((reservation, index) => (
                    <div className="reservDetails">
                        <h3 className="reservDate">
                            {formatDate(reservation.appDate) || ""}
                        </h3>

                        <h3>기업 컨설팅 신청</h3>
                        <h3 className="reservTitle" onClick={() => {
                            navigate(`/myPage/modify-consultant/${reservation.num}`);
                        }} key={index}>
                            {reservation.management || ""}
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
                        <Button text="예약취소" onClick={() => cancelConsultant(reservation.num)}/>
                    </div>
                ))}
                {jobConsultList.map((reservation, index) => (
                    <div className="reservDetails">
                        <h3 className="reservDate">
                            {formatDate(reservation.createDate) || ""}
                        </h3>

                        <h3>일자리 상담 신청</h3>
                        <h3 className="reservTitle" onClick={() => {
                            navigate(`/myPage/modify-jobConsult/${reservation.num}`);
                        }} key={index}>
                            {
                                (
                                    "구분: " + reservation.category + "|" +
                                    "업종: " + reservation.industry + "\n" + "...."
                                ) || ""}
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
                        <Button text="예약취소" onClick={() => cancelJobConsult(reservation.num)}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyHome;