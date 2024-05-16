import React from "react";
import FacilityGuide from "./FacilityGuide";
import FacilityHeader from "./FacilityHeader";

const FacilityGuideMain = () => {
    const handlePlaceSelection = (placeName) => {
        // 여기에서 placeName을 처리하는 로직
        console.log("Selected Place:", placeName);
    };

    return (
        <div>
            <FacilityHeader />
            <FacilityGuide onSelectFacility={handlePlaceSelection} />
        </div>
    );
}

export default FacilityGuideMain;