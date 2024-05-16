import React, { useState, useEffect } from "react";
import axios from "axios"; // axios를 사용하여 서버에서 데이터를 가져옵니다.
import "./ReservationConfirmation.css"; // CSS 파일 import

const ReservationConfirmation = () => {
  const [reservations, setReservations] = useState([]);

  // 서버에서 예약 정보를 가져오는 함수
  const fetchReservations = async () => {
    try {
      const response = await axios.get("/api/reservations"); // 예약 정보를 가져오는 API 엔드포인트로 요청을 보냅니다.
      setReservations(response.data); // 받아온 예약 정보를 상태에 설정합니다.
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  // 컴포넌트가 마운트될 때 예약 정보를 가져옵니다.
  useEffect(() => {
    fetchReservations();
  }, []);

  // 예약 상태를 변경하는 함수
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`/api/reservations/${id}`, { status: newStatus }); // 서버에 예약 상태 변경을 요청합니다.
      fetchReservations(); // 변경된 예약 정보를 다시 가져옵니다.
    } catch (error) {
      console.error("Error updating reservation status:", error);
    }
  };

  return (
    <div className="ReservationConfirmation-compo">
      <h2>예약 신청 확인</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>이름</th>
            <th>상태</th>
            <th>동작</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map(reservation => (
            <tr key={reservation.id} className={`status-${reservation.status}`}>
              <td>{reservation.id}</td>
              <td>{reservation.name}</td>
              <td>{reservation.status}</td>
              {/* 상태에 따라 버튼을 보여줍니다. */}
              <td>
                {reservation.status === "검토중" && (
                  <>
                    <button onClick={() => handleStatusChange(reservation.id, "승인")}>
                      승인
                    </button>
                    <button onClick={() => handleStatusChange(reservation.id, "거부")}>
                      거부
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationConfirmation;
