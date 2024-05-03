import React from "react";
import "./mypageCorpInfo.css";
import Button from "../../../BaseComponents/Button";
import Sidebar from "../../../Fragments/Sidebar/Sidebar";

const CorpInfo = (props) => {

    return (
        <div className="outter">
            <Sidebar />
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
                                    <div className="corpTime">작성자</div>
                                    <div className="corpState">소속</div>
                                </div>
                                <div className="corpInfoContent">
                                    <div className="contentText">내용</div>
                                </div>
                            </div>
                        </div>
                        <div className="ifNothing">
                            <Button/>
                        </div>

                    </div>
                </div>
            </form>
        </div>
    );
};

export default CorpInfo;