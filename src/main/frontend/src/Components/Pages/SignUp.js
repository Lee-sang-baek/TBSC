import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { LocalDateTime } from '@js-joda/core';
import './SignUp.css';
import logoImage from '../Imgs/logo.png';

const SignUp = () => {
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    name: '',
    birth: '',
    address: '',
    detailAddress: '',
    email: '',
    phoneNum: '',
    verificationCode: ''
  });

const [idAvailable, setIdAvailable] = useState(false);
const [passwordMatch, setPasswordMatch] = useState(true);
const [emailAvailable, setEmailAvailable] = useState(false);
const [phoneVerified, setPhoneVerified] = useState(true);

const checkUserId = () => {
  axios.get('/member/checkId?id=' + formData.id)
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
  axios.get('/member/checkEmail?email=' + formData.email)
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

const requestPhoneVerification = () => {
  // 휴대폰 번호 인증 요청 로직 구현
  // 필요한 경우 axios를 사용하여 서버로 요청을 보내어 인증번호 요청
};

const verifyCode = () => {
  // 입력된 인증번호 확인 로직 구현
  // 필요한 경우 axios를 사용하여 서버로 요청을 보내어 인증번호 확인
};

const handleSignUp = () => {
    const missingFields = [];
    const fieldNames = {
        id: '아이디',
        password: '비밀번호',
        confirmPassword: '비밀번호 확인',
        name: '이름',
        birth: '생년월일',
        address: '주소',
        detailAddress: '상세주소',
        email: '이메일',
        phoneNum: '전화번호',
        verificationCode: '인증번호'
    };

    for (const key in formData) {
        if (formData[key] === null || formData[key] === "") {
            missingFields.push(fieldNames[key]);
        }
    }

    if (missingFields.length > 0) {
        const missingFieldsMessage = missingFields.join(", ");
        alert(`다음 값을 입력해주세요: ${missingFieldsMessage}`);
    } else {
        if (idAvailable && passwordMatch && emailAvailable && phoneVerified) {
            // 회원가입 데이터를 서버로 전송
            axios.post('/member/signup', formData)
            .then(response => {
                alert(response.data);
                console.log(response.data); // 회원가입 성공 시 처리
                window.location.reload();
            })
            .catch(error => {
                alert(error.response.data);
                console.error(error); // 오류 발생 시 처리
                // 오류 발생에 대한 추가적인 작업을 수행할 수 있습니다.
            });
        } else {
            if (!idAvailable) {
                alert("아이디 중복확인이 필요합니다.");
            }
            else if (!passwordMatch) {
                alert("비밀번호가 같지 않습니다.");
            }
            else if (!emailAvailable) {
                alert("이메일 중복확인이 필요합니다.");
            }
//            if (!phoneVerified) {
//                alert("휴대폰 인증이 필요합니다.");
//            }
        }
    }
};

const handlePasswordMatch = () => {
setPasswordMatch(formData.password === formData.confirmPassword);
};

  return (
    <div className="input-form">
        <div className="input-icon">
            <img src={logoImage} />
            <h2>회원 가입</h2>
        </div>
        <div className="input-box">
            <label>
                아이디: {idAvailable && <span className="complete">중복 확인 완료</span>}
                <input type="text" value={formData.id} onChange={(e) => {setFormData({ ...formData, id: e.target.value });
                                                                         setIdAvailable(false);}} />
            </label>
            <button className="center-button" onClick={checkUserId}>중복 확인</button>
        </div>

      <div className="input-box">
          <label>
            비밀번호:
            <input type="password" value={formData.password} onChange={(e) => {setFormData({ ...formData, password: e.target.value });
                                                                               setPasswordMatch(false);}} onBlur={handlePasswordMatch} />
          </label>
      </div>

      <div className="input-box">
          <label>
            비밀번호 확인: {!passwordMatch && <span className="error">비밀번호가 일치하지 않습니다.</span>}
            <input type="password" value={formData.confirmPassword} onChange={(e) => {setFormData({ ...formData, confirmPassword: e.target.value });
                                                                                      setPasswordMatch(false);}} onBlur={handlePasswordMatch} />
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
            생년월일:
            <input type="date" value={formData.birth} onChange={(e) => setFormData({ ...formData, birth: e.target.value })} />
          </label>
      </div>

      <div className="input-box">
          <label>
            주소:
            <input type="text" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
          </label>
      </div>

      <div className="input-box">
          <label>
            상세주소:
            <input type="text" value={formData.detailAddress} onChange={(e) => setFormData({ ...formData, detailAddress: e.target.value })} />
          </label>
      </div>

      <div className="input-box">
          <label>
            이메일: {emailAvailable && <span className="complete">확인완료</span>}
            <input type="email" value={formData.email} onChange={(e) => {setFormData({ ...formData, email: e.target.value });
                                                                        setEmailAvailable(false);}} />
          </label>
          <button className="center-button" onClick={checkEmail}>중복 확인</button>
      </div>

      <div className="input-box">
          <label>
            휴대폰 번호:
            <input type="text" value={formData.phoneNum} onChange={(e) => {setFormData({ ...formData, phoneNum: e.target.value });
                                                                           // setPhoneVerified(false);}} />
                                                                           setPhoneVerified(true);}} />
          </label>
          <button className="center-button" onClick={requestPhoneVerification}>인증 하기</button>
      </div>

    <div className="input-box">
      <label>
        인증번호 입력:
        <input type="text" value={formData.verificationCode} onChange={(e) => {setFormData({ ...formData, verificationCode: e.target.value });
                                                                               // setPhoneVerified(false);}} />
                                                                               setPhoneVerified(true);}} />
      </label>
      <button className="center-button">확인</button>
    </div>

      <div className="signup-button">
          <button onClick={handleSignUp}>가입하기</button>
      </div>
    </div>
  );
};

export default SignUp;
