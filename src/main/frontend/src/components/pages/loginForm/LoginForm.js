import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginForm.css";

const LoginForm = () => {
    const navigate = useNavigate();
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
                sessionStorage.setItem("id", response.data.id);
                sessionStorage.setItem("state", response.data.state);
                navigate(-1);
            } else {
                alert("알 수 없는 오류")
            }
        })
        .catch(error => {
            alert("아이디 또는 비밀번호를 확인해주세요.")
            console.log(error.data);
        });

    };

    const handleFindIdClick = () => {
        navigate('/find-id');
    };

    const handleFindPwdClick = () => {
            navigate('/find-pwd');
        };


    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            onLogin(e);
        }
    }

    useEffect(() => {
        if (sessionStorage.getItem("id") != null) {
            navigate('/');
        }
    }, []);

    return (
        <div className="LoginForm-compo">
            <div className="form-box">
                <div className="login-text">
                    <h1>로그인</h1>
                </div>
                <div className="input-row">
                    <input
                        type="text"
                        onChange={(e) => setLoginForm({ ...loginForm, id: e.target.value })}
                        placeholder="아이디 입력"
                        onKeyPress={handleKeyPress}
                    />
                    <input
                        type="password"
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        placeholder="비밀번호 입력"
                        onKeyPress={handleKeyPress}
                    />
                </div>
                <div className="button-row">
                    <button onClick={onLogin}>로그인</button>
                    <Link to="/signup">
                        <button>회원가입</button>
                    </Link>
                </div>
                <div className="extra-buttons">
                    <button onClick={handleFindIdClick}>아이디 찾기</button>
                    <button onClick={handleFindPwdClick}>비밀번호 찾기</button>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
