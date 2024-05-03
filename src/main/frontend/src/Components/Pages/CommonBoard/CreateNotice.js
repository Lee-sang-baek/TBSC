import React, { useState } from "react";
import CustomEditor from "./CustomEditor";
import "./CreateNotice.css";
import Header from "../../Fragments/Header/Header";

function CreateNotice() {
    const [title, setTitle] = useState("");
    const [id, setId] = useState("");
    const [state, setState] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState(new Date());
    const [fileUrl, setFileUrl] = useState("");

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleIdChange = (e) => {
        setId(e.target.value);
    };

    const handleStateChange = (e) => {
        setState(e.target.value);
    };

    const handleContentChange = (content) => {
        setContent(content);
    };

    const handleFileUrlChange = (url) => {
        setFileUrl(url);
    };

    const handleSubmit = async () => {
        const data = {
            title,
            id,
            state,
            content,
            fileUrl,
            date
        };

        console.log("Submitting data:", data);

        try {
            const response = await fetch("/notices/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                console.log("게시글이 성공적으로 작성되었습니다.");
                window.location.href = "/notices";
            } else {
                console.error("게시글 작성에 실패했습니다.");
            }
        } catch (error) {
            console.error("서버와의 통신 중 오류가 발생했습니다.", error);
        }
    };

    return (
        <div className="CreateNotice-compo">
            <div className="create-notice-container">
                <div className="form-group">
                    <label>제목:</label>
                    <input type="text" value={title} onChange={handleTitleChange}/>
                </div>
                <div className="form-group">
                    <label>작성자:</label>
                    <input type="text" value={id} onChange={handleIdChange}/>
                </div>
                <div className="form-group">
                    <label>진행중:</label>
                    <input type="radio" name="state" value="진행중" checked={state === "진행중"} onChange={handleStateChange}/>
                    <label>마감:</label>
                    <input type="radio" name="state" value="마감" checked={state === "마감"} onChange={handleStateChange}/>
                </div>
                <CustomEditor handleContentChange={handleContentChange} handleFileUrlChange={handleFileUrlChange}/>
                <button onClick={handleSubmit}>작성</button>
            </div>
        </div>
    );
}

export default CreateNotice;
