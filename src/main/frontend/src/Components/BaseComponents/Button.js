import "./Button.css";

const Button = ({text, className, onClick}) => {

    return (
        <button
            className={className}
            onClick={onClick}>
            {text}
        </button>
    );
};

Button.defaultProps = {
    className: "btn-two cyan rounded",
};

export default Button;