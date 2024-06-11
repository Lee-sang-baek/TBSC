import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Button from "../../baseComponents/Button";
import "./VisualAssetManager.css";
import {Editor} from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

const VisualAssetManager = ({ asset, itemToEdit, close }) => {

  const [formData, setFormData] = useState({
    num: null,
    image: null,
    title: "",
    state: "",
    content: "",
    start: "",
    end: "",
  });
  const [content, setContent] = useState("");
  const editorRef = useRef();

  useEffect(() => {
    if (itemToEdit) {
      setFormData(itemToEdit);
      setContent(itemToEdit.content)
    }
  }, [itemToEdit]);

  useEffect(() => {
    if (formData.content) {
      editorRef.current.getInstance().setHTML(formData.content);
    }
  }, [content]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContentChange = () => {
    const data = editorRef.current.getInstance().getHTML();
    setFormData({...formData, content: data});
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
    } else if (asset === "팝업") {
      assetStr = "popup";
    } else {
      console.log(asset);
      return;
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
        start: formData.start,
        end: formData.end,
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
        start: "",
        end: "",
      });
      
      close();
      // window.location.reload();

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
        <label className="lab">
          이미지 파일:
          <input
            type="file"
            name="image"
            onChange={handleFileUpload}
            required={!itemToEdit}
          />
        </label>
        <label className="lab">
          제목:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>
        <div className="lab">
            내용:
            <Editor
              placeholder="내용 입력"
              previewStyle="vertical"
              height="300px"
              initialEditType="wysiwyg"
              hideModeSwitch="true"
              plugins={[colorSyntax]}
              useCommandShortcut={false}
              language="ko-KR"
              ref={editorRef}
              onChange={handleContentChange}
              toolbarItems={[
                  ['heading', 'bold', 'italic', 'strike'],
                  ['hr', 'quote'],
                  ['ul', 'ol', 'task'],
                  ['table', 'link'],
                  ['code', 'codeblock'],
              ]}
            />
          </div>
          <label className="lab">
            시작일:
            <input
              type="datetime-local"
              name="start"
              value={formData.start}
              onChange={handleChange}
              required
            />
          </label>
          <label className="lab">
            종료일:
            <input
              type="datetime-local"
              name="end"
              value={formData.end}
              onChange={handleChange}
              required
            />
          </label>
        <button type="submit">{itemToEdit ? "저장" : "추가"}</button>
      </form>
    </div>
  );
};

export default VisualAssetManager;
