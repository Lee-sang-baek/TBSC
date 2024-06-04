import React, { useState } from "react";
import axios from "axios";
import "./BusinessUpgrade.css";

const BusinessUpgrade = () => {
    const [formData, setFormData] = useState({
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
                // 업그레이드 성공 시 추가적인 로직을 작성할 수 있음
            })
            .catch(error => {
                alert("기업 회원 업그레이드 실패");
                console.error(error);
            });
    };

    return (
        <div className="BusinessUpgrade-container">
            <h2>기업 회원으로 업그레이드</h2>
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
                <button onClick={handleUpgrade}>회원 업그레이드</button>
            </div>
        </div>
    );
};

export default BusinessUpgrade;
