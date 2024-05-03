import "./Button.css";

const Button = ({text, className, onClick, link }) => {

    return (
        <a href={link}>
        <button
            className={className}
            onClick={onClick}>
            {text}
        </button>
        </a>
    );
};

Button.defaultProps = {
    className: "btn-two cyan rounded",
    link: "#",
};

export default Button;