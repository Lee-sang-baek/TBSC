import React, {useEffect, useState} from "react";
import "./DeleteInfo.css";
import Button from "../../../baseComponents/Button";
import Input from "../../../baseComponents/Input";
import axios from "axios";

const DeleteInfo = (props) => {
    const [location, setLocation] = React.useState({ ...window.location });

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
        if (memberInfo === '') {
            navigate("/home");
            axios.get("/logout")
                .then(response => {
                    console.log(response.data);
                });
            sessionStorage.removeItem("id");
            sessionStorage.removeItem("state");
            window.location.reload();
            alert("삭제 완료")
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

    const navigate = (path) => {
        window.history.pushState({}, "", path);
        setLocation({ ...window.location });
    };

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
                    alert(response.data);

                    if (response.status === 200) {
                        console.log(response.data);
                        // alert("삭제 완료")
                        // window.location.reload(); //삭제 후 페이지가 새로고침 되며 빈 정보 가져와서 else 문으로 빠짐
                    } else {
                        alert("알 수 없는 오류")
                    }
                })
                .catch(error => {
                    alert(error.response.data);
                    console.error(error); // 오류 발생 시 처리
                    // 오류 발생에 대한 추가적인 작업을 수행할 수 있습니다.
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
        <form>
            <h1 className="pageTitle">개인 정보 수정</h1>

            <div className="pageInfo">
                <div className="modiInfo">
                    <div className="modiInfoHeader">
                        <h3 className="idText">아이디</h3>
                        <Input type="text" className="idTextBox" value={memberInfo.id} readOnly/>
                        <h3 className="emailText">이메일</h3>
                        <Input type="text" className="emailTextBox" value={memberInfo.email} readOnly/>
                        <h3 className="passwordText">비밀번호</h3>
                        <Input type="password" className="passwordTextBox" value={password}
                               onChange={handleChangePassword}/>
                        <h3 className="passcheckText">
                            비밀번호 확인
                            <p className={checkSignal ? "match" : "unmatch"}>
                                비밀번호 불일치
                            </p>
                        </h3>
                        <Input type="password" className="checkTextBox" value={passwordCheck}
                               onChange={handleChangePasswordCh}/>
                    </div>
                    <div className="button">
                        <Button onClick={handleDelete} text="삭제"/>
                    </div>
                </div>
            </div>

        </form>
    );
};

export default DeleteInfo;