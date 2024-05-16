import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../baseComponents/Button";
import "./VisualAssetManager.css";

const VisualAssetManager = ({ asset, itemToEdit, close }) => {
  const [formData, setFormData] = useState({
    num: null,
    image: null,
    title: "",
    state: "", 
    content: "", 
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
  });

  useEffect(() => {
    if (itemToEdit) {
      setFormData(itemToEdit);
    }
  }, [itemToEdit]);

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
      var imageUrl = null;
      if (!itemToEdit || formData.image !== itemToEdit.image) {
        const formDataToSend = new FormData();
        formDataToSend.append("file", formData.image);
    
        // axios를 이용해서 파일을 서버에 업로드합니다.
        const uploadResponse = await axios.post(`/upload`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data", // content type을 반드시 multipart/form-data로 설정해야 합니다.
          },
        });

        imageUrl = uploadResponse.data;
      }
  
      // 파일 업로드가 성공하면, 나머지 정보를 가지고 다시 서버로 요청합니다.
      const dataToSend = {
        num: formData.num,
        title: formData.title,
        state: formData.state,
        content: formData.content,
        startDate: formData.startDate,
        startTime: formData.startTime,
        endDate: formData.endDate,
        endTime: formData.endTime,
        image: imageUrl, // 업로드된 이미지의 URL을 받아서 함께 보냅니다.
      };

      let addResponse;
      if (itemToEdit) {
        addResponse = await axios.post(`/admin/${assetStr}/update`, dataToSend);
      } else {
        addResponse = await axios.post(`/admin/${assetStr}/add`, dataToSend);
      }

      alert(addResponse.data);
      setFormData({
        num: null,
        image: null,
        title: "",
        state: "",
        content: "",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
      });

      window.location.reload();

    } catch (error) {
      console.error("파일 업로드 및 추가 요청 오류:", error);
      alert("파일 업로드 및 추가 요청에 실패했습니다. 오류: " + error.message);
    }
  };


  return (
    <div className="VisualAssetManager-compo">
      <div className="head">
        <h2>{asset} {itemToEdit ? "수정" : "추가"}</h2>
        <Button text="닫기" onClick={close} className='btn-two cyan rounded' />
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          이미지 파일:
          <input
            type="file"
            name="image"
            onChange={handleFileUpload}
            required={!itemToEdit}
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
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
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
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                required
              />
            </label>
          </div>
        )}
        <button type="submit">{itemToEdit ? "저장" : "추가"}</button>
      </form>
    </div>
  );
};

export default VisualAssetManager;
