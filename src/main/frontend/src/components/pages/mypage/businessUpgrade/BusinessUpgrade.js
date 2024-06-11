import React, { useState } from "react";
import axios from "axios";
import "./BusinessUpgrade.css";
import { useNavigate } from "react-router";

const BusinessUpgrade = ({memberId, memberState}) => {
    const navigate = useNavigate();

    if (memberId === null || memberState === "COMP") {
        window.location.href = "/";
    }

    const [formData, setFormData] = useState({
        memberId: memberId,
        compName: "",
        businessNum: "",
        representative: "",
        compAddress: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpgrade = () => {
        // 기업 회원 업그레이드를 위한 요청을 보냄
        axios.post("/member/compUpgrade", formData)
            .then(response => {
                alert(response.data);
                navigate("/myPage");
            })
            .catch(error => {
                alert(error.data);
                navigate("/myPage");
            });
    };

    return (
        <div className="BusinessUpgrade-compo">
            <div className="form-box">
                <div className="title-box">
                    <h2>기업 회원 전환 신청</h2>
                </div>
                <div className="input-box">
                    <label>
                        기업명:
                        <input
                            type="text"
                            name="compName"
                            value={formData.compName}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <div className="input-box">
                    <label>
                        사업자번호:
                        <input
                            type="text"
                            name="businessNum"
                            value={formData.businessNum}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <div className="input-box">
                    <label>
                        대표자명:
                        <input
                            type="text"
                            name="representative"
                            value={formData.representative}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <div className="input-box">
                    <label>
                        기업주소:
                        <input
                            type="text"
                            name="compAddress"
                            value={formData.compAddress}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <div className="button-container">
                    <button onClick={handleUpgrade}>신청 제출</button>
                </div>
            </div>
        </div>
    );
};

export default BusinessUpgrade;
