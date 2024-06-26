import React, {useEffect, useState} from "react";
import "./MypageCorpInfo.css";
import Button from "../../../baseComponents/Button";
import axios from "axios";
import Viewer from "../functionPage/Viewer";
import {useNavigate} from "react-router-dom";
import NeedLoginForm from "../../../baseComponents/NeedLoginForm";

const CorpInfo = ({ memberId, memberState }) => {

    const navigate = useNavigate();

    // const [memberInfo, setMemberInfo] = useState([{
    //     memberId: "",
    //     num: "",
    //     comp_name: "",
    //     gender: "",
    //     endDate: "",
    //     startDate: "",
    //     place: "",
    //     prepare: "",
    //     purpose: "",
    //     state: ""
    // }]);

    const [corpInfo, setCorpInfo] = useState({})

    useEffect(() => {
        if (memberId && memberState !== "NORMAL") {
            getMemberInfo();
            getCorpInfo();
        }
    }, [memberId]); // memberId가 변경되면 getMemberInfo 함수를 호출합니다.

    const getMemberInfo = () => {
        axios.get("/api/myPage/member/getMember?id=" + memberId)
            .then((res) => {
                console.log(res.data);
                // setMemberInfo({...res.data})
            });
    };

    const getCorpInfo = () => {
        axios.get("/api/registcomp/getComp?memberId=" + memberId)
            .then((res) => {
                console.log(res.data);
                setCorpInfo({...res.data})
            })
            .catch((error) => {
                if (error.response && error.response.status === 404) {
                    // 여기에 404 오류를 받았을 때 실행할 동작을 추가하세요.
                    console.log("기업 정보를 찾을 수 없습니다.");
                    setCorpInfo("");
                    console.log("corpInfo: ", corpInfo);
                } else {
                    // 다른 오류에 대한 처리
                    console.error("오류 발생:", error);
                }
            });
    };

    if (!memberId) {
        return (
            <NeedLoginForm />
        );
    };

    if (memberState === "NORMAL") {
        return (
            <div className="ModiCorp-compo">
                <h2>기업 회원이 아닙니다.</h2>
            </div>
        );
    }

    const handleNavigate = () => {
        navigate(`/myPage/modify-corp`)
    };

    return (
        <div className="CorpInfo-compo">
            <h1 className="pageTitle">등록 기업정보</h1>

            <div className="pageInfo">
                <div className="corpContainer">
                    {(corpInfo !== "" && corpInfo !== "undefined") &&
                        <>
                            <div className="corpContent">
                                <div className="corpHeader">
                                    <div className="corpImgContainer">
                                        <img className="corpImg" src={`/api/registFile/${corpInfo.compImage}`} alt=""/>
                                    </div>
                                </div>
                                <div className="corpInfo">
                                    <div className="corpTitle">
                                        <h2>{corpInfo.title}</h2>
                                    </div>
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
                                                {corpInfo.content && <Viewer contents={corpInfo.content} isTag={true}/>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                    {(corpInfo === "" || corpInfo === "undefined") &&
                        <div className="ifNothing">
                            <Button text="기업 정보 없음" onClick={handleNavigate}/>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default CorpInfo;