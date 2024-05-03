import React from "react";
import "./mypageModify.css";
import Button from "../../../BaseComponents/Button";
import userProfile from "../../../Imgs/userProfile.png";

const ModiInfo = (props) => {

    return (
    <div className="ModiInfo-compo">
        <form>
            <h1 className="pageTitle">개인 정보 수정</h1>

            <div className="pageInfo">
                <div className="modiInfo">
                    <div className="modiInfoHeader">
                        <h3 className="idText">아이디</h3>
                        <div className="idBox">klashjdlkg231</div>
                        <h3 className="emailText">이메일</h3>
                        <div className="emailBox">dsaf@adsf.sadv</div>
                        <h3 className="passwordText">비밀번호</h3>
                        <div className="passwordBox">asdfsadf</div>
                        <h3 className="passcheckText">비밀번호 확인</h3>
                        <div className="passcheckBox">
                            asdfasdf
                            <div className="passcheckSignal">불일치</div>
                        </div>
                        <h3 className="nameText">이름</h3>
                        <div className="nameBox">홍길동</div>
                        <h3 className="birthText">생년월일</h3>
                        <div className="birthBox">
                            1999-99-99
                            <img src={userProfile} alt="Cal"/>
                        </div>
                        <h3 className="phoneText">휴대폰 번호</h3>
                        <div className="phoneBox">예약상태</div>
                    </div>
                    <div className="button">
                        <Button/>
                    </div>
                </div>
            </div>
        </form>
    </div>
    );
};

export default ModiInfo;