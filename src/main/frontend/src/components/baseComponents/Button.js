import "./Button.css";

const Button = ({text, className, onClick, link = "#" }) => {

    return (
        <div className="Button-compo">
            <a href={link}>
                <button
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
    className: "btn-two cyan rounded",
};

export default Button;
