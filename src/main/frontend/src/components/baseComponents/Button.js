import "./Button.css";

const Button = ({ type, text, className, onClick, link = "#" }) => {

    return (
        <div className="Button-compo">
            <a href={link}>
                <button
                    type={type}
                    className={className}
                    onClick={onClick}
                >
                    {text}
                </button>
            </a>
        </div>
    );
};

Button.defaultProps = {
    type: "button",
    className: "btn-two cyan rounded",
};

export default Button;
