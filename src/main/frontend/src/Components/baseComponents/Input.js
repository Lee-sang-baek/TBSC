import "./Input.css";

const Input = ({text, type, className, value, onChange, maxLength, readOnly}) => {
    return (
        <div className="Input-compo">
            <input
                type={type}
                className={className}
                value={value}
                onChange={onChange}
                maxLength={maxLength}
                readOnly={readOnly}
            >
                {text}
            </input>
        </div>
    );
};

export default Input;
