import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";

const AdminPage = () => {
  useEffect(() => {
    if (sessionStorage.getItem("state") !== "ADMIN") {
        window.location.href = "/";
    }
}, [])

  if (sessionStorage.getItem("state") !== "ADMIN") {
    return null;
  }

  return (
      <div className="AdminPage-compo">
        
      </div>
  );
};

export default AdminPage;