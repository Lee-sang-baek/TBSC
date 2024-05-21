import React from "react";
import "./MypageCorpInfo.css";
import Button from "../../../baseComponents/Button";
import Sidebar from "../../../fragments/sidebar/Sidebar";

const CorpInfo = (props) => {
    const memberId = sessionStorage.getItem("userId");

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
        <div className="outter">
            <Sidebar/>
            <form className="CorpInfo-compo">
                <h1 className="pageTitle">등록 기업정보</h1>

                <div className="pageInfo">
                    <div className="corpContainer">
                        <div className="corpHeader">
                            <div className="corpTitle">
                                기업제목
                            </div>
                        </div>
                        <div className="corpContent">
                            <div className="corpImgContainer">
                                <img className="corpImg" src={props.img} alt=""/>
                            </div>

                            <div className="corpInfo">
                                <div className="corpInfoTitle">
                                    <div className="corpWriter">
                                        <div className="writerName">작성자:</div>
                                        <div className="writerNameBox">작성자 이름</div>
                                    </div>
                                    <div className="corpState">
                                        <div className="stateName">소속:</div>
                                        <div className="stateNameBox">소속 명</div>
                                    </div>
                                </div>
                                <div className="corpInfoContent">
                                    <div className="contentText">내용</div>
                                </div>
                            </div>
                        </div>
                        {(memberId !== "") && (memberId !== "undefined") &&
                            <div className="ifNothing">
                                <Button text="기업 정보 없으면 표시"/>
                            </div>
                        }
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CorpInfo;