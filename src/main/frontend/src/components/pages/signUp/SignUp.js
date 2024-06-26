import React, {useState, useEffect} from "react";
import axios from "axios";
import "./SignUp.css";
import userProfile from "../../imgs/userProfile.png";
import compProfile from "../../imgs/pngwing.com.png";
import AddressInput from "../../util/addressSearch/AddressInput";

const SignUp = ({ isLoggedIn, isComp }) => {
    if (isLoggedIn) {
        window.location.href = "/";
    }
    
    const [formData, setFormData] = useState(isComp ? {
            id: "",
            password: "",
            confirmPassword: "",
            name: "",
            birth: "",
            address: "",
            detailAddress: "",
            email: "",
            phoneNum: "",
            compName: "",
            businessNum: "",
            representative: "",
            compAddress: "",
            verificationCode: "",
            emailCode: ""
        }
        : {
            id: "",
            password: "",
            confirmPassword: "",
            name: "",
            birth: "",
            address: "",
            detailAddress: "",
            email: "",
            phoneNum: "",
            verificationCode: "",
            emailCode: ""
        });

    const [idAvailable, setIdAvailable] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [emailAvailable, setEmailAvailable] = useState(false);
    const [verified, setVerified] = useState(true);
    const [isEmail, setIsEmail] = useState(false);

    const handleIsEmailChange = () => {
        setIsEmail(!isEmail);
    };

    const checkUserId = () => {
        axios.get("/api/member/checkId?id=" + formData.id)
            .then(response => {
                alert(response.data);
                if (response.status === 200) {
                    setIdAvailable(true);
                }
            })
            .catch(error => {
                alert(error.response.data);
                console.error(error);
            });
    };

    const checkEmail = () => {
        axios.get("/api/member/checkEmail?email=" + formData.email)
            .then(response => {
                alert(response.data);
                if (response.status === 200) {
                    setEmailAvailable(true);
                }
            })
            .catch(error => {
                alert(error.response.data);
                console.error(error);
            });
    };

    const [areaCode, setAreaCode] = useState("010");
    const [phoneNum1, setPhoneNum1] = useState("");
    const [phoneNum2, setPhoneNum2] = useState("");
    const [isValidPhoneNum, setIsValidPhoneNum] = useState(false);

    const handleAreaCodeChange = (e) => {
        setAreaCode(e.target.value);
    };

    const handleChange = (e, target) => {
        const input = e.target.value;
        const reNum = input.replace(/[^0-9]/g, "");
        target(reNum);
    };

    useEffect(() => {
        const phoneNumber = `${areaCode}${phoneNum1}${phoneNum2}`;
        setFormData({...formData, phoneNum: phoneNumber});
        if (phoneNum2.length === 4 && phoneNumber >= 12) {
            setIsValidPhoneNum(true);
        } else {
            setIsValidPhoneNum(false);
        }
    }, [areaCode, phoneNum1, phoneNum2]);

    const requestPhoneVerification = () => {
        alert('인증번호가 전송되었습니다.')
        axios.post('/api/sms/send', { phoneNumber: formData.phoneNum })
            .catch(error => {
                alert('인증번호 전송 실패: ' + error.message);
                console.log("Phone Number: ", formData.phoneNum);
            });

    };

    const verifyCode = () => {
        axios.post('/api/sms/verify', { phoneNumber: formData.phoneNum, verificationCode:formData.verificationCode })
            .then(response => {
                if (response.data === '인증 성공') {
                    setVerified(true);
                    alert('핸드폰 번호가 인증되었습니다.');
                } else {
                    alert('인증번호가 일치하지 않습니다.');
                }
            })
            .catch(error => {
                alert('인증 실패: ' + error.message);
            });
    };
    const [zonecode, setZonecode] = useState("");
    const [address, setAddress] = useState("");
    const [detailedAddress, setDetailedAddress] = useState("");

    const addressRegEx = /.+/;

    const addressIsValid = addressRegEx.test(detailedAddress);

    const resetAddress = () => {
        setZonecode("");
        setAddress("");
        setDetailedAddress("");
    };

    let formIsValid = false;
    if (addressIsValid) {
        formIsValid = true;
    }

    const formSubmitHandler = () => {

        const userData = {
            address: `${address}`,
            detailAddress: `${detailedAddress}`,
            zonecode: zonecode,
        };

        setFormData({...formData, address: userData.address, detailAddress: userData.detailAddress})
    };

    useEffect(() => {
        formSubmitHandler();
    }, [address, detailedAddress]);

    // useEffect(() => {   //formData의 값이 변경 될때마다 콘솔 띄움
    //     console.log(formData)
    // }, [formData])

    // 여기서부터 이메일
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const handleSendCode = () => {
        alert("인증번호가 발송되었습니다.")
        axios.post('/api/auth/sendCode', { email: formData.email })
            .catch(error => alert("인증번호 전송이 실패하였습니다."));
    };

    const handleEmailCode = () => {
        axios.post('/api/auth/verifyCode', { email: formData.email, code: formData.emailCode })
            .then(response => {
                setMessage(response.data);  // 서버로부터 받은 응답 메시지를 상태로 저장
                alert(response.data);       // 사용자에게 서버 응답을 알림
                if (response.data === "인증되었습니다.") {
                    setVerified(true); // 이메일 인증 성공 시 verified 상태 업데이트
                }
            })
            .catch(error => {
                setMessage("이메일 인증번호가 일치하지않습니다.");  // 오류 메시지 상태 업데이트
                alert("이메일 인증번호가 일치하지않습니다");       // 사용자에게 오류 알림
            });
    };



    const handleSignUp = () => {
        const missingFields = [];
        const fieldNames = isComp ? {
                id: "아이디",
                password: "비밀번호",
                confirmPassword: "비밀번호 확인",
                name: "이름",
                birth: "생년월일",
                address: "주소",
                detailAddress: "상세주소",
                email: "이메일",
                phoneNum: "전화번호",
                compName: "기업명",
                businessNum: "사업자번호",
                representative: "대표자명",
                compAddress: "기업주소",
                verificationCode: "핸드폰인증번호",
                emailCode: "이메일인증번호"
            }
            : {
                id: "아이디",
                password: "비밀번호",
                confirmPassword: "비밀번호 확인",
                name: "이름",
                birth: "생년월일",
                address: "주소",
                detailAddress: "상세주소",
                email: "이메일",
                phoneNum: "전화번호",
                verificationCode: "핸드폰인증번호",
                emailCode: "이메일인증번호"
            };


        for (const key in formData) {
            if (key === "verificationCode" || key === "emailCode") {
                continue;
            }
            if (formData[key] === null || formData[key] === "") {
                missingFields.push(fieldNames[key]);
            }
        }

        if (missingFields.length > 0) {
            const missingFieldsMessage = missingFields.join(", ");
            alert(`다음 값을 입력해주세요: ${missingFieldsMessage}`);
        } else {
            if (idAvailable && passwordMatch && emailAvailable && verified && isValidPhoneNum && ((formData.password).length >= 8)) {
                // 회원가입 데이터를 서버로 전송
                axios.post(isComp ? "/api/member/compSignup" : "/api/member/signup", formData)
                    .then(response => {
                        alert(response.data);
                        console.log(response.data); // 회원가입 성공 시 처리
                        window.location.href = '/';
                    })
                    .catch(error => {
                        alert(error.response.data);
                        console.error(error); // 오류 발생 시 처리
                    });
            } else {
                if (!verified) {
                    alert("이메일 또는 휴대폰 인증이 필요합니다.");
                } else if (!idAvailable) {
                    alert("아이디 중복확인이 필요합니다.");
                } else if (!passwordMatch) {
                    alert("비밀번호가 같지 않습니다.");
                } else if (!emailAvailable) {
                    alert("이메일 중복확인이 필요합니다.");
                } else if (!isValidPhoneNum) {
                    alert("휴대폰 번호의 형식이 잘못되었습니다.");
                } else if (!((formData.password).length >= 8)) {
                    alert("비밀번호는 8글자 이상이어야 합니다.");
                }
            }
        }
    };

    const handlePasswordMatch = () => {
        setPasswordMatch(formData.password === formData.confirmPassword);
    };

    return (
        <div className="SignUp-compo">
            <div className="form-box">
            <div className="input-icon">
                {isComp ? (
                    <img src={compProfile} alt={compProfile}/>
                ) : (
                    <img src={userProfile} alt={userProfile}/>
                )}
                <h2>{isComp ? "기업" : "일반"} 회원 가입</h2>
            </div>
            <div className="input-box">
                <label>
                    아이디: {idAvailable && <span className="complete">중복 확인 완료</span>}
                    <input className="long-input" type="text" value={formData.id} onChange={(e) => {
                        setFormData({...formData, id: e.target.value});
                        setIdAvailable(false);
                    }}/>
                </label>
                <button className="center-button" onClick={checkUserId}>중복 확인</button>
            </div>

            <div className="input-box">
                <label>
                    비밀번호:
                    <input className="long-input" type="password" value={formData.password} onChange={(e) => {
                        setFormData({...formData, password: e.target.value});
                        setPasswordMatch(false);
                    }} onBlur={handlePasswordMatch}/>
                </label>
            </div>

            <div className="input-box">
                <label>
                    비밀번호 확인: {!passwordMatch && <span className="error">비밀번호가 일치하지 않습니다.</span>}
                    <input className="long-input" type="password" value={formData.confirmPassword} onChange={(e) => {
                        setFormData({...formData, confirmPassword: e.target.value});
                        setPasswordMatch(false);
                    }} onBlur={handlePasswordMatch}/>
                </label>
            </div>

            <div className="input-box">
                <label>
                    이름:
                    <input className="long-input" type="text" value={formData.name}
                           onChange={(e) => setFormData({...formData, name: e.target.value})}/>
                </label>
            </div>

            <div className="input-box">
                <label>
                    생년월일:
                    <input className="long-input" type="date" value={formData.birth}
                           onChange={(e) => setFormData({...formData, birth: e.target.value})}/>
                </label>
            </div>

            <div className="input-box">
                <AddressInput
                    addressState={{
                        zonecode,
                        address,
                        detailedAddress,
                    }}
                    addressAction={{
                        setZonecode,
                        setAddress,
                        setDetailedAddress,
                    }}
                    addressIsValid={addressIsValid}
                />
            </div>

            <div className="input-box">
                <label>
                    이메일: {emailAvailable && <span className="complete">확인완료</span>}
                    <input className="long-input" type="email" value={formData.email} onChange={(e) => {
                        setFormData({...formData, email: e.target.value});
                        setEmailAvailable(false);
                    }}/>
                </label>
                <button className="center-button" onClick={checkEmail}>중복 확인</button>
            </div>

            <div className="input-box">
                <label>
                    휴대폰 번호:
                    <div className="phone-number-box">
                        <select value={areaCode} onChange={handleAreaCodeChange}>
                            <option value="010">010</option>
                            <option value="016">011</option>
                            <option value="016">016</option>
                            <option value="016">017</option>
                            <option value="016">019</option>
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

            <div className="input-box">
                <button type="button" onClick={handleIsEmailChange}>{isEmail ? "휴대폰 인증으로 변경" : "이메일 인증으로 변경"}</button>
            </div>

            {isEmail &&
            <div className="input-box">
                <label>
                    이메일 인증번호 입력:
                    <input
                        className="long-input"
                        type="text"
                        value={formData.emailCode}
                        onChange={(e) => setFormData({...formData, emailCode: e.target.value})}
                    />
                </label>
                <div className="btn-twice">
                    <button onClick={handleSendCode}>인증번호 전송</button>
                    <button onClick={handleEmailCode}>인증하기</button>
                </div>
            </div>}

            {!isEmail &&
            <div className="input-box">
                <label>
                    휴대폰 인증번호 입력:
                    <input className="long-input" type="text" value={formData.verificationCode} onChange={(e) => {
                        setFormData({...formData, verificationCode: e.target.value});
                        // setVerified(false);}} />
                        setVerified(true);
                    }}/>
                </label>
                <div className="btn-twice">
                    <button onClick={requestPhoneVerification}>인증번호 전송</button>
                    <button onClick={verifyCode}>인증하기</button>
                </div>
            </div>}

            {isComp &&
                <div className="input-box">
                    <label>
                        기업명:
                        <input className="long-input" type="text" value={formData.compName}
                               onChange={(e) => setFormData({...formData, compName: e.target.value})}/>
                    </label>
                </div>
            }
            {isComp &&
                <div className="input-box">
                    <label>
                        사업자번호:
                        <input className="long-input" type="text" value={formData.businessNum}
                               onChange={(e) => setFormData({...formData, businessNum: e.target.value})}/>
                    </label>
                </div>
            }
            {isComp &&
                <div className="input-box">
                    <label>
                        대표자명:
                        <input className="long-input" type="text" value={formData.representative}
                               onChange={(e) => setFormData({...formData, representative: e.target.value})}/>
                    </label>
                </div>
            }
            {isComp &&
                <div className="input-box">
                    <label>
                        기업주소:
                        <input className="long-input" type="text" value={formData.compAddress}
                               onChange={(e) => setFormData({...formData, compAddress: e.target.value})}/>
                    </label>
                </div>
            }

            <div className="signup-button">
                <button onClick={handleSignUp}>가입하기</button>
            </div>
            </div>
        </div>
    );
};

export default SignUp;
