import { css } from "@emotion/react";

export const addressContainer = css`
  width: 100%;
  padding: 4px;
  font-size: 16px;
  //font-family: "Jost";
  display: flex;
  flex-wrap: wrap;
`;

export const addressInputsContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const postCodeContainer = css`
  display: flex;
  gap: 8px;
`;

export const boxStyle = css`
  border-radius: 0;
  border: 1.2px solid #ccc;
  width: 91%;
  height: 30px;
  padding: 4px 8px;
  outline: none;
  font-size: 14px;
  background-color: #fff;
  &:focus {
    border-color: #444;
  }
`;

export const zonecodeStyle = css`
  width: 35%;
`;

export const addressButtonStyle = css`
  border-radius: 0;
  border: 1.2px solid #ccc;
  height: 30px;
  padding: 4px 8px;
  background: #f4f4f4;
  cursor: pointer;

  &:hover {
    background: #f1f1f1;
  }
`;