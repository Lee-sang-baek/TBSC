import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CompSignUp.css';
import logoImage from '../Imgs/logo.png';

const CompSignUp = () => {
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
    compName: '',
    businessNum: '',
    representative: '',
    compAddress: '',
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

  const [areaCode, setAreaCode] = useState('010');
  const [phoneNum1, setPhoneNum1] = useState('');
  const [phoneNum2, setPhoneNum2] = useState('');
  const [isValidPhoneNum, setIsValidPhoneNum] = useState(false);

  const handleAreaCodeChange = (e) => {
    setAreaCode(e.target.value);
  };

const handleChange = (e, target) => {
    const input = e.target.value;
    const reNum = input.replace(/[^0-9]/g, '');
    target(reNum);
};

useEffect(() => {
    const phoneNumber = `${areaCode}-${phoneNum1}-${phoneNum2}`;
    setFormData({ ...formData, phoneNum: phoneNumber });
}, [phoneNum1, phoneNum2]);

useEffect(() => {
    setIsValidPhoneNum(false);
    handleSubmit();
}, [formData.phoneNum]);

  const handleSubmit = () => {
    if (phoneNum2.length === 4 && formData.phoneNum.length >= 12) {
        setIsValidPhoneNum(true);
    }
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
        compName: '기업명',
        businessNum: '사업자번호',
        representative: '대표자명',
        compAddress: '기업주소',
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
            axios.post('/member/compSignup', formData)
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
            else if (!isValidPhoneNum) {
                alert("휴대폰 번호의 형식이 잘못되었습니다.");
            }
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
            <h2>기업 회원 가입</h2>
        </div>
        <div className="input-box">
            <label>
                아이디: {idAvailable && <span className="complete">중복 확인 완료</span>}
                <input className="long-input" type="text" value={formData.id} onChange={(e) => {setFormData({ ...formData, id: e.target.value });
                                                                         setIdAvailable(false);}} />
            </label>
            <button className="center-button" onClick={checkUserId}>중복 확인</button>
        </div>

      <div className="input-box">
          <label>
            비밀번호:
            <input className="long-input" type="password" value={formData.password} onChange={(e) => {setFormData({ ...formData, password: e.target.value });
                                                                               setPasswordMatch(false);}} onBlur={handlePasswordMatch} />
          </label>
      </div>

      <div className="input-box">
          <label>
            비밀번호 확인: {!passwordMatch && <span className="error">비밀번호가 일치하지 않습니다.</span>}
            <input className="long-input" type="password" value={formData.confirmPassword} onChange={(e) => {setFormData({ ...formData, confirmPassword: e.target.value });
                                                                                      setPasswordMatch(false);}} onBlur={handlePasswordMatch} />
          </label>
      </div>

      <div className="input-box">
          <label>
            이름:
            <input className="long-input" type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          </label>
      </div>

      <div className="input-box">
          <label>
            생년월일:
            <input className="long-input" type="date" value={formData.birth} onChange={(e) => setFormData({ ...formData, birth: e.target.value })} />
          </label>
      </div>

      <div className="input-box">
          <label>
            주소:
            <input className="long-input" type="text" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
          </label>
      </div>

      <div className="input-box">
          <label>
            상세주소:
            <input className="long-input" type="text" value={formData.detailAddress} onChange={(e) => setFormData({ ...formData, detailAddress: e.target.value })} />
          </label>
      </div>

      <div className="input-box">
          <label>
            이메일: {emailAvailable && <span className="complete">확인완료</span>}
            <input className="long-input" type="email" value={formData.email} onChange={(e) => {setFormData({ ...formData, email: e.target.value });
                                                                        setEmailAvailable(false);}} />
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

            <button className="center-button">인증 하기</button>

          </div>

    <div className="input-box">
      <label>
        인증번호 입력:
        <input className="long-input" type="text" value={formData.verificationCode} onChange={(e) => {setFormData({ ...formData, verificationCode: e.target.value });
                                                                               // setPhoneVerified(false);}} />
                                                                               setPhoneVerified(true);}} />
      </label>
      <button className="center-button">확인</button>
    </div>

      <div className="input-box">
          <label>
            기업명:
            <input className="long-input" type="text" value={formData.compName} onChange={(e) => setFormData({ ...formData, compName: e.target.value })} />
          </label>
      </div>

      <div className="input-box">
          <label>
            사업자번호:
            <input className="long-input" type="text" value={formData.businessNum} onChange={(e) => setFormData({ ...formData, businessNum: e.target.value })} />
          </label>
      </div>

      <div className="input-box">
          <label>
            대표자명:
            <input className="long-input" type="text" value={formData.representative} onChange={(e) => setFormData({ ...formData, representative: e.target.value })} />
          </label>
      </div>

      <div className="input-box">
          <label>
            기업주소:
            <input className="long-input" type="text" value={formData.compAddress} onChange={(e) => setFormData({ ...formData, compAddress: e.target.value })} />
          </label>
      </div>

      <div className="signup-button">
          <button onClick={handleSignUp}>가입하기</button>
      </div>
    </div>
  );
};

export default CompSignUp;
