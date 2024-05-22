import React from "react";
import "./ReservationDetail.css";

const ReservationDetail = ({ reservation, reserveType, onClose }) => {

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

  return (
  <div className="modal-overlay">
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
                <td>{reservation.gender}</td>
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
                <td>{reservation.appDate}</td>
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
                <td>{reservation.date}</td>
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
                <td>{reservation.gender}</td>
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
                <td>{reservation.startDate}</td>
              </tr>
              <tr>
                <th>종료일</th>
                <td>{reservation.endDate}</td>
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
    </div>
  </div>
  );
};

export default ReservationDetail;
