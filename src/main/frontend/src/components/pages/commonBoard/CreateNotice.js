import React, { useState, useEffect } from "react";
import CustomEditor from "./CustomEditor";
import "./CreateNotice.css";
import Button from "../../baseComponents/Button";

function CreateNotice({memberId, memberState}) {
    const [title, setTitle] = useState("");
    const [state, setState] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState(new Date());
    const [imageUrl, setImageUrl] = useState("");
    const [fileUrl, setFileUrl] = useState("");

    // Handle input changes
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
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

    const handleImageUrlChange = (url) => {
        setImageUrl(url);
    };

    const handleSubmit = async () => {
        const data = {
            title,
            "id": memberId,
            state,
            content,
            fileUrl,
            imageUrl,
            date
        };

        console.log("Submitting data:", data);

        try {
            const response = await fetch("/api/notices/create", {
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

    // Only render the form if memberState is "ADMIN"
    if (memberState !== "ADMIN") {
        return (
            <div className="unauthorized-container">
                <h1>접근 권한이 없습니다.</h1>
            </div>
        );
    }

    return (
    <div className="CreateNotice-compo">
        <div className="create-notice-container">
            <div className="title-haebin">
                <label>제목:</label>
                <div className="form-group">
                    <input className="input-wmemberIdth-set" type="title" value={title} onChange={handleTitleChange} />
                </div>
            </div>
            <div className="form-group">
                <label>작성자: {memberId}</label>
            </div>
            <div className="form-group">
                <label>진행중:</label>
                <input type="radio" name="state" value="진행중" checked={state === "진행중"} onChange={handleStateChange} />
                <label>마감:</label>
                <input type="radio" name="state" value="마감" checked={state === "마감"} onChange={handleStateChange} />
            </div>
            <CustomEditor
                handleContentChange={handleContentChange}
                handleFileUrlChange={handleFileUrlChange}
                handleImageUrlChange={handleImageUrlChange}
            />

            <Button onClick={handleSubmit} text="작성" />
        </div>
    </div>
    );
}

export default CreateNotice;
