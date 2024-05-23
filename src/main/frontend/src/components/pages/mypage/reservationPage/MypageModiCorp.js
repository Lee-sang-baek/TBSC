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

    const [memberInfo, setMemberInfo] = useState([{
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
    }]);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        compImage: "",
        memberId: memberId,
        writer: "",
        corpName: "",
    });

    // const [registInfo, setRegistInfo] = useState([{
    //     title: "",
    //     num: "",
    //     corpImage: "",
    //     view: "",
    //     date: "",
    //     content: "",
    // }]);

    useEffect(() => {
        if (memberId) {
            getMemberInfo();
        }
    }, [memberId]); // memberId가 변경되면 getMemberInfo 함수를 호출합니다.

    const getMemberInfo = () => {
        axios.get("/myPage/member/getMember?id=" + memberId)
            .then((res) => {
                console.log(res.data);
                setMemberInfo({...res.data})
            });
    };

    if (!memberId) {
        return (
            <div className="rental-compo">
                <div className="rental-compo-in">
                    <h1>로그인 후 이용해주세요</h1>
                </div>
            </div>
        );
    }

    const onChange = () => {
        const data = editorRef.current.getInstance().getHTML();
        setFormData({...formData, content: data});
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);

        if (file) {
            setCorpImage(URL.createObjectURL(file));
        }
    };

    const onUploadImage = async (blob, callback) => {
        try {
            /*
             * 1. 에디터에 업로드한 이미지를 FormData 객체에 저장
             *    (이때, 컨트롤러 uploadEditorImage 메서드의 파라미터인 'image'와 formData에 append 하는 key('image')값은 동일해야 함)
             */
            const formData = new FormData();
            formData.append('image', blob);

            // 2. FileApiController - uploadEditorImage 메서드 호출
            const response = await fetch('/tui-editor/image-upload', {
                method: 'POST',
                body: formData,
            });

            // 3. 컨트롤러에서 전달받은 디스크에 저장된 파일명
            const filename = await response.text();
            console.log('서버에 저장된 파일명 : ', filename);

            // 4. addImageBlobHook의 callback 함수를 통해, 디스크에 저장된 이미지를 에디터에 렌더링
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

            // axios를 이용해서 파일을 서버에 업로드합니다.
            const uploadResponse = await axios.post(`/upload/registCorp`, formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data", // content type을 반드시 multipart/form-data로 설정해야 합니다.
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

    return (
        <div className="modiCorp-compo">
            <h1 className="pageTitle">등록 기업정보</h1>

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
                                <img className="corpImg" src={baseImage} alt=""/>
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

                    <div className="submitButton">
                        <Button text="등록" onClick={handleSubmit}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModiCorp;