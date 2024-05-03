import "./Button.css";

const Button = ({text, className, onClick}) => {

    return (
        <div className="Button-compo">
            <button
                className={className}
                onClick={onClick}>
                {text}
            </button>
        </div>
    );
};

Button.defaultProps = {
    className: "btn-two cyan rounded",
};

export default Button;