import "./Input.css";

const Input = ({text, type, className, value, onChange}) => {
    return (
        <input
            type={type}
            className={className}
            value={value}
            onChange={onChange}
        >
            {text}
        </input>
    );
};

export default Input;