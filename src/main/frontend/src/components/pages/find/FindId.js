import React, { useState } from "react";
import axios from "axios";
import "./FindId.css";
import logoImage from "../../imgs/logo.png";

const FindId = () => {
    const [email, setEmail] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [areaCode, setAreaCode] = useState("010");
    const [phoneNum1, setPhoneNum1] = useState("");
    const [phoneNum2, setPhoneNum2] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [emailCode, setEmailCode] = useState("");
    const [isEmail, setIsEmail] = useState(false);
    const [verified, setVerified] = useState(false);
    const [message, setMessage] = useState("");
    const [foundId, setFoundId] = useState("");

    const handleIsEmailChange = () => {
        setIsEmail(!isEmail);
        setVerified(false); // 인증 상태 초기화
    };

    const handleAreaCodeChange = (e) => {
        setAreaCode(e.target.value);
    };

    const handleChange = (e, target) => {
        const input = e.target.value;
        const reNum = input.replace(/[^0-9]/g, "");
        target(reNum);
    };

    const handleSendCode = () => {
        if (isEmail) {
            alert("인증번호가 발송되었습니다.");
            axios.post('/api/auth/sendCode', { email })
                .catch(error => alert("인증번호 전송이 실패하였습니다."));
        } else {
            const phoneNumber = `${areaCode}${phoneNum1}${phoneNum2}`;
            alert('인증번호가 전송되었습니다.');
            axios.post('/api/sms/send', { phoneNumber })
                .catch(error => alert('인증번호 전송 실패: ' + error.message));
        }
    };

    const handleVerification = () => {
        if (isEmail) {
            axios.post('/api/auth/verifyCode', { email, code: emailCode })
                .then(response => {
                    setMessage(response.data);
                    alert(response.data);
                    if (response.data === "인증되었습니다.") {
                        setVerified(true);
                    }
                })
                .catch(error => alert("이메일 인증번호가 일치하지 않습니다."));
        } else {
            const phoneNumber = `${areaCode}${phoneNum1}${phoneNum2}`;
            axios.post('/api/sms/verify', { phoneNumber, verificationCode })
                .then(response => {
                    if (response.data === '인증 성공') {
                        setVerified(true);
                        alert('핸드폰 번호가 인증되었습니다.');
                    } else {
                        alert('인증번호가 일치하지 않습니다.');
                    }
                })
                .catch(error => alert('인증 실패: ' + error.message));
        }
    };

    const handleFindId = () => {
        if (!verified) {
            alert("이메일 또는 휴대폰 인증이 필요합니다.");
            return;
        }

        const data = isEmail ? { email } : { phoneNum: `${areaCode}${phoneNum1}${phoneNum2}` };
        axios.post('/api/member/findId', data)
            .then(response => {
                setFoundId(response.data);
                alert(`아이디는 ${response.data}입니다.`);
            })
            .catch(error => alert('아이디 찾기 실패: ' + error.message));
    };

    return (
        <div className="FindId-compo">
            <div className="form-box">
                <div className="input-icon">
                    <img src={logoImage} alt={logoImage} />
                    <h2>아이디 찾기</h2>
                </div>

                <div className="input-box1">
                    <button type="button" onClick={handleIsEmailChange}>{isEmail ? "휴대폰 인증으로 변경" : "이메일 인증으로 변경"}</button>
                </div>

                {isEmail ?
                    <div className="input-box">
                        <label>
                            이메일:
                            <input className="long-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </label>
                    </div>
                    :
                    <div className="input-box">
                        <label>
                            휴대폰 번호:
                            <div className="phone-number-box">
                                <select value={areaCode} onChange={handleAreaCodeChange}>
                                    <option value="010">010</option>
                                    <option value="011">011</option>
                                    <option value="016">016</option>
                                    <option value="017">017</option>
                                    <option value="019">019</option>
                                </select>
                                <h4>-</h4>
                                <input
                                    type="text"
                                    value={phoneNum1}
                                    onChange={(e) => handleChange(e, setPhoneNum1)}
                                    maxLength="4"
                                />
                                <h4>-</h4>
                                <input
                                    type="text"
                                    value={phoneNum2}
                                    onChange={(e) => handleChange(e, setPhoneNum2)}
                                    maxLength="4"
                                />
                            </div>
                        </label>
                    </div>
                }

                <div className="input-box">
                    <label>
                        인증번호 입력:
                        <input className="long-input" type="text" value={isEmail ? emailCode : verificationCode} onChange={(e) => {
                            if (isEmail) setEmailCode(e.target.value);
                            else setVerificationCode(e.target.value);
                        }} />
                    </label>
                    <div className="btn-twice">
                        <button onClick={handleSendCode}>인증번호 전송</button>
                        <button onClick={handleVerification}>인증하기</button>
                    </div>
                </div>

                <div className="findId-button">
                    <button onClick={handleFindId}>아이디 찾기</button>
                </div>

                {foundId && (
                    <div className="result-box">
                        <p>찾은 아이디: {foundId}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FindId;
