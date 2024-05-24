import React from "react";
import FacilityGuide from "./FacilityGuide";
import FacilityHeader from "./FacilityHeader";
import "./FacilityGuide.css";

const FacilityGuideMain = () => {
    return (
        <div className="FacilityGuide-compo-outter">

            <FacilityHeader />
            <FacilityGuide />

        </div>
    );
}

export default FacilityGuideMain;