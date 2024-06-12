import React, { useState } from "react";
import axios from "axios";
import "./FindPwd.css";
import logoImage from "../../imgs/logo.png";

const FindPwd = () => {
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        email: "",
        phoneNum: "",
        areaCode: "010",
        phoneNum1: "",
        phoneNum2: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [verificationStatus, setVerificationStatus] = useState({
        idVerified: false,
        emailVerified: false,
        phoneVerified: false,
        nameVerified: false,
        passwordMatch: true
    });

    const [verificationCode, setVerificationCode] = useState("");
    const [emailCode, setEmailCode] = useState("");
    const [isEmail, setIsEmail] = useState(true);

    const handleIsEmailChange = () => {
        setIsEmail(!isEmail);
        setVerificationStatus({
            ...verificationStatus,
            emailVerified: false,
            phoneVerified: false
        }); // Reset verification status
    };

    const handleAreaCodeChange = (e) => {
        setFormData({ ...formData, areaCode: e.target.value });
    };

    const handleChange = (e, target) => {
        const input = e.target.value;
        const reNum = input.replace(/[^0-9]/g, "");
        target(reNum);
    };

    const handleSendCode = () => {
        if (isEmail) {
            axios.get(`/api/member/isEmail?email=${formData.email}`)
            .then((res) => {
                alert("인증번호가 발송되었습니다.");
                axios.post('/api/auth/sendCode', { email: formData.email })
                    .catch(error => alert("인증번호 전송이 실패하였습니다."));
            })
            .catch((err) => {
                alert("이메일이 회원 정보와 같지 않습니다.")
            });
            
        } else {
            const phoneNumber = `${formData.areaCode}${formData.phoneNum1}${formData.phoneNum2}`;
            alert('인증번호가 전송되었습니다.');
            axios.post('/api/sms/send', { phoneNumber })
                .catch(error => alert('인증번호 전송 실패: ' + error.message));
        }
    };

    const handleVerification = () => {
        if (isEmail) {
            axios.post('/api/auth/verifyCode', { email: formData.email, code: emailCode })
                .then(response => {
                    if (response.data === "인증되었습니다.") {
                        setVerificationStatus({ ...verificationStatus, emailVerified: true });
                        alert("이메일이 인증되었습니다.");
                    } else {
                        alert("이메일 인증번호가 일치하지 않습니다.");
                    }
                })
                .catch(error => alert("이메일 인증번호가 일치하지 않습니다."));
        } else {
            const phoneNumber = `${formData.areaCode}${formData.phoneNum1}${formData.phoneNum2}`;
            axios.post('/api/sms/verify', { phoneNumber, verificationCode })
                .then(response => {
                    if (response.data === '인증 성공') {
                        setVerificationStatus({ ...verificationStatus, phoneVerified: true });
                        alert('핸드폰 번호가 인증되었습니다.');
                    } else {
                        alert('인증번호가 일치하지 않습니다.');
                    }
                })
                .catch(error => alert('인증 실패: ' + error.message));
        }
    };

    const verifyUserDetails = () => {
        const { id, name } = formData;
        axios.post("/api/member/verify", { id, name })
            .then(response => {
                if (response.status === 200) {
                    setVerificationStatus({ ...verificationStatus, idVerified: true, nameVerified: true });
                    alert("사용자 정보가 확인되었습니다.");
                }
            })
            .catch(error => {
                alert("사용자 정보가 일치하지 않습니다.");
                console.error(error);
            });
    };

    const handlePasswordMatch = () => {
        setVerificationStatus({ ...verificationStatus, passwordMatch: formData.newPassword === formData.confirmPassword });
    };

    const handleResetPassword = () => {
        if (!verificationStatus.idVerified || (!verificationStatus.emailVerified && !verificationStatus.phoneVerified) || !verificationStatus.nameVerified) {
            alert("사용자 인증이 필요합니다.");
            return;
        }

        if (!verificationStatus.passwordMatch) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        axios.post("/api/member/resetPassword", formData)
            .then(response => {
                alert(response.data);
                console.log(response.data);
                window.location.reload();
            })
            .catch(error => {
                alert("비밀번호 재설정 중 오류가 발생했습니다.");
                console.error(error);
            });
    };

    return (
        <div className="FindPwd-compo">
            <div className="form-box">
            <div className="input-icon">
                <img src={logoImage} alt="Logo" />
                <h2>비밀번호 찾기</h2>
            </div>
            <div className="input-box">
                <label>
                    아이디:
                    <input type="text" value={formData.id} onChange={(e) => setFormData({ ...formData, id: e.target.value })} />
                </label>
            </div>
            <div className="input-box">
                <label>
                    이름:
                    <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </label>
            </div>
            <div className="btn-box">
                <button type="button" onClick={verifyUserDetails}>사용자 확인</button>
            </div>
            {verificationStatus.idVerified && verificationStatus.nameVerified && (
            <div>
            <div className="btn-box">
                <button type="button" onClick={handleIsEmailChange}>
                    {isEmail ? "휴대폰 인증으로 변경" : "이메일 인증으로 변경"}
                </button>
            </div>
            {isEmail ? (
                <div className="input-box">
                    <label>
                        이메일:
                        <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </label>
                </div>
            ) : (
                <div className="input-box">
                    <label>
                        휴대폰 번호:
                        <div className="phone-number-box">
                            <select value={formData.areaCode} onChange={handleAreaCodeChange}>
                                <option value="010">010</option>
                                <option value="011">011</option>
                                <option value="016">016</option>
                                <option value="017">017</option>
                                <option value="019">019</option>
                            </select>
                            <h4>-</h4>
                            <input
                                type="text"
                                value={formData.phoneNum1}
                                onChange={(e) => handleChange(e, (value) => setFormData({ ...formData, phoneNum1: value }))}
                                maxLength="4"
                            />
                            <h4>-</h4>
                            <input
                                type="text"
                                value={formData.phoneNum2}
                                onChange={(e) => handleChange(e, (value) => setFormData({ ...formData, phoneNum2: value }))}
                                maxLength="4"
                            />
                        </div>
                    </label>
                </div>

            )}
            <div className="input-box">
                <label>
                    인증번호 입력:
                    <input
                        type="text"
                        value={isEmail ? emailCode : verificationCode}
                        onChange={(e) => {
                            if (isEmail) setEmailCode(e.target.value);
                            else setVerificationCode(e.target.value);
                        }}
                    />
                </label>
                <div className="btn-twice">
                    <button onClick={handleSendCode}>인증번호 전송</button>
                    <button onClick={handleVerification}>인증하기</button>
                </div>
            </div>
            </div>
            )}
            {verificationStatus.idVerified && (verificationStatus.emailVerified || verificationStatus.phoneVerified) && verificationStatus.nameVerified && (
                <>
                    <div className="input-box" >
                        <label>
                            새로운 비밀번호:
                            <input
                                type="password"
                                value={formData.newPassword}
                                onChange={(e) => {
                                    setFormData({ ...formData, newPassword: e.target.value });
                                    setVerificationStatus({ ...verificationStatus, passwordMatch: true });
                                }}
                                onBlur={handlePasswordMatch}
                            maxLength={8}/>
                        </label>
                    </div>
                    <div className="input-box">
                        <label>
                            비밀번호 확인: {!verificationStatus.passwordMatch && <span className="error" >비밀번호가 일치하지 않습니다.</span>}
                            <input
                                type="password"
                                value={formData.confirmPassword}
                                onChange={(e) => {
                                    setFormData({ ...formData, confirmPassword: e.target.value });
                                    setVerificationStatus({ ...verificationStatus, passwordMatch: true });
                                }}
                                onBlur={handlePasswordMatch}
                           maxLength={8} />
                        </label>
                    </div>
                    <button className="center-button" onClick={handleResetPassword}>비밀번호 재설정</button>
                </>
            )}
            </div>
        </div>
    );
};

export default FindPwd;
