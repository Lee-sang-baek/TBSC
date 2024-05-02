import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const AdminPage = () => {
  return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/admin/member-list">회원 목록</Link>
            </li>
            <li>
              <Link to="/admin/site-management">사이트 관리</Link>
            </li>
            <li>
              <Link to="/admin/reservation-confirmation">예약 신청 확인</Link>
            </li>
            <li>
              <Link to="/admin/access-log">접속 로그 확인</Link>
            </li>
          </ul>
        </nav>
      </div>
  );
};

export default AdminPage;