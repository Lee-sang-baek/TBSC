import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function LogAccess() {
    const location = useLocation();

    useEffect(() => {
        axios.post("/admin/log/add");
    }, [location]);

    return null;
}

export default LogAccess;