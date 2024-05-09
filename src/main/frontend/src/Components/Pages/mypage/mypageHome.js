import userProfile from "../../imgs/userProfile.png";
import "./mypageHome.css";
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
        axios.get("member/getMember?id=" + memberId)
            .then((res) => {
                console.log(res.data);
                setMemberInfo({...res.data})
            });
    }

    useEffect(() => {
        getMemberInfo();
    }, [])

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
                    <Button text="계정 탈퇴"></Button>
                </div>
            </div>

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
        </form>
    );
};

export default MyHome;