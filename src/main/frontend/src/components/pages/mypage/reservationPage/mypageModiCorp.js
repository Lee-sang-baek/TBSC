import React from "react";
import "./mypageModiCorp.css";
import Button from "../../../baseComponents/Button";
import Sidebar from "../../../fragments/sidebar/Sidebar";

const ModiCorp = (props) => {

    return (
            <form className="ModiCorp-compo">
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
                                <Button/>
                            </div>

                            <div className="corpInfo">
                                <div className="corpInfoTitle">
                                    <div className="corpTime">작성자</div>
                                    <div className="corpState">소속</div>
                                </div>
                                <div className="corpInfoContent">
                                    <div className="contentEdiForm">에디터폼</div>
                                    <div className="contentText">내용</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
    );
};

export default ModiCorp;