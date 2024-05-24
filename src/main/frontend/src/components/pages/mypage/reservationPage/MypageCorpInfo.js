import React, {useEffect, useState} from "react";
import "./MypageCorpInfo.css";
import Button from "../../../baseComponents/Button";
import Sidebar from "../../../fragments/sidebar/Sidebar";
import axios from "axios";
import Viewer from "../functionPage/Viewer";

const CorpInfo = (props) => {
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
    }]);

    const [corpInfo, setCorpInfo] = useState({})

    useEffect(() => {
        if (memberId) {
            getMemberInfo();
            getCorpInfo();
        }
    }, [memberId]); // memberId가 변경되면 getMemberInfo 함수를 호출합니다.

    const getMemberInfo = () => {
        axios.get("/myPage/member/getMember?id=" + memberId)
            .then((res) => {
                console.log(res.data);
                setMemberInfo({...res.data})
            });
    };

    const getCorpInfo = () => {
        axios.get("/registcomp/getComp?memberId=" + memberId)
            .then((res) => {
                console.log(res.data);
                setCorpInfo({...res.data})
            });
    };

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
        <div className="CorpInfo-compo">
            <h1 className="pageTitle">등록 기업정보</h1>

            <div className="pageInfo">
                <div className="corpContainer">
                    <div className="corpHeader">
                        <div className="corpTitle">
                            {corpInfo.title}
                        </div>
                    </div>
                    <div className="corpContent">
                        <div className="corpImgContainer">
                            <img className="corpImg" src={`/registFile/${corpInfo.compImage}`} alt=""/>
                        </div>

                        <div className="corpInfo">
                            <div className="corpInfoTitle">
                                <div className="corpWriter">
                                    <div className="writerName">작성자:</div>
                                    <div className="writerNameBox">
                                        {corpInfo.writer}
                                    </div>
                                </div>
                                <div className="corpState">
                                    <div className="stateName">소속:</div>
                                    <div className="stateNameBox">
                                        {corpInfo.corpName}
                                    </div>
                                </div>
                            </div>
                            <div className="corpInfoContent">
                                <div className="contentText">
                                    {corpInfo.content && <Viewer contents={corpInfo.content}/>}
                                </div>
                            </div>
                        </div>
                    </div>
                    {(memberId === "") && (memberId === "undefined") &&
                        <div className="ifNothing">
                            <Button text="기업 정보 없으면 표시"/>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default CorpInfo;