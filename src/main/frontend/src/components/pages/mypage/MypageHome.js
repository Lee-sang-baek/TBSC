import userProfile from "../../imgs/userProfile.png";
import "./MypageHome.css";
import Button from "../../baseComponents/Button";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link,} from "react-router-dom";

const MyHome = () => {

    const memberId = sessionStorage.getItem("id");

    const [memberInfo, setMemberInfo] = useState({
        id: "",
        name: "",
        email: "",
    })

    const getMemberInfo = () => {
        axios.get("/myPage/member/getMember?id=" + memberId)
            .then((res) => {
                console.log(res.data);
                setMemberInfo({...res.data})
            });
    }

    useEffect(() => {
        getMemberInfo();
    }, [memberId])

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
        <form>
            <div className="container">
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

                <div className="reservDetails">
                    <h3 className="reservDate">123213123</h3>
                    <h3 className="reservTitle">제목</h3>
                    <h3 className="reservState">상태</h3>
                    <Link to="/reserv">
                        <Button onClick={() => {
                            console.log("dk");
                        }} text="버틍" className="btn-two blue"/>
                    </Link>
                </div>
            </div>
        </form>
    );
};

export default MyHome;