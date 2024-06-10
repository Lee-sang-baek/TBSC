import React, { useState } from 'react';
import './Rental.css';
import FacilityGuide from "../facilityGuide/FacilityGuide";
import axios from "axios";
import NeedLoginForm from '../../baseComponents/NeedLoginForm';

const Rental = () => {
    const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 16));
    const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 16));
    const [gender, setGender] = useState('');
    const [compName, setCompName] = useState('');
    const [person, setPerson] = useState('');
    const [place, setPlace] = useState('');
    const [purpose, setPurpose] = useState('');
    const [prepare, setPrepare] = useState('');
    const memberId = sessionStorage.getItem("id");

    const handlePlaceSelection = (placeName) => {
        setPlace(placeName);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'gender': setGender(value); break;
            case 'compName': setCompName(value); break;
            case 'person': setPerson(value); break;
            case 'startDate': setStartDate(value); break;
            case 'endDate': setEndDate(value); break;
            case 'purpose': setPurpose(value); break;
            case 'prepare': setPrepare(value); break;
            default: break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!gender) {
            alert('성별을 선택해주세요.');
            return;
        }

        if (!compName) {
            alert('업체명을 작성해주세요.');
            return;
        }

        if (!person) {
            alert('참가 인원을 작성해주세요.');
            return;
        }

        if (!place) {
            alert('대관 장소를 선택해주세요.');
            return;
        }

        if (!startDate) {
            alert('대관 시작 기간을 선택해주세요.');
            return;
        }

        if (!endDate) {
            alert('대관 종료 기간을 선택해주세요.');
            return;
        }

        if (!purpose) {
            alert('대관 목적을 작성해주세요.');
            return;
        }

        if (!prepare) {
            alert('준비 사항을 작성해주세요.');
            return;
        }

        const formData = {
            gender, compName, person, place, startDate, endDate, purpose, prepare, memberId
        };

        try {
            const response = await axios.post(`/rental/save?memberId=${memberId}`, formData);
            alert("대관예약이 제출되었습니다.");
            console.log('서버 응답:', response.data);
            window.location.href = "/";
        } catch (error) {
            console.error('서버 요청 실패:', error);
        }
    };

    if (!memberId) {
        return (
            <NeedLoginForm />
        );
    }

    return (
        <div className="rental-compo">
            <div className="rental-compo-in">
                <h2>회의실 대관 신청</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        성별:
                        <div>
                            <input type="radio" name="gender" value="Male" checked={gender === 'Male'}
                                   onChange={handleChange}/> 남성
                            <input type="radio" name="gender" value="Female" checked={gender === 'Female'}
                                   onChange={handleChange}/> 여성
                        </div>
                    </label>
                    <label>
                        업체명:
                        <input type="text" name="compName" value={compName} onChange={handleChange}/>
                    </label>
                    <label>
                        참가 인원:
                        <input type="number" name="person" value={person} onChange={handleChange}/>
                    </label>
                    <label>
                        대관 장소:
                        <div className="facility-guide-wrapper">
                            <FacilityGuide onSelectFacility={handlePlaceSelection} />
                        </div>
                    </label>
                    <label>
                        대관 시작 기간:
                        <input type="datetime-local" name="startDate" value={startDate} onChange={handleChange}/>
                    </label>
                    <label>
                        대관 종료 기간:
                        <input type="datetime-local" name="endDate" value={endDate} onChange={handleChange}/>
                    </label>
                    <label>
                        대관 목적:
                        <input type="text" name="purpose" value={purpose} onChange={handleChange}/>
                    </label>
                    <label>
                        준비 사항:
                        <textarea name="prepare" value={prepare} onChange={handleChange}/>
                    </label>
                    <button type="submit">신청하기</button>
                </form>
            </div>
        </div>
    );
};

export default Rental;
