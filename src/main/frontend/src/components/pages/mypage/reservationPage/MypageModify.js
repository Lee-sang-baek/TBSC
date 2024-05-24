import React, {useEffect, useState} from "react";
import "./MypageModify.css";
import Button from "../../../baseComponents/Button";
import Input from "../../../baseComponents/Input";
import axios from "axios";
// import Form from "../../../util/addressSearch/Form";

const ModiInfo = (props) => {
    const memberId = sessionStorage.getItem("id");
    const memberState = sessionStorage.getItem("state");

    const [passwordMatch, setPasswordMatch] = useState(true);
    const [birth, setBirth] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');

    const [compName, setCompName] = useState('');
    const [businessNum, setBusinessNum] = useState('');
    const [representative, setRepresentative] = useState('');
    const [compAddress, setCompAddress] = useState('');

    const [checkSignal, setCheckSignal] = useState(true);
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');

    const [memberInfo, setMemberInfo] = useState((memberState === "COMP") ? {
            id: "",
            password: "",
            confirmPassword: "",
            name: "",
            birth: "",
            address: "",
            detailAddress: "",
            email: "",
            phoneNum: "",

            compName: "",
            businessNum: "",
            representative: "",
            compAddress: "",

            verificationCode: "",
            emailCode: ""
        }
        : {
            id: "",
            password: "",
            confirmPassword: "",
            name: "",
            birth: "",
            address: "",
            detailAddress: "",
            email: "",
            phoneNum: "",
            verificationCode: "",
            emailCode: ""
        });

    // useEffect(() => {
    //     getMemberInfo();
    //
    //     setName(memberInfo.name);
    //     setBirth(memberInfo.birth);
    //     setPhone(memberInfo.phoneNum);
    //     setAddress(memberInfo.address);
    //     setDetailAddress(memberInfo.detailAddress);
    // }, []);

    useEffect(() => {
        if (memberId) {
            getMemberInfo();
        }
    }, [memberId]); // memberId가 변경되면 getMemberInfo 함수를 호출합니다.

    useEffect(() => {
        console.log("Updated memberInfo:", memberInfo);
        // memberInfo가 업데이트 되면 여기에서 처리하면 됩니다.
    }, [memberInfo]); // memberInfo가 변경될 때마다 실행됩니다.


    const getMemberInfo = () => {
        axios.get(`member/getMember?id=${memberId}`)
            .then((res) => {
                console.log(res.data);
                setMemberInfo(res.data);
                console.log(memberInfo);

                setName(res.data.name);
                setBirth(res.data.birth);
                setPhone(res.data.phoneNum);
                setAddress(res.data.address);
                setDetailAddress(res.data.detailAddress);

                setCompAddress(res.data.compAddress);
                setRepresentative(res.data.representative);
                setCompName(res.data.compName);
                setBusinessNum(res.data.businessNum);
            });
    }

    const [isValidPhoneNum, setIsValidPhoneNum] = useState(true);

    const handleSignUp = () => {
        const missingFields = [];

        const fieldNames = (memberState === "COMP") ? {
                id: "아이디",
                password: "비밀번호",
                confirmPassword: "비밀번호 확인",
                name: "이름",
                birth: "생년월일",
                address: "주소",
                detailAddress: "상세주소",
                email: "이메일",
                phoneNum: "전화번호",
            
                compName: "기업명",
                businessNum: "사업자번호",
                representative: "대표자명",
                compAddress: "기업주소",
                // verificationCode: "핸드폰인증번호",
                // emailCode: "이메일인증번호"
            }
            : {
                id: "아이디",
                password: "비밀번호",
                confirmPassword: "비밀번호 확인",
                name: "이름",
                birth: "생년월일",
                address: "주소",
                detailAddress: "상세주소",
                email: "이메일",
                phoneNum: "전화번호",
                // verificationCode: "인증번호"
            };

        for (const key in memberInfo) {
            if (memberInfo[key] === null || memberInfo[key] === "") {
                missingFields.push(fieldNames[key]);
            }
        }

        if (passwordMatch && isValidPhoneNum) {
            // 회원가입 데이터를 서버로 전송
            axios.post("/member/membermodify", memberInfo)
                .then(response => {
                    console.log(memberInfo);
                    alert(response.data);
                    console.log(response.data); // 회원가입 성공 시 처리
                    window.location.reload();
                })
                .catch(error => {
                    alert(error.response.data);
                    console.error(error); // 오류 발생 시 처리
                    // 오류 발생에 대한 추가적인 작업을 수행할 수 있습니다.
                });
        } else {
            if (!passwordMatch) {
                alert("비밀번호가 같지 않습니다.");
            } else if (!isValidPhoneNum) {
                alert("휴대폰 번호의 형식이 잘못되었습니다.");
            }
        }
    };


    const handleChangeBirth = (e) => {
        const currentValue = e.target.value;
        console.log(currentValue);
        setBirth(currentValue);
        setMemberInfo({...memberInfo, birth: currentValue});
    };

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentValue = e.target.value;

        console.log(currentValue);
        setName(currentValue);
        setMemberInfo({...memberInfo, name: currentValue});
    };

    const handleChangePhone = (e) => {
        const currentValue = e.target.value;

        console.log(currentValue);
        setPhone(currentValue.replace(/[^0-9]/g, ''));

        const regex = /^[0-9\b -]{0,13}$/;
        if (regex.test(currentValue)) {
            setPhone(currentValue);
        }

        setMemberInfo({
            ...memberInfo,
            phoneNum: currentValue.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
        });
        setIsValidPhoneNum(true);
    };

    useEffect(() => {
        if (phone && phone.length === 3) {
            setPhone(phone.replace(/(\d{3})/, '$1-'));
            setIsValidPhoneNum(false);
        }
        if (phone && phone.length === 8) {
            setPhone(phone.replace(/-/g, '').replace(/(\d{3})(\d{4})/, '$1-$2-'));
            setIsValidPhoneNum(false);
        }
        if (phone && phone.length === 11) {
            setPhone(phone.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
        }
        setIsValidPhoneNum(true);
    }, [phone]);

    const handleChangeAddress = () => {
        setMemberInfo(prevState => ({
            ...prevState,
            address: address,
            detailAddress: detailAddress,
        }));
    };

    useEffect(() => {
        handleChangeAddress();
    }, [address, detailAddress]);

    const handleChangePassword = (e) => {
        const currentValue = e.target.value;
        console.log(currentValue);
        setPassword(currentValue);
        setMemberInfo({...memberInfo, password: currentValue});
    }

    const handleChangePasswordCh = (e) => {
        const currentValue = e.target.value;
        console.log(currentValue);
        setPasswordCheck(currentValue);
        setMemberInfo({...memberInfo, confirmPassword: currentValue});
    }

    useEffect(() => {
        if (password === passwordCheck) {
            setCheckSignal(true);
            setPasswordMatch(true);
        } else {
            setCheckSignal(false);
            setPasswordMatch(false);
        }
    }, [password, passwordCheck]);

    const handleCompInfo = () => {
        setMemberInfo(prevState => ({
            ...prevState,
            compName: compName,
            businessNum: businessNum,
            representative: representative,
            compAddress: compAddress,
        }));
    };

    useEffect(() => {
        handleCompInfo();
    }, [compName, businessNum, representative, compAddress]);

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
        <form>
            <h1 className="pageTitle">개인 정보 수정</h1>

            <div className="pageInfo">
                <div className="modiInfo">
                    <div className="modiInfoHeader">
                        <h3 className="idText">아이디</h3>
                        <Input type="text" className="idTextBox" value={memberInfo.id || ""} readOnly/>
                        <h3 className="emailText">이메일</h3>
                        <Input type="text" className="emailTextBox" value={memberInfo.email || ""} readOnly/>
                        <h3 className="passwordText">비밀번호</h3>
                        <Input type="password" className="passwordTextBox" value={password || ""}
                               onChange={handleChangePassword}/>
                        <h3 className="passcheckText">
                            비밀번호 확인
                            <p className={checkSignal ? "match" : "unmatch"}>
                                비밀번호 불일치
                            </p>
                        </h3>
                        <Input type="password" className="checkTextBox" value={passwordCheck || ""}
                               onChange={handleChangePasswordCh}/>
                        <h3 className="nameText">이름</h3>
                        <Input type="text" className="nameTextBox" value={name || ""} onChange={handleChangeName}/>
                        <h3 className="birthText">생년월일</h3>
                        <Input type="date" className="birthTextBox" value={birth || ""} onChange={handleChangeBirth}/>
                        <h3 className="phoneText">휴대폰 번호</h3>
                        <Input type="text" maxLength={13} className="phoneTextBox" value={phone || ""}
                               onChange={handleChangePhone}/>
                        <h3 className="addressText">주소</h3>
                        <Input type="text" className="addressTextBox" value={address || ""}
                               onChange={(e) => {
                                   setAddress(e.target.value);
                                   handleChangeAddress();
                               }}/>
                        {/*<h3 className="addressText">상세주소</h3>*/}
                        <Input type="text" className="detailAddressBox" value={detailAddress || ""}
                               onChange={(e) => {
                                   setDetailAddress(e.target.value);
                                   handleChangeAddress();
                               }}/>
                        {(memberState === "COMP") &&
                            <>
                                <h3 className="compNameText">기업명</h3>
                                <Input type="text" className="compNameTextBox" value={compName || ""}
                                       onChange={(e) => {
                                           setCompName(e.target.value);
                                           handleCompInfo();
                                       }}/>
                                <h3 className="compNameText">사업자번호</h3>
                                <Input type="text" className="compNameTextBox" value={businessNum || ""}
                                       onChange={(e) => {
                                           setBusinessNum(e.target.value);
                                           handleCompInfo();
                                       }}/>
                                <h3 className="compNameText">대표자명</h3>
                                <Input type="text" className="compNameTextBox" value={representative || ""}
                                       onChange={(e) => {
                                           setRepresentative(e.target.value);
                                           handleCompInfo();
                                       }}/>
                                <h3 className="compNameText">기업주소</h3>
                                <Input type="text" className="compNameTextBox" value={compAddress || ""}
                                       onChange={(e) => {
                                           setCompAddress(e.target.value);
                                           handleCompInfo();
                                       }}/>
                            </>
                        }
                    </div>
                    <div className="button">
                        <Button onClick={handleSignUp} text="수정"/>
                    </div>
                </div>
            </div>

        </form>
    );
};

export default ModiInfo;