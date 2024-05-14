import React, { useState } from "react";
import axios from "axios";
import "./VisualAssetManager.css";

const VisualAssetManager = ({ asset }) => {
  const [formData, setFormData] = useState({
    image: null,
    title: "",
    state: "", 
    content: "", 
    startDate: "", 
    endDate: "" 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let assetStr = "";
    if (asset === "메인 이미지") {
      assetStr = "mainImage";
    } else if (asset === "베너") {
      assetStr = "banner";
    } else {
      assetStr = "popup";
    }
  
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("file", formData.image);
  
      // axios를 이용해서 파일을 서버에 업로드합니다.
      const uploadResponse = await axios.post(`/upload`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data", // content type을 반드시 multipart/form-data로 설정해야 합니다.
        },
      });
  
      // 파일 업로드가 성공하면, 나머지 정보를 가지고 다시 서버로 요청합니다.
      const dataToSend = {
        title: formData.title,
        state: formData.state,
        content: formData.content,
        startDate: formData.startDate,
        endDate: formData.endDate,
        image: uploadResponse.data, // 업로드된 이미지의 URL을 받아서 함께 보냅니다.
      };
  
      const addResponse = await axios.post(`/admin/${assetStr}/add`, dataToSend);
      alert(addResponse.data);
      setFormData({
        image: null,
        title: "",
        state: "",
        content: "",
        startDate: "",
        endDate: ""
      });
    } catch (error) {
      console.error("파일 업로드 및 추가 요청 오류:", error);
      alert("파일 업로드 및 추가 요청에 실패했습니다. 오류: " + error.message);
    }
  };


  return (
    <div className="VisualAssetManager-compo">
      <h2>{asset} 추가</h2>
      <form onSubmit={handleSubmit}>
        <label>
          이미지 파일:
          <input
            type="file"
            name="image"
            onChange={handleFileUpload}
            required
          />
        </label>
        <label>
          제목:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>
        {asset === "베너" && (
          <label>
            구분:
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            >
              <option value="">구분 선택</option>
              <option value="SIDE">사이드베너</option>
              <option value="MAIN">메인베너</option>
            </select>
          </label>
        )}
        {asset === "팝업" && (
          <div>
            <label>
              시작일:
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              종료일:
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </label>
          </div>
        )}
        {asset === "베너" && (
          <label>
            내용:
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
            />
          </label>
        )}
        <button type="submit">추가</button>
      </form>
    </div>
  );
};

export default VisualAssetManager;
