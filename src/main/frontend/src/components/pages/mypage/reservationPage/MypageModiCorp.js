import React, {useEffect, useRef, useState} from "react";
import "./MypageModiCorp.css";
import Button from "../../../baseComponents/Button";
import axios from "axios";
import {Editor} from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import baseImage from "../../../imgs/pngwing.com (1).png";

const ModiCorp = (props) => {
    const memberId = sessionStorage.getItem("id");

    const [selectedFile, setSelectedFile] = useState(null);
    const [corpImage, setCorpImage] = useState(null);

    const editorRef = useRef();

    const [memberInfo, setMemberInfo] = useState({
        memberId: "",
        num: "",
        comp_name: "",
        gender: "",
        endDate: "",
        startDate: "",
        place: "",
        prepare: "",
        purpose: "",
        state: ""
    });

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        compImage: "",
        memberId: memberId,
        writer: "",
        corpName: "",
    });

    const [registInfo, setRegistInfo] = useState({});

    useEffect(() => {
        if (memberId) {
            getMemberInfo();
            getRegistInfo();
        }
    }, [memberId]);

    const getMemberInfo = () => {
        axios.get("/myPage/member/getMember?id=" + memberId)
            .then((res) => {
                console.log(res.data);
                setMemberInfo({...res.data});
            });
    };

    const getRegistInfo = () => {
        axios.get("/registcomp/getComp?memberId=" + memberId)
            .then((res) => {
                console.log("res.data", res.data);
                const {title, writer, compImage, corpName, content, num} = res.data;
                setRegistInfo(res.data);
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    title,
                    writer,
                    compImage,
                    corpName,
                    content,
                    num,
                }));
            })
            .catch((error) => {
                if (error.response && error.response.status === 404) {
                    setRegistInfo({});
                    console.log(registInfo);
                } else {
                    // 다른 오류에 대한 처리
                    console.error("오류 발생:", error);
                }
            });
    };

    const onChange = () => {
        const data = editorRef.current.getInstance().getHTML();
        setFormData({...formData, content: data});
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);

        if (file) {
            // 파일이 선택되면 이미지 미리보기를 업데이트합니다.
            setCorpImage(URL.createObjectURL(file));
            // 선택된 파일을 formData에도 설정합니다.
            setFormData({...formData, compImage: file});
        }
    };

    const onUploadImage = async (blob, callback) => {
        try {
            const formData = new FormData();
            formData.append('image', blob);

            const response = await fetch('/tui-editor/image-upload', {
                method: 'POST',
                body: formData,
            });

            const filename = await response.text();
            console.log('서버에 저장된 파일명 : ', filename);

            const imageUrl = `/tui-editor/image-print?filename=${filename}`;
            callback(imageUrl, 'image alt attribute');

        } catch (error) {
            console.error('업로드 실패 : ', error);
        }
        console.log(blob);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let imageFile = "";
        if (selectedFile) {
            const formDataToSend = new FormData();
            formDataToSend.append("file", selectedFile);

            const uploadResponse = await axios.post(`/upload/registCorp`, formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            imageFile = uploadResponse.data;
        }
        try {
            console.log(formData);
            await axios.post('/registcomp/create', {...formData, compImage: imageFile});
            setFormData({});
            alert('게시글이 작성되었습니다');
            window.location.href = '/myPage/corp-info';
        } catch (error) {
            console.error("There was an error creating the notice!", error);
        }
    };

    const handleModify = async (e) => {
        e.preventDefault();
        let imageFile = "";
        // 새로운 파일이 선택되었을 때에만 이미지를 업로드합니다.
        if (selectedFile) {
            const formDataToSend = new FormData();
            formDataToSend.append("file", selectedFile);

            const uploadResponse = await axios.post(`/upload/registCorp`, formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            imageFile = uploadResponse.data;
        } else {
            // 새로운 파일이 선택되지 않았을 때에는 이전 이미지를 사용합니다.
            imageFile = registInfo.compImage;
        }
        try {
            console.log(formData);
            await axios.put(`/registcomp/${registInfo.num}`, {...registInfo, compImage: imageFile});
            setFormData({});
            alert('게시글이 작성되었습니다');
            window.location.href = '/myPage/corp-info';
        } catch (error) {
            console.error("There was an error creating the notice!", error);
        }
    };

    useEffect(() => {
        console.log(formData);
        // console.log("registInfo", registInfo);
        setRegistInfo({
            ...registInfo,
            title: formData.title,
            writer: formData.writer,
            compImage: formData.compImage,
            corpName: formData.corpName,
            content: formData.content,
            num: formData.num
        });
    }, [formData])

    useEffect(() => {
        if (formData.content) {
            editorRef.current.getInstance().setHTML(formData.content);
        }
    }, [registInfo.content]);

    if (!memberId) {
        return (
            <div className="rental-compo">
                <div className="rental-compo-in">
                    <h1>로그인 후 이용해주세요</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="ModiCorp-compo">
            <h1 className="pageTitle">기업정보 수정/등록</h1>

            <div className="pageInfo">
                <div className="corpContainer">
                    <div className="corpHeader">
                        <div className="corpTitle">
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                placeholder="기업제목"
                                required
                            />
                        </div>
                    </div>
                    <div className="corpContent">
                        <div className="corpImgContainer">
                            {corpImage ? (
                                <img className="corpImg" src={corpImage} alt=""/>
                            ) : (
                                <img className="corpImg" src={registInfo.compImage ? `/registFile/${registInfo.compImage}` : baseImage} alt=""/>
                            )}

                            <label htmlFor="file">
                                <div className="btn-upload">기업 이미지 선택</div>
                            </label>
                            <input type="file" name="file" id="file" accept="image/*" onChange={handleFileChange}
                                   required/>
                        </div>

                        <div className="corpInfo">
                            <div className="corpInfoTitle">
                                <div className="corpWriter">
                                    <div className="writerName">작성자:</div>
                                    <div className="writerNameBox">
                                        <input
                                            type="text"
                                            value={formData.writer}
                                            onChange={(e) => setFormData({...formData, writer: e.target.value})}
                                            placeholder="작성자 이름"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="corpState">
                                    <div className="stateName">소속:</div>
                                    <div className="stateNameBox">
                                        <input
                                            type="text"
                                            value={formData.corpName}
                                            onChange={(e) => setFormData({...formData, corpName: e.target.value})}
                                            placeholder="소속 명"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="corpInfoContent">
                                <Editor
                                    placeholder="내용 입력"
                                    previewStyle="vertical"
                                    height="600px"
                                    initialEditType="wysiwyg"
                                    hideModeSwitch="true"
                                    plugins={[colorSyntax]}
                                    useCommandShortcut={false}
                                    language="ko-KR"
                                    ref={editorRef}
                                    onChange={onChange}
                                    hooks={{
                                        addImageBlobHook: onUploadImage
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    {!registInfo.num || Object.keys(registInfo).length === 0 ? (
                        <div className="submitButton">
                            <Button text="등록" onClick={handleSubmit}/>
                        </div>
                    ) : (
                        <div className="submitButton">
                            <Button text="수정" onClick={handleModify}/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModiCorp;