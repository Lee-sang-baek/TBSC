import { Link } from "react-router-dom";
import "./NeedLoginForm.css";

const NeedLoginForm = () => {
    return (
        <div className="NeedLoginForm-compo">
            <div>
                <h1>로그인 후 이용해주세요</h1>
                <Link to="/login"><h3>로그인 페이지로</h3></Link>
            </div>
        </div>
    );
};

export default NeedLoginForm;
