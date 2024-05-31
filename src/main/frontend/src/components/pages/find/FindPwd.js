import React, { useState } from "react";
import axios from "axios";
import "./FindPwd.css";
import logoImage from "../../imgs/logo.png";

const FindPwd = () => {
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        email: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [verificationStatus, setVerificationStatus] = useState({
        idVerified: false,
        emailVerified: false,
        nameVerified: false,
        passwordMatch: true
    });

    const verifyUserDetails = () => {
        const { id, name, email } = formData;
        axios.post("/member/verify", { id, name, email })
            .then(response => {
                if (response.status === 200) {
                    setVerificationStatus({ ...verificationStatus, idVerified: true, emailVerified: true, nameVerified: true });
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
        if (!verificationStatus.idVerified || !verificationStatus.emailVerified || !verificationStatus.nameVerified) {
            alert("사용자 인증이 필요합니다.");
            return;
        }

        if (!verificationStatus.passwordMatch) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        axios.post("/member/resetPassword", formData)
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
        <div className="input-form">
            <div className="input-icon">
                <img src={logoImage} alt="Logo" />
                <h2>비밀번호 재설정</h2>
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
            <div className="input-box">
                <label>
                    이메일:
                    <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </label>
            </div>
            <button className="center-button" onClick={verifyUserDetails}>인증하기</button>
            {verificationStatus.idVerified && verificationStatus.emailVerified && verificationStatus.nameVerified && (
                <>
                    <div className="input-box">
                        <label>
                            새로운 비밀번호:
                            <input type="password" value={formData.newPassword} onChange={(e) => {
                                setFormData({ ...formData, newPassword: e.target.value });
                                setVerificationStatus({ ...verificationStatus, passwordMatch: true });
                            }} onBlur={handlePasswordMatch} />
                        </label>
                    </div>
                    <div className="input-box">
                        <label>
                            비밀번호 확인: {!verificationStatus.passwordMatch && <span className="error">비밀번호가 일치하지 않습니다.</span>}
                            <input type="password" value={formData.confirmPassword} onChange={(e) => {
                                setFormData({ ...formData, confirmPassword: e.target.value });
                                setVerificationStatus({ ...verificationStatus, passwordMatch: true });
                            }} onBlur={handlePasswordMatch} />
                        </label>
                    </div>
                    <button className="center-button" onClick={handleResetPassword}>비밀번호 재설정</button>
                </>
            )}
        </div>
    );
};

export default FindPwd;
