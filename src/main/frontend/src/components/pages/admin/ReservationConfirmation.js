import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ReservationConfirmation.css";
import ReservationDetail from "./ReservationDetail";

const ReservationConfirmation = () => {
  useEffect(() => {
    if (sessionStorage.getItem("state") !== "ADMIN") {
        window.location.href = "/";
    }
  }, [])
  const [reserveType, setReserveType] = useState("Consultant");
  const [consultants, setConsultants] = useState([]);
  const [jobConsult, setJobConsult] = useState([]);
  const [rental, setRental] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [state, setState] = useState("all")

  const handleStateChange = (e) => {
    setState(e.target.value);
    setPage(0);
};

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  const toggleSection = (section) => {
    setReserveType(section === reserveType ? null : section);
    setPage(section === reserveType ? page : 0);
  };

  const fetchReservations = async () => {
    if (reserveType === "Consultant") {
      await axios
        .get(`/admin/consultant?page=${page}&size=${size}&state=${state}`)
        .then((response) => {
          setConsultants(response.data.content);
          setTotalPages(response.data.totalPages);
          setTotal(response.data.totalElements);
        })
        .catch((error) => {
          console.error("예약 목록을 가져오는 중 에러 발생:", error);
        });
    } else if (reserveType === "JobConsult") {
      await axios
        .get(`/admin/jobConsult?page=${page}&size=${size}&state=${state}`)
        .then((response) => {
          setJobConsult(response.data.content);
          setTotalPages(response.data.totalPages);
          setTotal(response.data.totalElements);
        })
        .catch((error) => {
          console.error("예약 목록을 가져오는 중 에러 발생:", error);
        });
    } else if (reserveType === "Rental") {
      await axios
        .get(`/admin/rental?page=${page}&size=${size}&state=${state}`)
        .then((response) => {
          setRental(response.data.content);
          setTotalPages(response.data.totalPages);
          setTotal(response.data.totalElements);
        })
        .catch((error) => {
          console.error("예약 목록을 가져오는 중 에러 발생:", error);
        });
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [page, reserveType, state]);

  const handleStatusChange = async (type, num, newStatus) => {
    try {
      await axios.put(`/admin/reserve/${type}/${num}/${newStatus}`);
      alert("예약 상태가 변경되었습니다. 이메일을 전송합니다.")
      fetchReservations();
    } catch (error) {
      alert("에러 : " + error)
      console.error("Error updating reservation status:", error);
    }
  };

  const handleDetails = (reservation) => {
    setSelectedReservation(reservation);
  };

  const handleCloseDetails = () => {
    setSelectedReservation(null);
  };

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

  if (sessionStorage.getItem("state") !== "ADMIN") {
    return null;
  }

  return (
    <div className="ReservationConfirmation-compo">
      <h2>예약 신청 관리</h2>
      <div className="management-button">
        <button
          onClick={() => toggleSection("Consultant")}
          className={reserveType === "Consultant" ? "active" : "de-active"}
        >
          기업 컨설팅 신청
        </button>
        <button
          onClick={() => toggleSection("JobConsult")}
          className={reserveType === "JobConsult" ? "active" : "de-active"}
        >
          일자리 상담 신청
        </button>
        <button
          onClick={() => toggleSection("Rental")}
          className={reserveType === "Rental" ? "active" : "de-active"}
        >
          회의실 대관 신청
        </button>
      </div>

      <div className={reserveType === "Consultant" ? "reserve-box" : "hidden"}>
        <label className="size-label">
          한 페이지에 표시 할 예약 수
          <input
            type="number"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
        </label>

        <div className="pagination">
          <button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>
            이전
          </button>
          <span>
            페이지: {page + 1} / {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages - 1}
          >
            다음
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>회원</th>
              <th>                
                <select value={state} onChange={handleStateChange}>
                  <option value="all">상태</option>
                  <option value="RESERVE">예약</option>
                  <option value="CHECK">검토</option>
                  <option value="APPROVE">승인</option>
                  <option value="DENY">거절</option>
                </select>
              </th>
              <th>동작</th>
            </tr>
          </thead>
          <tbody>
            {consultants &&
              consultants.length > 0 &&
              consultants.map((reservation) => (
                <tr key={reservation.num} className={`status-${reservation.state}`}>
                  <td>{reservation.num}</td>
                  <td>{reservation.member.id}</td>
                  <td>{getStringState(reservation.state)}</td>
                  <td>
                  <div className="btn-box">
                    <div className="state-btn-box">
                      <button className="check"
                          onClick={() =>
                            handleStatusChange(reserveType, reservation.num, "CHECK")
                          }
                        >
                          검토
                        </button>
                        
                    </div>
                    <button className="detail-btn" onClick={() => handleDetails(reservation)}>자세히 보기</button>
                  </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <h4>총 {total}개의 예약 조회됨</h4>
      </div>

      <div className={reserveType === "JobConsult" ? "reserve-box" : "hidden"}>
        <label className="size-label">
          한 페이지에 표시 할 예약 수
          <input
            type="number"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
        </label>

        <div className="pagination">
          <button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>
            이전
          </button>
          <span>
            페이지: {page + 1} / {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages - 1}
          >
            다음
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>회원</th>
              <th>                
                <select value={state} onChange={handleStateChange}>
                  <option value="all">상태</option>
                  <option value="RESERVE">예약</option>
                  <option value="CHECK">검토</option>
                  <option value="APPROVE">승인</option>
                  <option value="DENY">거절</option>
                </select>
              </th>
              <th>동작</th>
            </tr>
          </thead>
          <tbody>
            {jobConsult &&
              jobConsult.length > 0 &&
              jobConsult.map((reservation) => (
                <tr key={reservation.num} className={`status-${reservation.state}`}>
                  <td>{reservation.num}</td>
                  <td>{reservation.member.id}</td>
                  <td>{getStringState(reservation.state)}</td>
                  <td>
                  <div className="btn-box">
                    <div className="state-btn-box">
                      <button className="check"
                        onClick={() =>
                          handleStatusChange(reserveType, reservation.num, "CHECK")
                        }
                      >
                        검토
                      </button>
                    </div>
                    <button className="detail-btn" onClick={() => handleDetails(reservation)}>자세히 보기</button>
                  </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <h4>총 {total}개의 예약 조회됨</h4>
      </div>

      <div className={reserveType === "Rental" ? "reserve-box" : "hidden"}>
        <label className="size-label">
          한 페이지에 표시 할 예약 수
          <input
            type="number"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
        </label>

        <div className="pagination">
          <button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>
            이전
          </button>
          <span>
            페이지: {page + 1} / {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages - 1}
          >
            다음
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>회원</th>
              <th>
                <select value={state} onChange={handleStateChange}>
                  <option value="all">상태</option>
                  <option value="RESERVE">예약</option>
                  <option value="CHECK">검토</option>
                  <option value="APPROVE">승인</option>
                  <option value="DENY">거절</option>
                </select>
              </th>
              <th>동작</th>
            </tr>
          </thead>
          <tbody>
            {rental &&
              rental.length > 0 &&
              rental.map((reservation) => (
                <tr key={reservation.num} className={`status-${reservation.state}`}>
                  <td>{reservation.num}</td>
                  <td>{reservation.member.id}</td>
                  <td>{getStringState(reservation.state)}</td>
                  <td>
                  <div className="btn-box">
                  <div className="state-btn-box">
                    <button className="check"
                        onClick={() =>
                          handleStatusChange(reserveType, reservation.num, "CEHCK")
                        }
                      >
                        검토
                      </button>
                    </div>
                    <button className="detail-btn" onClick={() => handleDetails(reservation)}>자세히 보기</button>
                  </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <h4>총 {total}개의 예약 조회됨</h4>
      </div>

      {selectedReservation && (
        <ReservationDetail
          reservation={selectedReservation}
          reserveType={reserveType}
          onClose={handleCloseDetails}
          handleStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default ReservationConfirmation;
