import userProfile from "../../Imgs/userProfile.png";
import "./mypageHome.css";
import Button from "../../BaseComponents/Button";

const MyHome = () => {

    return (
        <form>
            <div className="container">
                <h3 className="profile">
                    <img className="profileImg" src={userProfile} alt="profile"/>

                    <div className="profileInfo">
                        <div>
                            <div className="profileId">아이디</div>
                            <div className="profileName">이름</div>
                            <div className="profileEmail">Email</div>
                        </div>
                        <div>
                            <div className="idText">아이디</div>
                            <div className="nameText">이름</div>
                            <div className="emailText">Email</div>
                        </div>
                    </div>
                </h3>

            </div>
            <div className="profileModify">
                <Button onClick={() => {}} text="개인정보수정" className="btn-two cyan rounded" />
                {/*<a href="/#" className="btn-two cyan rounded">*/}
                {/*    <button onClick={() => {*/}
                {/*    }}>*/}
                {/*        개인정보수정*/}
                {/*    </button>*/}
                {/*</a>*/}
            </div>

            <h2 className="reservDetailTitle">
                예약내역
            </h2>

            <div className="reservDetails">
                <h3 className="reservDate">123213123</h3>
                <h3 className="reservTitle">제목</h3>
                <h3 className="reservState">상태</h3>
                <Button onClick={() => {
                    console.log("dk");
                }} text="버틍" className="btn-two blue"/>
            </div>
        </form>
    );
};

export default MyHome;