import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './customQuillStyles.css';

const CustomEditor = ({ handleContentChange }) => {
    const [content, setContent] = useState('');
    const quillRef = useRef();

    const handleChange = (value) => {
        setContent(value);
        handleContentChange(value);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            fetch('notices/create', {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    const range = quillRef.current.getEditor().getSelection();
                    const url = data.url; // 실제 응답에서 파일 URL을 추출해야 합니다.

                    quillRef.current.getEditor().insertEmbed(range.index, 'image', url);
                })
                .catch(error => {
                    console.error('Error uploading file:', error);
                });
        }
    };

    return (
        <div>
            <ReactQuill
                theme="snow"
                value={content}
                onChange={handleChange}
                modules={{
                    toolbar: [
                        [{ 'font': [] }],
                        [{ 'header': '1' }, { 'header': '2' }, { 'header': '3' }, { 'header': '4' }, { 'header': '5' }, { 'header': '6' }],
                        [{ 'color': [] }, { 'background': [] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        [{ 'align': [] }],
                        ['link', 'image', 'video', 'blockquote', 'code-block'],
                        ['clean']
                    ],
                }}
                formats={[
                    'header', 'font', 'size',
                    'bold', 'italic', 'underline', 'strike', 'blockquote',
                    'list', 'bullet', 'indent',
                    'link', 'image', 'video'
                ]}
                ref={quillRef}
            />
            <input type="file" onChange={handleFileUpload} />
        </div>
    );
};

export default CustomEditor;
