import React, {useEffect, useState} from "react";
import "./DeleteInfo.css";
import Button from "../../../baseComponents/Button";
import axios from "axios";

const DeleteInfo = (props) => {
    const [location, setLocation] = React.useState({...window.location});

    const memberId = sessionStorage.getItem("id");

    const [passwordMatch, setPasswordMatch] = useState(true);

    const [checkSignal, setCheckSignal] = useState(true);
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');

    const [memberInfo, setMemberInfo] = useState({
        id: "",
        password: "",
        confirmPassword: "",
        email: "",
    })

    // useEffect(() => {
    //     getMemberInfo();
    // }, []);

    useEffect(() => {
        if (memberId !== '') {
            getMemberInfo();
        }
    }, [memberId]); // memberId가 변경되면 getMemberInfo 함수를 호출합니다.

    useEffect(() => {
        console.log("Updated memberInfo:", memberInfo);
        // memberInfo가 업데이트 되면 여기에서 처리하면 됩니다.
        if (!memberInfo) {
            axios.get("/logout")
                .then(response => {
                    console.log(response.data);
                });
            alert("로그아웃 되었습니다.")
            sessionStorage.removeItem("id");
            sessionStorage.removeItem("state");
            window.location.href = "/";
        }
    }, [memberInfo]); // memberInfo가 변경될 때마다 실행됩니다.


    const getMemberInfo = () => {
        axios.get(`member/getMember?id=${memberId}`)
            .then((res) => {
                console.log(res.data);
                setMemberInfo(res.data);
                console.log(memberInfo);

            });
    }

    const handleDelete = () => {
        const missingFields = [];

        const fieldNames = {
            id: "아이디",
            password: "비밀번호",
            confirmPassword: "비밀번호 확인",
            email: "이메일",
        };

        for (const key in memberInfo) {
            if (memberInfo[key] === null || memberInfo[key] === "") {
                missingFields.push(fieldNames[key]);
            }
        }

        if (passwordMatch) {
            // 회원가입 데이터를 서버로 전송
            axios.post("/member/memberdelete", memberInfo)
                .then(response => {
                    console.log(memberInfo);

                    window.location.reload();
                })
                .catch(error => {
                    alert(error.response.data);
                    console.error(error); // 오류 발생 시 처리
                    // 오류 발생에 대한 추가적인 작업을 수행할 수 있습니다.
                    window.location.reload();
                });
        } else {
            if (!passwordMatch) {
                alert("비밀번호가 같지 않습니다.");
            }
        }
    };

    const handleChangePassword = (e) => {
        const currentValue = e.target.value;
        console.log(currentValue);
        setPassword(currentValue);
        setMemberInfo({...memberInfo, password: currentValue});
    }

    const handleChangePasswordCh = (e) => {
        const currentValue = e.target.value;
        console.log(currentValue);
        setPasswordCheck(currentValue);
        setMemberInfo({...memberInfo, confirmPassword: currentValue});
    }

    useEffect(() => {
        if (password === passwordCheck) {
            setCheckSignal(true);
            setPasswordMatch(true);
        } else {
            setCheckSignal(false);
            setPasswordMatch(false);
        }
    }, [password, passwordCheck]);

    return (
        <div className="DeleteInfo-compo">
            <h1 className="DeleteTitle">계정 탈퇴</h1>

            <div className="DeleteInfo">
                <div className="deleteInfoDetails">
                    <div className="wave-group">
                        <input required type="text" className="deleteInfoInput" value={memberInfo.id}/>
                        <span className="bar"></span>
                        <label className="label">
                            <span className="label-char" style={{'--index': 0}}>I</span>
                            <span className="label-char" style={{'--index': 1}}>D</span>
                        </label>
                    </div>

                    <div className="wave-group">
                        <input required type="text" className="deleteInfoInput" value={memberInfo.email}/>
                        <span className="bar"></span>
                        <label className="label">
                            <span className="label-char" style={{'--index': 0}}>E</span>
                            <span className="label-char" style={{'--index': 1}}>m</span>
                            <span className="label-char" style={{'--index': 2}}>a</span>
                            <span className="label-char" style={{'--index': 3}}>i</span>
                            <span className="label-char" style={{'--index': 4}}>l</span>
                        </label>
                    </div>

                    <div className="wave-group">
                        <input required type="password" className="deleteInfoInput" value={password}
                               onChange={handleChangePassword}/>
                        <span className="bar"></span>
                        <label className="label">
                            <span className="label-char" style={{'--index': 0}}>P</span>
                            <span className="label-char" style={{'--index': 1}}>a</span>
                            <span className="label-char" style={{'--index': 2}}>s</span>
                            <span className="label-char" style={{'--index': 3}}>s</span>
                            <span className="label-char" style={{'--index': 4}}>w</span>
                            <span className="label-char" style={{'--index': 5}}>o</span>
                            <span className="label-char" style={{'--index': 6}}>r</span>
                            <span className="label-char" style={{'--index': 7}}>d</span>
                        </label>
                    </div>

                    <div className="wave-group">
                        <input required type="password" className="deleteInfoInput" value={passwordCheck}
                               onChange={handleChangePasswordCh}/>
                        <span className="bar"></span>
                        <label className="label">
                            <span className="label-char" style={{'--index': 0}}>P</span>
                            <span className="label-char" style={{'--index': 1}}>a</span>
                            <span className="label-char" style={{'--index': 2}}>s</span>
                            <span className="label-char" style={{'--index': 3}}>s</span>
                            <span className="label-char" style={{'--index': 4}}>w</span>
                            <span className="label-char" style={{'--index': 5}}>o</span>
                            <span className="label-char" style={{'--index': 6}}>r</span>
                            <span className="label-char" style={{'--index': 7}}>d</span>
                            <span className="label-char" style={{'--index': 8}}>C</span>
                            <span className="label-char" style={{'--index': 8}}>h</span>
                            <span className="label-char" style={{'--index': 8}}>e</span>
                            <span className="label-char" style={{'--index': 8}}>c</span>
                            <span className="label-char" style={{'--index': 8}}>k</span>
                        </label>
                        <p className={checkSignal ? "match" : "unmatch"}>
                            비밀번호 불일치
                        </p>
                    </div>
                </div>
                <div className="button">
                    <Button onClick={handleDelete} text="삭제"/>
                </div>
            </div>
        </div>
    );
};

export default DeleteInfo;