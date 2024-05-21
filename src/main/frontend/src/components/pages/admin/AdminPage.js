import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";

const AdminPage = () => {
  const create = () => {
    axios.get("/create")
        .then(response => {
            alert(response.data);
        })
  }

  return (
      <div className="AdminPage-compo">
        <a href="#" onClick={create}>어드민 생성</a>
      </div>
  );
};

export default AdminPage;