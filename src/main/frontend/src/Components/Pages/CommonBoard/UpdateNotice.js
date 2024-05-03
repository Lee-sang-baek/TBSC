import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import CustomEditor from "./CustomEditor";
import Header from "../../Fragments/Header/Header";
import "./CreateNotice.css";
import Button from "../../BaseComponents/Button";
import Input from "../../BaseComponents/Input";

function UpdateNotice() {
    const { num,setNum } = useParams(); // Use useParams to get the route parameter
    const [title, setTitle] = useState("");
    const [id, setId] = useState("");
    const [state, setState] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState(new Date());
    const [fileUrl, setFileUrl] = useState("");

    useEffect(() => {
        const fetchNotice = async () => {
            const response = await fetch(`/notices/${num}`);
            if (response.ok) {
                const data = await response.json();

                setTitle(data.title);
                setId(data.id);
                setState(data.state);
                setContent(data.content);
                setDate(new Date(data.date));
                setFileUrl(data.fileUrl); // Ensure this is set so the editor can use it
            }
        };
        fetchNotice();
    }, [num]);

    const handleSubmit = async () => {
        const data = { title, id, state, content, fileUrl, date };

        try {
            const response = await fetch(`/notices/update/${num}`, {
                method: "PUT", // Change this from "POST" to "PUT"
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                console.log("글이 성공적으로 수정되었습니다.");
                window.location.href = "/notices";
            } else {
                console.error("글 수정 실패", await response.text());
            }
        } catch (error) {
            console.error("서버와의 통신 중 오류 발생", error);
        }
    };


    return (
        <div className="UpdateNotice-compo">
            <div className="create-notice-container">
                <div className="form-group">
                    <label>제목:</label>
                    <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>작성자:</label>
                    <Input type="text" value={id} onChange={(e) => setId(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>진행중:</label>
                    <input type="radio" name="state" value="진행중" checked={state === "진행중"} onChange={(e) => setState(e.target.value)} />
                    <label>마감:</label>
                    <input type="radio" name="state" value="마감" checked={state === "마감"} onChange={(e) => setState(e.target.value)} />
                </div>
                <CustomEditor
                    initialContent={content}
                    handleContentChange={setContent}
                    handleFileUrlChange={setFileUrl}
                />

                <Button onClick={handleSubmit} text="수정" />
            </div>
        </div>
    );
}

export default UpdateNotice;
