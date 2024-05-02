/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import DaumPostcode from "react-daum-postcode";

import {
    labelStyle,
} from "../styles/form-style";

import {
    addressButtonStyle,
    addressContainer,
    addressInputsContainer,
    boxStyle,
    postCodeContainer,
    zonecodeStyle,
} from "../styles/address-style";

const AddressInput = (props) => {
    const { zonecode, address, detailedAddress } =
        props.addressState;
    const { setZonecode, setAddress, setDetailedAddress } =
        props.addressAction;
    const [isOpen, setIsOpen] = useState(false);

    const themeObj = {
        searchBgColor: "#0B65C8", //검색창 배경색
        queryTextColor: "#FFFFFF" //검색창 글자색
    };

    const postCodeStyle = {
        width: "360px",
        height: "480px",
    };

    const completeHandler = (data) => {
        const { address, zonecode } = data;
        setZonecode(zonecode);
        setAddress(address);
    };

    const closeHandler = (state) => {
        if (state === "FORCE_CLOSE") {
            setIsOpen(false);
        } else if (state === "COMPLETE_CLOSE") {
            setIsOpen(false);
        }
    };

    const toggleHandler = () => {
        setIsOpen((prevOpen) => !prevOpen);
    };

    const inputChangeHandler = (event) => {
        setDetailedAddress(event.target.value);
    };

    return (
        <div css={addressContainer}>
            <div>
                <strong css={labelStyle(true)}>address</strong>
            </div>
            <div css={addressInputsContainer}>
                <div css={postCodeContainer}>
                    <div css={[boxStyle, zonecodeStyle]}>
                        {zonecode}
                    </div>
                    <button
                        css={addressButtonStyle}
                        type="button"
                        onClick={toggleHandler}
                    >
                        주소 찾기
                    </button>
                </div>
                {isOpen && (
                    <div>
                        <DaumPostcode
                            theme={themeObj}
                            style={postCodeStyle}
                            onComplete={completeHandler}
                            onClose={closeHandler}
                        />
                    </div>
                )}
                <div css={boxStyle}>{address}</div>
                <input
                    css={[
                        boxStyle,
                        // inputStyle(!props.addressIsValid), // TODO: custom hook 의 isTouched 사용
                    ]}
                    value={detailedAddress}
                    onChange={inputChangeHandler}
                />
            </div>
        </div>
    );
};

export default AddressInput;