import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Ensure Quill CSS is included

const CustomEditor = ({ initialContent, handleContentChange, initialFileUrl, handleFileUrlChange, handleImageUrlChange }) => {
    const [content, setContent] = useState(initialContent || "");
    const quillRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        setContent(initialContent);
    }, [initialContent, initialFileUrl]);


    const handleChange = (value) => {
        setContent(value);
        handleContentChange(value);
    };

    const handleFileUpload = (e, isImage) => {
        const file = e.target.files[0];
        if (file) {
            if (isImage) {
                setImagePreview(URL.createObjectURL(file));
            }
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
                        if (isImage) {
                            handleImageUrlChange(url);
                        } else {
                            handleFileUrlChange(url);
                        }
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
        <div className="CustomEditor-compo">
            <ReactQuill
                style={{width: "100%", height: "600px"}}
                ref={quillRef}
                theme="snow"
                value={content}
                onChange={handleChange}
                modules={CustomEditor.modules}
                formats={CustomEditor.formats}
            />
            {imagePreview && (
                <div className="detail-image">
                    <img
                        src={imagePreview}
                        alt="selected image"
                    />
                </div>
            )}

            <input
                type="file"
                onChange={(e) => handleFileUpload(e, true)}
                className="file-upload-input"
                style={{position: 'relative', zIndex: 1000}}
            />

            <input
                type="file"
                onChange={(e) => handleFileUpload(e, false)}
                className="file-upload-input"
                style={{position: 'relative', zIndex: 1000}}
            />

        </div>

    );
};

// Define Quill"s toolbar options
CustomEditor.modules = {
    toolbar: [
        [{"header": "1"}, {"header": "2"}, {"font": []}],
        [{"size": []}],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{"list": "ordered"}, {"list": "bullet"}, {"indent": "-1"}, {"indent": "+1"}],
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
