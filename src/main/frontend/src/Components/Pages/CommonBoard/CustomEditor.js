import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Ensure Quill CSS is included

const CustomEditor = ({ initialContent, handleContentChange, initialFileUrl, handleFileUrlChange }) => {
    const [content, setContent] = useState(initialContent || "");
    const [fileUrl, setFileUrl] = useState(initialFileUrl);
    const quillRef = useRef(null);

    useEffect(() => {
        setContent(initialContent);
        setFileUrl(initialFileUrl);
    }, [initialContent, initialFileUrl]);

    const handleChange = (value) => {
        setContent(value);
        handleContentChange(value);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            fetch("/notices/upload", {
                method: "POST",
                body: formData,
            })
                .then(response => response.text())
                .then(url => {
                    if (url) {
                        console.log("Received URL: ", url);
                        setFileUrl(url);
                        handleFileUrlChange(url);
                    } else {
                        console.error("Received empty URL");
                    }
                })
                .catch(error => {
                    console.error("Error uploading file:", error);
                });
        }
    };

    return (
        <div className="CreateNotice-compo">
            <ReactQuill
                ref={quillRef}
                theme="snow"
                value={content}
                onChange={handleChange}
                modules={CustomEditor.modules}
                formats={CustomEditor.formats}
            />
            {fileUrl && (
                <div>
                    Current File: <a href={fileUrl} target="_blank" rel="noopener noreferrer">View</a>
                </div>
            )}
            <input type="file" onChange={handleFileUpload} />
        </div>
    );
};

// Define Quill"s toolbar options
CustomEditor.modules = {
    toolbar: [
        [{ "header": "1"}, {"header": "2"}, { "font": [] }],
        [{ "size": [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{"list": "ordered"}, {"list": "bullet"}, {"indent": "-1"}, {"indent": "+1"}],
        ["link", "image", "video"],
        ["clean"]
    ],
};
CustomEditor.formats = [
    "header", "font", "size",
    "bold", "italic", "underline", "strike", "blockquote",
    "list", "bullet", "indent",
    "link", "image", "video"
];

export default CustomEditor;
