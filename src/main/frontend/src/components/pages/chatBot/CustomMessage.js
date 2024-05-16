import React from "react";

const CustomMessage = (props) => {
    return (
        <div style={{ backgroundColor: "#f1f0f0", padding: "10px", borderRadius: "5px" }}>
            {props.message}
        </div>
    );
};

export default CustomMessage;
