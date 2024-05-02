/** @jsxImportSource @emotion/react */
import { useState } from "react";

import {
    formContainer,
    inputsContainer,
} from "../styles/form-style";

import AddressInput from "./AddressInput";

const Form = (props) => {
    const [zonecode, setZonecode] = useState("");
    const [address, setAddress] = useState("");
    const [detailedAddress, setDetailedAddress] = useState("");

    const addressRegEx = /.+/;

    const addressIsValid = addressRegEx.test(detailedAddress);

    const resetAddress = () => {
        setZonecode("");
        setAddress("");
        setDetailedAddress("");
    };

    let formIsValid = false;
    if (
        addressIsValid
    ) {
        formIsValid = true;
    }

    const formSubmitHandler = (event) => {
        event.preventDefault();
        if (!formIsValid) {
            return;
        }

        const userData = {
            address: `${address} ${detailedAddress}`,
            zonecode: zonecode,
        };
        
        //입력후 값 전달
        props.onOrder(userData);

        resetAddress();
    };

    return (
        <form css={formContainer} onSubmit={formSubmitHandler}>
            <div css={inputsContainer}>
                <AddressInput
                    addressState={{
                        zonecode,
                        address,
                        detailedAddress,
                    }}
                    addressAction={{
                        setZonecode,
                        setAddress,
                        setDetailedAddress,
                    }}
                    addressIsValid={addressIsValid}
                />
            </div>
        </form>
    );
};

export default Form;