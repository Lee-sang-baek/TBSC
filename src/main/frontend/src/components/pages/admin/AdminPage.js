import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";

const AdminPage = () => {
  useEffect(() => {
    if (sessionStorage.getItem("state") !== "ADMIN") {
        window.location.href = "/";
    }
}, [])
  const create = () => {
    axios.get("/create")
        .then(response => {
            alert(response.data);
        })
  }

  if (sessionStorage.getItem("state") !== "ADMIN") {
    return null;
  }

  return (
      <div className="AdminPage-compo">
        <a href="#" onClick={create}>어드민 생성</a>
      </div>
  );
};

export default AdminPage;