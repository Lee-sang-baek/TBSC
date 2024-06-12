import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function LogAccess({memberId}) {
    const location = useLocation();
    const id = memberId ? memberId : "";

    useEffect(() => {
        axios.post("/api/log/add", null, {
            params: { id },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }});
    }, [location]);

    return null;
}

export default LogAccess;