import "./Input.css";

const Input = ({text, type, className, value, onChange}) => {
    return (
        <div className="Input-compo">
            <input
                type={type}
                className={className}
                value={value}
                onChange={onChange}
            >
                {text}
            </input>
        </div>
    );
};

export default Input;