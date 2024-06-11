import React, { useState } from 'react';
import axios from 'axios';
import "./ConsultantForm.css"
import NeedLoginForm from '../../baseComponents/NeedLoginForm';

const ConsultantForm = ({memberId}) => {

    const [formData, setFormData] = useState({
        compName: '',
        gender: '남',
        ownerShip: '자가',
        employees: '',
        type: '',
        startDate: '',
        category: '',
        sales: '',
        appDate: '',
        management: '자영업 클리닉',
        difficulties: '',
        support: '',
        fileUrl: '',
        id : memberId,
    });
    const [file, setFile] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const uploadFile = async () => {
        if (!file) return '';

        const fileData = new FormData();
        fileData.append('file', file);

        try {
            const response = await axios.post('/consultants/upload', fileData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('파일 업로드 실패:', error);
            return '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const uploadedFileName = await uploadFile();
        // if (!uploadedFileName) {
        //     alert('파일 업로드 실패!');
        // }

        const requestData = {
            ...formData,
            file: uploadedFileName,
        };

        try {
            const response = await axios.post('/consultants/save', requestData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            alert('신청이 성공적으로 제출되었습니다!');
            window.location.href = "/";
            console.log(response.data);
        } catch (error) {
            console.error('신청 중 에러 발생:', error);
            alert('신청 중 오류가 발생했습니다.');
        }
    };
    if (!memberId) {
        return (
            <NeedLoginForm />
        );
    }

    return (
        <div className="ConsultantForm-compo">
            <form onSubmit={handleSubmit}>
                <h2>기업 컨설팅 신청</h2>

                <label className='big-label'>성별:
                    <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={formData.gender === 'Male'}
                        onChange={handleInputChange}
                    /> 남
                    <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={formData.gender === 'Female'}
                        onChange={handleInputChange}
                    /> 여
                </label>
                <label>업체명:
                    <input
                        type="text"
                        name="compName"
                        value={formData.compName}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <h2>사업자 등록 정보</h2>
                <label className='big-label'>소유 구분:
                        <input
                            type="radio"
                            name="ownerShip"
                            value="Own"
                            checked={formData.ownerShip === 'Own'}
                            onChange={handleInputChange}
                        /> 자가
                        <input
                            type="radio"
                            name="ownerShip"
                            value="Rent"
                            checked={formData.ownerShip === 'Rent'}
                            onChange={handleInputChange}
                        /> 임차
                    </label>
                    <br/><br/>
                    <label>종업원 수:
                        <input
                            type="number"
                            name="employees"
                            value={formData.employees}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>경영 형태:
                        <input
                            type="text"
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>사업 개시(예정)일자:
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>업종/취급 품목:
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>매출액:
                        <input
                            type="number"
                            name="sales"
                            value={formData.sales}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                <br/>
                <h2>사업 신청 내역</h2>
                <label className='big-label'>신청일자:
                    <input
                        type="datetime-local"
                        name="appDate"
                        value={formData.appDate}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>사업 구분:
                    <input
                        type="radio"
                        name="management"
                        value="자영업 클리닉"
                        checked={formData.management === '자영업 클리닉'}
                        onChange={handleInputChange}
                    /> 자영업 클리닉
                    <input
                        type="radio"
                        name="management"
                        value="시설 개선"
                        checked={formData.management === '시설 개선'}
                        onChange={handleInputChange}
                    /> 시설 개선
                    <input
                        type="radio"
                        name="management"
                        value="사업정리컨설팅"
                        checked={formData.management === '사업정리컨설팅'}
                        onChange={handleInputChange}
                    /> 사업정리컨설팅
                    <input
                        type="radio"
                        name="management"
                        value="원상복구 등"
                        checked={formData.management === '원상복구 등'}
                        onChange={handleInputChange}
                    /> 원상복구 등
                    <input
                        type="radio"
                        name="management"
                        value="현장체험(멘토링)"
                        checked={formData.management === '현장체험(멘토링)'}
                        onChange={handleInputChange}
                    /> 현장체험(멘토링)
                </label>
                
                <label className='big-label'>
                <h2>경영 애로사항</h2>
                    <textarea
                        name="difficulties"
                        value={formData.difficulties}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                
                <label className='big-label'>
                <h2>지원 요청 사항</h2>
                    <textarea
                        name="support"
                        value={formData.support}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                
                <label className='big-label'>
                <h2>첨부 서류</h2>
                    <input
                        type="file"
                        name="file"
                        onChange={handleFileChange}
                        required
                    />
                </label>
                <button type="button" onClick={handleSubmit}>제출</button>
            </form>
        </div>
    );
};

export default ConsultantForm;
