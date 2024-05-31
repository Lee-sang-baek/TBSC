import "./OrgChart.css"
import img from "../../imgs/tel.png"

const OrgChart = () => {

    return (
        <div className="orgChart">
            <div className="orgChartContainer">
                <h2 className="orgChartTitle">
                    조직도
                </h2>
                <div className="personContainer">
                    <div className="orgChartName">
                        <div className="divisionLine">
                            <hr/>
                            <div className="linePoint"></div>
                        </div>
                        <h2 className="personName">
                            김영우
                            <div className="orgPosition">
                                센터장
                            </div>
                        </h2>
                    </div>
                    <div className="orgChartDetail">
                        <hr/>
                        <div className="chartDetailContents">
                            <ul>
                                <li>센터 총괄 및 대외 협력사업</li>
                                <li>센터 추진사업 성과 관리</li>
                            </ul>
                            <p className="number">
                                <img src={img}/>
                                <a href="tel:0623670640">062.367.0640</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="personContainer">
                    <div className="orgChartName">
                        <div className="divisionLine">
                            <hr/>
                            <div className="linePoint"></div>
                        </div>
                        <h2 className="personName">
                            김소연
                            <div className="orgPosition">
                                부센터장
                            </div>
                        </h2>
                    </div>
                    <div className="orgChartDetail">
                        <hr/>
                        <div className="chartDetailContents">
                            <ul>
                                <li>센터 행정 운영 및 성과목표 관리</li>
                                <li>센터 예산 및 회계</li>
                                <li>센터 운영위원회 개최</li>
                                <li>월광이슈포럼 개최</li>
                            </ul>
                            <p className="number">
                                <img src={img}/>
                                <a href="tel:0623670642">062.367.0642</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="personContainer">
                    <div className="orgChartName">
                        <div className="divisionLine">
                            <hr/>
                            <div className="linePoint"></div>
                        </div>
                        <h2 className="personName">
                            최경권
                            <div className="orgPosition">
                                과장
                            </div>
                        </h2>
                    </div>
                    <div className="orgChartDetail">
                        <hr/>
                        <div className="chartDetailContents">
                            <ul>
                                <li>성장단계별 맞춤 지원사업 운영</li>
                                <li>관광박람회 광주 관광기업 공동관 참가</li>
                                <li>센터 입주기업 모집 및 운영 활성화</li>
                                <li>센터 자산관리</li>
                            </ul>
                            <p className="number">
                                <img src={img}/>
                                <a href="tel:0623670646">062.367.0646</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="personContainer">
                    <div className="orgChartName">
                        <div className="divisionLine">
                            <hr/>
                            <div className="linePoint"></div>
                        </div>
                        <h2 className="personName">
                            임푸름
                            <div className="orgPosition">
                                PM
                            </div>
                        </h2>
                    </div>
                    <div className="orgChartDetail">
                        <hr/>
                        <div className="chartDetailContents">
                            <ul>
                                <li>광주 관광 직무역량(OJT) 아카데미 및 인턴십 운영</li>
                                <li>광주 크리에이티브 관광인재 양성사업 운영</li>
                                <li>광주 관광 로컬 크리에이터 육성사업 운영</li>
                                <li>광주 관광기업 홍보 팝업스토어 운영</li>
                            </ul>
                            <p className="number">
                                <img src={img}/>
                                <a href="tel:0623670643">062.367.0643</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="personContainer">
                    <div className="orgChartName">
                        <div className="divisionLine">
                            <hr/>
                            <div className="linePoint"></div>
                        </div>
                        <h2 className="personName">
                            이재만
                            <div className="orgPosition">
                                PM
                            </div>
                        </h2>
                    </div>
                    <div className="orgChartDetail">
                        <hr/>
                        <div className="chartDetailContents">
                            <ul>
                                <li>광주 소규모 관광사업체 육성 아카데미 운영</li>
                                <li>광주 관광 일자리박람회 개최</li>
                                <li>광주 관광인재 양성 디지털 교육 운영</li>
                                <li>관광기업 네트워킹 데이 개최</li>
                            </ul>
                            <p className="number">
                                <img src={img}/>
                                <a href="tel:0623670647">062.367.0647</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="personContainer">
                    <div className="orgChartName">
                        <div className="divisionLine">
                            <hr/>
                            <div className="linePoint"></div>
                        </div>
                        <h2 className="personName">
                            손혜주
                            <div className="orgPosition">
                                PM
                            </div>
                        </h2>
                    </div>
                    <div className="orgChartDetail">
                        <hr/>
                        <div className="chartDetailContents">
                            <ul>
                                <li>광주 관광기업 홍보(라이브커머스, 홍보영상 제작)</li>
                                <li>광주 관광 일자리상담소 운영</li>
                                <li>광주 관광 멘토링·자문단 운영</li>
                                <li>센터 홍보(홈페이지, 홍보물 제작 등)</li>
                                <li>센터 시설 대관, 비품 관리</li>
                            </ul>
                            <p className="number">
                                <img src={img}/>
                                <a href="tel:0623670644">062.367.0644</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrgChart;