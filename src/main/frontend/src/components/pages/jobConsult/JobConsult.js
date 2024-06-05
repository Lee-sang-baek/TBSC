import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './JobConsult.css';
import {useNavigate} from "react-router-dom";

function JobConsult() {
    const memberId = sessionStorage.getItem("id");

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        category: '',
        industry: '',
        date: '',
        education: {
            schoolName: '',
            major: '',
            admissionDate: '',
            graduationDate: '',
            academicStatus: ''
        },
        experiences: [{
            type: '',
            organization: '',
            duties: '',
            startDate: '',
            endDate: ''
        }],
        certifications: [{
            name: '',
            certificateNumber: '',
            acquisitionDate: ''
        }],
        languages: [{
            language: '',
            certifiedExam: '',
            conversation: '',
            writing: ''
        }],
        other: '',
        selfIntroduction: '',
        memberId: '',
    });

    const [experienceFields, setExperienceFields] = useState({
        type: '',
        organization: '',
        duties: '',
        startDate: '',
        endDate: ''
    });

    const [certificationFields, setCertificationFields] = useState({
        name: '',
        certificateNumber: '',
        acquisitionDate: ''
    });

    const [languageFields, setLanguageFields] = useState({
        language: '',
        certifiedExam: '',
        conversation: '',
        writing: ''
    });

    const [isOther, setOther] = useState(false);

    useEffect(() => {
        setFormData({
            ...formData,
            memberId: memberId
        })
    }, []);

    const submitForm = async () => {
        try {
            const response = await axios.post('/jobConsult/add', formData);
            console.log(response.data);
            alert(response.data);
            // window.location.href = "/";
            navigate("/myPage/reserve");
        } catch (error) {
            console.error('오류:', error);
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCategoryChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        if (isOther) {
            setOther(false);
        }
    };

    const handleOtherCategoryChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        if (!isOther) {
            setOther(true);
        }
    };

    const handleEducationChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            education: {
                ...formData.education,
                [name]: value
            }
        });
    };

    const handleExperienceChange = (index, e) => {
        const {name, value} = e.target;
        const updatedExperiences = [...formData.experiences];
        updatedExperiences[index] = {
            ...updatedExperiences[index],
            [name]: value
        };
        setFormData({
            ...formData,
            experiences: updatedExperiences
        });
    };

    const handleExperienceRadioChange = (index, e) => {
        const value = e.target.value;
        const updatedExperiences = [...formData.experiences];
        updatedExperiences[index] = {
            ...updatedExperiences[index],
            type: value
        };
        setFormData({
            ...formData,
            experiences: updatedExperiences
        });
    };

    const handleAddExperience = () => {
        setFormData({
            ...formData,
            experiences: [...formData.experiences, experienceFields]
        });
        setExperienceFields({
            type: '',
            organization: '',
            duties: '',
            startDate: '',
            endDate: ''
        });
    };

    const handleRemoveExperience = (index) => {
        const updatedExperiences = [...formData.experiences];
        updatedExperiences.splice(index, 1);
        setFormData({
            ...formData,
            experiences: updatedExperiences
        });
    };

    const handleCertificationChange = (index, e) => {
        const {name, value} = e.target;
        const newCertifications = [...formData.certifications];
        newCertifications[index][name] = value;
        setFormData({
            ...formData,
            certifications: newCertifications
        });
    };

    const handleRemoveCertification = (index) => {
        const updatedCertifications = [...formData.certifications];
        updatedCertifications.splice(index, 1);
        setFormData({
            ...formData,
            certifications: updatedCertifications
        });
    };

    const handleLanguageChange = (index, e) => {
        const {name, value} = e.target;
        const newLanguages = [...formData.languages];
        newLanguages[index][name] = value;
        setFormData({
            ...formData,
            languages: newLanguages
        });
    };

    const handleLanguageConversationChange = (index, e) => {
        const value = e.target.value;
        const newLanguages = [...formData.languages];
        newLanguages[index] = {
            ...newLanguages[index],
            conversation: value
        };
        setFormData({
            ...formData,
            languages: newLanguages
        });
    };

    const handleLanguageWritingChange = (index, e) => {
        const value = e.target.value;
        const newLanguages = [...formData.languages];
        newLanguages[index] = {
            ...newLanguages[index],
            writing: value
        };
        setFormData({
            ...formData,
            languages: newLanguages
        });
    };

    const handleRemoveLanguage = (index) => {
        const updatedLanguage = [...formData.languages];
        updatedLanguage.splice(index, 1);
        setFormData({
            ...formData,
            languages: updatedLanguage
        });
    };

    const handleAddCertification = () => {
        setFormData({
            ...formData,
            certifications: [...formData.certifications, certificationFields]
        });
        setCertificationFields({
            name: '',
            certificateNumber: '',
            acquisitionDate: ''
        });
    };

    const handleAddLanguage = () => {
        setFormData({
            ...formData,
            languages: [...formData.languages, languageFields]
        });
        setLanguageFields({
            language: '',
            certifiedExam: '',
            conversation: '',
            writing: ''
        });
    };

    return (
        <div className='JobConsult-compo'>
            <div className='form-box'>
                <h2>일자리 상담신청</h2>
                <form>
                    <div className='category-box'>
                        <h3>신청 구분</h3>
                        <div className='category-in'>
                            <label>구분:</label>
                            <div>
                                <label>
                                    <input type="radio" name="category" value="재직자"
                                           checked={formData.category === "재직자"} onChange={handleChange}/>
                                    재직자
                                </label>
                                <label>
                                    <input type="radio" name="category" value="구직자"
                                           checked={formData.category === "구직자"} onChange={handleChange}/>
                                    구직자
                                </label>
                            </div>
                        </div>

                        <div className='industry-box'>
                            <label>희망 업종:</label>
                            <div>
                                <label>
                                    <input type="radio" name="industry" value="여행업"
                                           checked={formData.industry === "여행업"} onChange={handleCategoryChange}/>
                                    여행업
                                </label>
                                <label>
                                    <input type="radio" name="industry" value="항공업"
                                           checked={formData.industry === "항공업"} onChange={handleCategoryChange}/>
                                    항공업
                                </label>
                                <label>
                                    <input type="radio" name="industry" value="IT/플랫폼"
                                           checked={formData.industry === "IT/플랫폼"} onChange={handleCategoryChange}/>
                                    IT/플랫폼
                                </label>
                                <label>
                                    <input type="radio" name="industry" value="창업" checked={formData.industry === "창업"}
                                           onChange={handleCategoryChange}/>
                                    창업
                                </label>
                                <label>
                                    <input type="radio" name="industry" value="호텔업"
                                           checked={formData.industry === "호텔업"} onChange={handleCategoryChange}/>
                                    호텔업
                                </label>
                                <label>
                                    <input type="radio" name="industry" value="NICE"
                                           checked={formData.industry === "NICE"} onChange={handleCategoryChange}/>
                                    NICE
                                </label>
                                <label>
                                    <input type="radio" name="industry" value="공공기관"
                                           checked={formData.industry === "공공기관"} onChange={handleCategoryChange}/>
                                    공공기관
                                </label>
                                <label>
                                    <input type="radio" name="industry" value="" onChange={handleOtherCategoryChange}/>
                                    기타
                                </label>
                                <div className='other-box'>
                                    {isOther && (
                                        <input type="text" name="industry" value={formData.industry}
                                               onChange={handleOtherCategoryChange} placeholder="기타 업종 입력"/>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className='date-box'>
                            <label>
                                상담일자:
                                <div>
                                    <input type='datetime-local' name="date" value={formData.date}
                                           onChange={handleChange}></input>
                                </div>
                            </label>
                        </div>
                    </div>


                    <div className='educate-box'>
                        <h3>최종 학력사항</h3>
                        <table>
                            <thead>
                            <tr>
                                <th>학교명</th>
                                <th>전공</th>
                                <th>입학일</th>
                                <th>졸업일</th>
                                <th>상태</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><input type="text" name="schoolName" value={formData.education.schoolName}
                                           onChange={handleEducationChange}/></td>
                                <td><input type="text" name="major" value={formData.education.major}
                                           onChange={handleEducationChange}/></td>
                                <td><input type="date" name="admissionDate" value={formData.education.admissionDate}
                                           onChange={handleEducationChange}/></td>
                                <td><input type="date" name="graduationDate" value={formData.education.graduationDate}
                                           onChange={handleEducationChange}/></td>
                                <td>
                                    <select name="academicStatus" value={formData.education.academicStatus}
                                            onChange={handleEducationChange}>
                                        <option value="">선택</option>
                                        <option value="졸업(예정)">졸업(예정)</option>
                                        <option value="재학">재학</option>
                                        <option value="휴학">휴학</option>
                                        <option value="중퇴">중퇴</option>
                                        <option value="수료">수료</option>
                                        <option value="검정고시">검정고시</option>
                                    </select>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className='cereer-box'>
                        <h3>경험 및 경력사항</h3>
                        <table>
                            <thead>
                            <tr>
                                <th>구분</th>
                                <th>소속</th>
                                <th>담당업무(직무 내용)</th>
                                <th>근무 시작일</th>
                                <th>근무 종료일</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {formData.experiences.map((experience, index) => (
                                <tr key={index}>
                                    <td>
                                        <label>
                                            <input type="radio" name={`type-${index}`} value="경험"
                                                   checked={experience.type === "경험"}
                                                   onChange={(e) => handleExperienceRadioChange(index, e)}/>
                                            경험
                                        </label>
                                        <label>
                                            <input type="radio" name={`type-${index}`} value="경력"
                                                   checked={experience.type === "경력"}
                                                   onChange={(e) => handleExperienceRadioChange(index, e)}/>
                                            경력
                                        </label>
                                    </td>
                                    <td><input type="text" name="organization" value={experience.organization}
                                               onChange={(e) => handleExperienceChange(index, e)}/></td>
                                    <td><input type="text" name="duties" value={experience.duties}
                                               onChange={(e) => handleExperienceChange(index, e)}/></td>
                                    <td><input type="date" name="startDate" value={experience.startDate}
                                               onChange={(e) => handleExperienceChange(index, e)}/></td>
                                    <td><input type="date" name="endDate" value={experience.endDate}
                                               onChange={(e) => handleExperienceChange(index, e)}/></td>
                                    <td>
                                        <button type="button" onClick={() => handleRemoveExperience(index)}
                                                className='remove-btn'>제거
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div className='add-box'>
                            <button type='button' onClick={handleAddExperience} className='add-btn'>경력 추가</button>
                        </div>
                    </div>

                    <div className='license-box'>
                        <h3>자격증</h3>
                        <table>
                            <thead>
                            <tr>
                                <th>자격증명</th>
                                <th>자격증번호</th>
                                <th>취득일</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {formData.certifications.map((certification, index) => (
                                <tr key={index}>
                                    <td><input type="text" name="name" value={certification.name}
                                               onChange={(e) => handleCertificationChange(index, e)}/></td>
                                    <td><input type="text" name="certificateNumber"
                                               value={certification.certificateNumber}
                                               onChange={(e) => handleCertificationChange(index, e)}/></td>
                                    <td><input type="date" name="acquisitionDate" value={certification.acquisitionDate}
                                               onChange={(e) => handleCertificationChange(index, e)}/></td>
                                    <td>
                                        <button type="button" onClick={() => handleRemoveCertification(index)}
                                                className='remove-btn'>제거
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div className='add-box'>
                            <button type='button' onClick={handleAddCertification} className='add-btn'>자격증 추가</button>
                        </div>
                    </div>

                    <div className='language-box'>
                        <h3>어학사항</h3>
                        <table>
                            <thead>
                            <tr>
                                <th>구사언어</th>
                                <th>보유 공인시험(점수)</th>
                                <th>회화</th>
                                <th>작문</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {formData.languages.map((language, index) => (
                                <tr key={index}>
                                    <td><input type="text" name="language" value={language.language}
                                               onChange={(e) => handleLanguageChange(index, e)}/></td>
                                    <td><input type="text" name="certifiedExam" value={language.certifiedExam}
                                               onChange={(e) => handleLanguageChange(index, e)}/></td>
                                    <td>
                                        <label>
                                            <input type="radio" name={`conversation-${index}`} value="상"
                                                   checked={language.conversation === "상"}
                                                   onChange={(e) => handleLanguageConversationChange(index, e)}/>
                                            상
                                        </label>
                                        <label>
                                            <input type="radio" name={`conversation-${index}`} value="중"
                                                   checked={language.conversation === "중"}
                                                   onChange={(e) => handleLanguageConversationChange(index, e)}/>
                                            중
                                        </label>
                                        <label>
                                            <input type="radio" name={`conversation-${index}`} value="하"
                                                   checked={language.conversation === "하"}
                                                   onChange={(e) => handleLanguageConversationChange(index, e)}/>
                                            하
                                        </label>
                                    </td>
                                    <td>
                                        <label>
                                            <input type="radio" name={`writing-${index}`} value="상"
                                                   checked={language.writing === "상"}
                                                   onChange={(e) => handleLanguageWritingChange(index, e)}/>
                                            상
                                        </label>
                                        <label>
                                            <input type="radio" name={`writing-${index}`} value="중"
                                                   checked={language.writing === "중"}
                                                   onChange={(e) => handleLanguageWritingChange(index, e)}/>
                                            중
                                        </label>
                                        <label>
                                            <input type="radio" name={`writing-${index}`} value="하"
                                                   checked={language.writing === "하"}
                                                   onChange={(e) => handleLanguageWritingChange(index, e)}/>
                                            하
                                        </label>
                                    </td>
                                    <td>
                                        <button type="button" onClick={() => handleRemoveLanguage(index)}
                                                className='remove-btn'>제거
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div className='add-box'>
                            <button type='button' onClick={handleAddLanguage} className='add-btn'>어학사항 추가</button>
                        </div>
                    </div>

                    <div className='etc-box'>
                        <h3>기타사항</h3>
                        <textarea name='other' value={formData.other} onChange={handleChange}/>
                    </div>

                    <div className="introduce-box">
                        <h3>자기소개</h3>
                        <textarea name='selfIntroduction' value={formData.selfIntroduction} onChange={handleChange}/>
                    </div>

                    <div className='btn-box'>
                        <button type="button" className='btn' onClick={submitForm}>예약확정</button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default JobConsult;
