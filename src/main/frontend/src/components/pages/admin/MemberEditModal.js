import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MemberEditModal.css";

const MemberEditModal = ({ member, onClose, onUpdate, onDelete }) => {
    const [formData, setFormData] = useState(member);

    useEffect(() => {
        setFormData(member);
    }, [member]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`/admin/member/${member.id}`, formData)
            .then(response => {
                alert(response.data);
                onUpdate();
                onClose();
            })
            .catch(error => {
                console.error("Error updating member:", error);
            });
    };

    const handleDelete = () => {
        axios.delete(`/admin/member/${member.id}`)
            .then(response => {
                alert(response.data);
                onDelete();
                onClose();
            })
            .catch(error => {
                console.error("Error deleting member:", error);
            });
    };

    return (
        <div className="MemberEditModal-compo">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>회원 정보 수정</h2>
                <form onSubmit={handleSubmit}>
                    <label>이름: <input type="text" name="name" value={formData.name} onChange={handleChange} /></label>
                    <label>이메일: <input type="email" name="email" value={formData.email} onChange={handleChange} /></label>
                    <label>주소: <input type="text" name="address" value={formData.address} onChange={handleChange} /></label>
                    <label>상세주소: <input type="text" name="detailAddress" value={formData.detailAddress} onChange={handleChange} /></label>
                    <label>전화번호: <input type="text" name="phoneNum" value={formData.phoneNum} onChange={handleChange} /></label>
                    <label>생년월일: <input type="date" name="birth" value={formData.birth} onChange={handleChange} /></label>
                    <label>기업명: <input type="text" name="compName" value={formData.compName} onChange={handleChange} /></label>
                    <label>기업번호: <input type="text" name="businessNum" value={formData.businessNum} onChange={handleChange} /></label>
                    <label>대표자명: <input type="text" name="representative" value={formData.representative} onChange={handleChange} /></label>
                    <label>기업주소: <input type="text" name="compAddress" value={formData.compAddress} onChange={handleChange} /></label>
                    <div className="btn-box">
                        <button type="submit">수정</button>
                        <button type="button" onClick={handleDelete}>삭제</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MemberEditModal;
