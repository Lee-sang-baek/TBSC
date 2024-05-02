import { css } from '@emotion/react';

export const formContainer = css`
  padding: 16px;
  height: 100%;
`;

export const inputsContainer = css`
  max-height: 50vh;
  overflow: auto;
`;

export const inputContainer = css`
  padding: 4px;
  font-size: 16px;
  //font-family: 'Jost';
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  & span {
    margin: 3px;
    color: #ccc;
  }
`;

export const labelStyle = (isRequired) => {
    const baseStyle = {
        display: 'inline-block',
        width: '128px',
        fontWeight: 400,
    };

    if (isRequired) {
        baseStyle['&::after'] = {
            content: '"*"',
            color: '#c05850',
        };
    }

    return css(baseStyle);
};

export const inputStyle = (isInValid) => css`
  border-radius: 0;
  border: 1.2px solid ${isInValid ? '#c05850bf' : '#ccc'};
  height: 32px;
  padding: 4px 8px;
  outline: none;

  &:focus {
    border-color: #444;
  }
`;

export const narrow = css`
  width: 64px;
`;

export const wide = css`
  flex-grow: 1;
`;

export const actionsContainer = css`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  padding: 16px 0 0 0;
  border-top: 1px solid #f4f4f4;

  & p {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    & p {
      display: none;
    }
  }
`;

export const noBorder = css`
  border: 1px solid transparent;
  &:hover {
    border: 1px solid transparent;
  }
`;

export const orderButton = (formIsValid) => css`
  cursor: ${formIsValid ? 'pointer' : 'not-allowed'};
  opacity: ${formIsValid ? '1' : '0.3'};

  &:hover {
    background: ${formIsValid ? '' : 'transparent'};
    color: ${formIsValid ? '' : '#c05850'};
  }
`;