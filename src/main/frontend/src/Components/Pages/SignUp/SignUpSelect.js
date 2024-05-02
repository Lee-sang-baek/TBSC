import React from "react";
import { Link } from "react-router-dom"; // Routes import 추가
import "./SignUpSelect.css";
import logoImage from "../../Imgs/logo.png";

const SignUpSelect = () => {
  return (
    <div className="SignUpSelect">
        <div className="left-section">
          <h2>일반 회원가입</h2>
          <div className="logo-box"><img src={logoImage} /></div>
          <Link to="/normal-signup">
            <button className="go-button">회원가입</button>
          </Link>
        </div>
        <div className="right-section">
          <h2>기업전용 회원가입</h2>
          <div className="logo-box"><img src={logoImage} /></div>
          <Link to="/company-signup">
            <button className="go-button">회원가입</button>
          </Link>
        </div>
      </div>
  );
};

export default SignUpSelect;
