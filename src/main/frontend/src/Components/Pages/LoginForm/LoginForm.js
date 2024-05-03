import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./LoginForm.css";

const LoginForm = () => {
    const [loginForm, setLoginForm] = useState({
        id: "",
        password: "",
    });

    const onLogin = async (e) => {
        e.preventDefault();

        axios.post("/login", loginForm)
        .then(response => {
            if (response.status === 200) {
                console.log(response.data);
                alert(response.data.id + "님 안녕하세요.")
                window.location.reload();   // 새로고침
                sessionStorage.setItem("id", response.data.id);
                sessionStorage.setItem("state", response.data.state);
            } else {
                alert("알 수 없는 오류")
            }
        })
        .catch(error => {
            alert("아이디 또는 비밀번호를 확인해주세요.")
            console.log(error.data);
        });

    };

  return (
    <div className="LoginForm-compo">
        <div className="login-text">
            <h2>로그인</h2>
        </div>
      <div className="input-row">
        <input type="text" onChange={(e) => {setLoginForm({ ...loginForm, id: e.target.value })}} placeholder="아이디 입력" />
        <input type="password" onChange={(e) => {setLoginForm({ ...loginForm, password: e.target.value })}} placeholder="비밀번호 입력" />
      </div>
      <div className="button-row">
        <button onClick={onLogin}>로그인</button>
        <Link to="/signup">
            <button>회원가입</button>
        </Link>
      </div>
      <div className="extra-buttons">
          <button>아이디 찾기</button>
          <button>비밀번호 찾기</button>
        </div>
      <div className="social-login">
        <p>통합 로그인</p>
        <div className="social-icons">
          <button>G</button>
          <button>N</button>
          <button>K</button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
