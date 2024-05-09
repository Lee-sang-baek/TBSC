import React, { useState } from "react";
import Button from "../../BaseComponents/Button";
import "./SiteManagement.css";
import logoImage from "../../Imgs/logo.png";

const SiteManagement = () => {

    const [selectedSection, setSelectedSection] = useState("mainImg"); // 현재 선택된 섹션 상태

    const toggleSection = (section) => {
        setSelectedSection(section === selectedSection ? null : section); // 선택된 섹션이 현재 선택된 섹션과 같으면 null로 설정하여 토글
    };

  return (
    <div className="SiteManagement-compo">
      <h2>사이트 관리</h2>

      <div className="management-button">
        <button onClick={() => toggleSection("mainImg")} className={selectedSection === "mainImg" ? "active" : "de-active"}>메인 이미지 관리</button>
        <button onClick={() => toggleSection("banner")} className={selectedSection === "banner" ? "active" : "de-active"}>베너 관리</button>
        <button onClick={() => toggleSection("popup")} className={selectedSection === "popup" ? "active" : "de-active"}>팝업 관리</button>
      </div>

      <div className={selectedSection === "mainImg" ? "main-img" : "hidden"}>

        <div className="middle-box">
            <h3>메인 이미지 관리</h3>
            <div className="add-button">
                <Button text="+ 추가" className="btn-two blue rounded" />
            </div>
        </div>

      <table>
        <thead>
            <tr>
                <th>이미지</th>
                <th>이름</th>
                <th>내용</th>
                <th>기간</th>
                <th>수정</th>
                <th>제거</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><img src={logoImage} /></td>
                <td>홈페이지 이미지1</td>
                <td>없음</td>
                <td>없음</td>
                <td>수정</td>
                <td>제거</td>
            </tr>
        </tbody>
      </table>

      </div>

      <div className={selectedSection === "banner" ? "banner" : "hidden"}>

          <div className="middle-box">
              <h3>베너 관리</h3>
              <div className="add-button">
                  <Button text="+ 추가" className="btn-two blue rounded" />
              </div>
          </div>

        <table>
          <thead>
              <tr>
                  <th>이미지</th>
                  <th>이름</th>
                  <th>내용</th>
                  <th>기간</th>
                  <th>수정</th>
                  <th>제거</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td><img src={logoImage} /></td>
                  <td>베너 이미지1</td>
                  <td>배너 내용</td>
                  <td>없음</td>
                  <td>수정</td>
                  <td>제거</td>
              </tr>
          </tbody>
        </table>

        </div>

        <div className={selectedSection === "popup" ? "popup" : "hidden"}>

            <div className="middle-box">
                <h3>팝업 관리</h3>
                <div className="add-button">
                    <Button text="+ 추가" className="btn-two blue rounded" />
                </div>
            </div>

          <table>
            <thead>
                <tr>
                    <th>이미지</th>
                    <th>이름</th>
                    <th>내용</th>
                    <th>기간</th>
                    <th>수정</th>
                    <th>제거</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><img src={logoImage} /></td>
                    <td>팝업 이미지1</td>
                    <td>팝업 내용</td>
                    <td>오늘부터 내일까지~</td>
                    <td>수정</td>
                    <td>제거</td>
                </tr>
            </tbody>
          </table>

          </div>

    </div>
  );
};

export default SiteManagement;