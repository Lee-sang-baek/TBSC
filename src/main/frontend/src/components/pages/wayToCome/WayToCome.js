import "./WayToCome.css"
import bus from "../../imgs/bus.png"
import greenbus from "../../imgs/greenbus.png"
import redbus from "../../imgs/redbus.png"
import subway from "../../imgs/subway.png"

const WayToCome = () => {

    return (
        <div className="wayToCome">
            <div className="wayToComeContainer">
                <h1 className="wayToComeTitle">
                    오시는 길
                </h1>
                <div className="locationMapContainer">
                    {/*<Wrapper apiKey="" render={render}/>*/}
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d203.87991615586523!2d126.854493!3d35.154659!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3571890047b9b08f%3A0xcb86229dd6f9b934!2z6rSR7KO86rSA6rSR6riw7JeF7KeA7JuQ7IS87YSw!5e0!3m2!1sko!2sus!4v1716874170525!5m2!1sko!2sus"
                        width="100%" height="600" allowFullScreen="" loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div className="routeContainer">
                    <div className="routeName">
                        <div className="divisionLine">
                            <hr/>
                            <div className="linePoint"></div>
                        </div>
                        <h2 className="routeType">
                            Address
                        </h2>
                    </div>
                    <div className="routeDetail">
                        <hr/>
                        <div className="routeDetailContents">
                            <p className="number">
                                <h2>광주광역시 서구 운천로 247(치평동) 스타타워 4층</h2>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="routeContainer">
                    <div className="routeName">
                        <div className="divisionLine">
                            <hr/>
                            <div className="linePoint"></div>
                        </div>
                        <h2 className="routeType">
                            광주공항 출발
                        </h2>
                    </div>
                    <div className="routeDetail">
                        <hr/>
                        <div className="routeDetailContents">
                            <p className="busRoute">
                                <img src={bus}/>
                                <h3>지원45</h3>
                                <h5>공항역(5203) 승차 → 상무병원(2067) 하차 → 도보 246m</h5>
                            </p>
                            <p className="busRoute">
                                <img src={bus}/>
                                <h3>지원45</h3>
                                <h5>공항역(5203) 승차 → 5.18기념공원(2061) 하차 → 도보 189m</h5>
                            </p>
                            <p className="busRoute">
                                <img src={subway}/>
                                <h3>소태행</h3>
                                <h5>공항역(김대중컨벤션센터역 방면) 승차 → 운천역 하차 → 도보 789m</h5>
                            </p>
                            <p className="busRoute">
                                <img src={greenbus}/>
                                <h3>첨단20</h3>
                                <h5>공항역(5203) 승차 → 운천저수지(2089) 하차 → 도보 649m</h5>
                            </p>
                            <p className="busRoute">
                                <img src={bus}/>
                                <h3>송정19</h3>
                                <h5>공항역(5203) 승차 → 운천역(2087) 하차 → 도보 713m</h5>
                            </p>
                            <p className="busRoute">
                                <img src={redbus}/>
                                <h3>좌석02</h3>
                                <h5>공항역(5203) 승차 → 한국국토정보공사(2238) 하차 → 도보 690m</h5>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
};

export default WayToCome;