import React, { useEffect, useState } from "react";
import "./ReservationDetail.css";
import { DateFormat } from "../../util/DateFormat";

const ReservationDetail = ({ reservation, reserveType, onClose, handleStatusChange }) => {
  const [showExperiencesModal, setShowExperiencesModal] = useState(false);
  const [showCertificationsModal, setShowCertificationsModal] = useState(false);
  const [showLanguagesModal, setShowLanguagesModal] = useState(false);

  const getStringState = (state) => {
    if (state === "RESERVE") {
      return "예약";
    } else if (state === "CHECK") {
      return "검토";
    } else if (state === "APPROVE") {
      return "승인";
    } else if (state === "DENY") {
      return "거절";
    }
  };
  
  console.log(reservation.experiences);

  return (
  <div className="ReservationDetail-compo">
    <div className="modal">
      <h2>예약 내역 자세히</h2>
      <button className="close-button" onClick={onClose}>X</button>
      <table>
        <tbody>
          <tr>
            <th>번호</th>
            <td>{reservation.num}</td>
          </tr>
          <tr>
            <th>회원아이디</th>
            <td>{reservation.member.id}</td>
          </tr>
          <tr>
            <th>상태</th>
            <td>{getStringState(reservation.state)}</td>
          </tr>
          {/* reservation의 타입에 따라 다른 정보를 출력합니다. */}
          {reserveType === "Consultant" && (
            <>
              <tr>
                <th>업체명</th>
                <td>{reservation.compName}</td>
              </tr>
              <tr>
                <th>성별</th>
                <td>{reservation.gender === "Male" ? "남성" : "여성"}</td>
              </tr>
              <tr>
                <th>소유구분</th>
                <td>{reservation.ownerShip}</td>
              </tr>
              <tr>
                <th>직원 수</th>
                <td>{reservation.employees}</td>
              </tr>
              <tr>
                <th>경영형태</th>
                <td>{reservation.type}</td>
              </tr>
              <tr>
                <th>사업개시일</th>
                <td>{reservation.startDate}</td>
              </tr>
              <tr>
                <th>업종</th>
                <td>{reservation.category}</td>
              </tr>
              <tr>
                <th>매출</th>
                <td>{reservation.sales}</td>
              </tr>
              <tr>
                <th>신청일</th>
                <td>{DateFormat(reservation.appDate)}</td>
              </tr>
              <tr>
                <th>사업구분</th>
                <td>{reservation.management}</td>
              </tr>
              <tr>
                <th>경영 애로사항</th>
                <td>{reservation.difficulties}</td>
              </tr>
              <tr>
                <th>지원 요청사항</th>
                <td>{reservation.support}</td>
              </tr>
              <tr>
                <th>첨부서류</th>
                <td>{reservation.file}</td>
              </tr>
            </>
          )}
          {reserveType === "JobConsult" && (
            <>
              <tr>
                <th>구분</th>
                <td>{reservation.category}</td>
              </tr>
              <tr>
                <th>희망업종</th>
                <td>{reservation.industry}</td>
              </tr>
              <tr>
                <th>신청일</th>
                <td>{DateFormat(reservation.date)}</td>
              </tr>
              <tr>
                <th>학력사항</th>
                <td>{reservation.education && (
                  <table>
                    <tbody>
                      <tr>
                        <th>학교</th>
                        <td>{reservation.education.schoolName}</td>
                      </tr>
                      <tr>
                        <th>전공</th>
                        <td>{reservation.education.major}</td>
                      </tr>
                      <tr>
                        <th>입학일</th>
                        <td>{reservation.education.admissionDate}</td>
                      </tr>
                      <tr>
                        <th>졸업일</th>
                        <td>{reservation.education.graduationDate}</td>
                      </tr>
                      <tr>
                        <th>상태</th>
                        <td>{reservation.education.academicStatus}</td>
                      </tr>
                    </tbody>
                  </table>)}
                </td>
              </tr>
              <tr>
                <th>경험 및 경력</th>
                <td>
                  {reservation.experiences && (
                    <button onClick={() => setShowExperiencesModal(true)}>자세히 보기</button>
                  )}
                </td>
              </tr>
              <tr>
                <th>자격증</th>
                <td>
                  {reservation.certifications && (
                    <button onClick={() => setShowCertificationsModal(true)}>자세히 보기</button>
                  )}
                </td>
              </tr>
              <tr>
                <th>어학사항</th>
                <td>
                  {reservation.languages && (
                    <button onClick={() => setShowLanguagesModal(true)}>자세히 보기</button>
                  )}
                </td>
              </tr>
              <tr>
                <th>기타사항</th>
                <td>{reservation.other}</td>
              </tr>
              <tr>
                <th>자기소개</th>
                <td>{reservation.selfIntroduction}</td>
              </tr>
            </>
          )}
          {reserveType === "Rental" && (
            <>
              <tr>
                <th>업체명</th>
                <td>{reservation.compName}</td>
              </tr>
              <tr>
                <th>성별</th>
                <td>{reservation.gender === "Male" ? "남성" : "여성"}</td>
              </tr>
              <tr>
                <th>참가인원</th>
                <td>{reservation.person}</td>
              </tr>
              <tr>
                <th>대관장소</th>
                <td>{reservation.place}</td>
              </tr>
              <tr>
                <th>시작일</th>
                <td>{DateFormat(reservation.startDate)}</td>
              </tr>
              <tr>
                <th>종료일</th>
                <td>{DateFormat(reservation.endDate)}</td>
              </tr>
              <tr>
                <th>대관목적</th>
                <td>{reservation.purpose}</td>
              </tr>
              <tr>
                <th>준비사항</th>
                <td>{reservation.prepare}</td>
              </tr>
            </>
          )}
        </tbody>
      </table>

      {showExperiencesModal && (
          <div className="experiences-modal">
            <h3>경험 및 경력</h3>
            {reservation.experiences.map((experience, index) => (
              <div className="underline" key={index}>
                <p>구분: {experience.type}</p>
                <p>소속: {experience.organization}</p>
                <p>담당업무: {experience.duties}</p>
                <p>근무 시작일: {DateFormat(experience.startDate)}</p>
                <p>근무 종료일: {DateFormat(experience.endDate)}</p>
              </div>
            ))}
            <button onClick={() => setShowExperiencesModal(false)}>닫기</button>
          </div>
        )}

        {showCertificationsModal && (
          <div className="certifications-modal">
            <h3>자격증</h3>
            {reservation.certifications.map((certification, index) => (
              <div className="underline" key={index}>
                <p>자격증명: {certification.name}</p>
                <p>자격증번호: {certification.certificateNumber}</p>
                <p>취득일: {DateFormat(certification.acquisitionDate)}</p>
              </div>
            ))}
            <button onClick={() => setShowCertificationsModal(false)}>닫기</button>
          </div>
        )}

        {showLanguagesModal && (
          <div className="languages-modal">
            <h3>어학사항</h3>
            {reservation.languages.map((language, index) => (
              <div className="underline" key={index}>
                <p>구사언어: {language.language}</p>
                <p>보유 공인시험: {language.certifiedExam}</p>
                <p>회화: {language.conversation}</p>
                <p>작문: {language.writing}</p>
              </div>
            ))}
            <button onClick={() => setShowLanguagesModal(false)}>닫기</button>
          </div>
        )}

      <div className="detail-btn-box">
      <button className="approve"
        onClick={() => {
          handleStatusChange(reserveType, reservation.num, "APPROVE");
          onClose();
        }}
      >
        승인
      </button>
      <button className="deny"
        onClick={() => {
          handleStatusChange(reserveType, reservation.num, "DENY");
          onClose();
        }}
      >
        거절
      </button>
      </div>
    </div>
  </div>
  );
};

export default ReservationDetail;
