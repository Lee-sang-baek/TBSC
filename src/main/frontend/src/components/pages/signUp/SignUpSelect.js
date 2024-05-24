import React from "react";
import { Link } from "react-router-dom"; // Routes import 추가
import "./SignUpSelect.css";
import userProfile from "../../imgs/userProfile.png";
import compProfile from "../../imgs/pngwing.com.png";

const SignUpSelect = () => {
  return (
    <div className="SignUpSelect-compo">
        <div className="left-section">
          <h2>일반 회원가입</h2>
          <div className="logo-box"><img src={userProfile} alt={userProfile} /></div>
          <Link to="/signup/normal">
            <button className="go-button">회원가입</button>
          </Link>
        </div>
        <div className="right-section">
          <h2>기업전용 회원가입</h2>
          <div className="logo-box"><img src={compProfile} alt={compProfile} /></div>
          <Link to="/signup/company">
            <button className="go-button">회원가입</button>
          </Link>
        </div>
      </div>
  );
};

export default SignUpSelect;
