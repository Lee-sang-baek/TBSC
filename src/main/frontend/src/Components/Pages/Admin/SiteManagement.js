import React, { useState, useEffect } from "react";
import Button from "../../baseComponents/Button";
import "./SiteManagement.css";
import logoImage from "../../imgs/logo.png";
import VisualAssetManager from "./VisualAssetManager";
import axios from "axios";

const SiteManagement = () => {
    const [selectedSection, setSelectedSection] = useState("mainImg"); // 현재 선택된 섹션 상태
    const [isAssetManagerOpen, setIsAssetManagerOpen] = useState(false); // VisualAssetManager 창이 열려있는지 여부를 추적하는 상태
    const [mainImageList, setMainImageList] = useState([]);
    const [mPages, setMPages] = useState(0);
    const [mpage, setMPage] = useState(0);
    const [bannerList, setBannerList] = useState([]);
    const [bPages, setBPages] = useState(0);
    const [bpage, setBPage] = useState(0);
    const [popupList, setPopupList] = useState([]);
    const [pPages, setPPages] = useState(0);
    const [ppage, setPPage] = useState(0);


    useEffect(() => {
        loadList();
    }, []);

    const loadList = () => {
        axios.get(`mainImage/list?page=${mpage}&size=10`)
        .then((res) => {
            setMainImageList(res.data.content);
            setMPages(res.data.totalPages);
        });
        axios.get(`banner/list?page=${bpage}&size=10`)
        .then((res) => {
            setBannerList(res.data.content);
            setBPages(res.data.totalPages);
        });
        axios.get(`popup/list?page=${ppage}&size=10`)
        .then((res) => {
            setPopupList(res.data.content);
            setPPages(res.data.totalPages);
        });
    };

    const toggleSection = (section) => {
        setSelectedSection(section === selectedSection ? null : section); // 선택된 섹션이 현재 선택된 섹션과 같으면 null로 설정하여 토글
    };

    const toggleAssetManager = () => {
        setIsAssetManagerOpen(!isAssetManagerOpen); // VisualAssetManager 창 열림/닫힘 상태를 토글
    };

    const handlePageChange = (newPage, asset) => {
        if (asset === "mainImage") {
            if (newPage >= 0 && newPage < mPages) {
                setMPage(newPage);
            }
        }
        if (asset === "banner") {
            if (newPage >= 0 && newPage < bPages) {
                setBPage(newPage);
            }
        }
        if (asset === "popup") {
            if (newPage >= 0 && newPage < pPages) {
                setPPage(newPage);
            }
        }
    };

  return (
    <div className="SiteManagement-compo">
      <h2>사이트 관리</h2>

      <div className="management-button">
        <button onClick={() => toggleSection("mainImg")} className={selectedSection === "mainImg" ? "active" : "de-active"}>메인 이미지 관리</button>
        <button onClick={() => toggleSection("banner")} className={selectedSection === "banner" ? "active" : "de-active"}>베너 관리</button>
        <button onClick={() => toggleSection("popup")} className={selectedSection === "popup" ? "active" : "de-active"}>팝업 관리</button>
      </div>

      <div className={selectedSection === "mainImg" ? "main-img" : "hidden"}>

        <div className="middle-box">
            <h3>메인 이미지 관리</h3>

            <div className="pagination">
                <button onClick={() => handlePageChange(mpage - 1)} disabled={mpage === 0}>이전</button>
                <span>페이지: {mpage + 1} / {mPages}</span>
                <button onClick={() => handlePageChange(mpage + 1)} disabled={mpage === mPages - 1}>다음</button>
            </div>

            <div className="add-button">
                <Button text={isAssetManagerOpen ? "닫기" : "+ 추가"} className="btn-two blue rounded" onClick={toggleAssetManager} />
                {isAssetManagerOpen && <VisualAssetManager asset="메인 이미지" />}
            </div>
        </div>

      <table>
        <thead>
            <tr>
                <th>이미지</th>
                <th>이름</th>
                <th>내용</th>
                <th>기간</th>
                <th>수정</th>
                <th>제거</th>
            </tr>
        </thead>
        <tbody>
            {mainImageList.map((item, index) => (
                <tr key={index}>
                    <td><img src={`/upload/${item.image}`} alt={item.image}/></td>
                    <td>{item.title}</td>
                    <td>{item.content}</td>
                    <td>{item.startDate} ~ {item.endDate}</td>
                    <td>수정</td>
                    <td>제거</td>
                </tr>
            ))}
        </tbody>
      </table>

      </div>

      <div className={selectedSection === "banner" ? "banner" : "hidden"}>

          <div className="middle-box">
              <h3>베너 관리</h3>

                <div className="pagination">
                <button onClick={() => handlePageChange(bpage - 1)} disabled={bpage === 0}>이전</button>
                <span>페이지: {bpage + 1} / {bPages}</span>
                <button onClick={() => handlePageChange(bpage + 1)} disabled={bpage === bPages - 1}>다음</button>
                </div>

              <div className="add-button">
                  <Button text={isAssetManagerOpen ? "닫기" : "+ 추가"} className="btn-two blue rounded" onClick={toggleAssetManager} />
                  {isAssetManagerOpen && <VisualAssetManager asset="베너" />}
              </div>
          </div>

        <table>
          <thead>
              <tr>
                  <th>이미지</th>
                  <th>이름</th>
                  <th>내용</th>
                  <th>기간</th>
                  <th>수정</th>
                  <th>제거</th>
              </tr>
          </thead>
          <tbody>
            {bannerList.map((item, index) => (
                <tr key={index}>
                    <td>{item.image}</td>
                    <td>{item.state} {item.title}</td>
                    <td>{item.content}</td>
                    <td>{item.startDate} ~ {item.endDate}</td>
                    <td>수정</td>
                    <td>제거</td>
                </tr>
            ))}
          </tbody>
        </table>

        </div>

        <div className={selectedSection === "popup" ? "popup" : "hidden"}>

            <div className="middle-box">
                <h3>팝업 관리</h3>

                <div className="pagination">
                <button onClick={() => handlePageChange(ppage - 1)} disabled={ppage === 0}>이전</button>
                <span>페이지: {ppage + 1} / {pPages}</span>
                <button onClick={() => handlePageChange(ppage + 1)} disabled={ppage === pPages - 1}>다음</button>
                </div>

                <div className="add-button">
                  <Button text={isAssetManagerOpen ? "닫기" : "+ 추가"} className="btn-two blue rounded" onClick={toggleAssetManager} />
                  {isAssetManagerOpen && <VisualAssetManager asset="팝업" />}
              </div>
            </div>

          <table>
            <thead>
                <tr>
                    <th>이미지</th>
                    <th>이름</th>
                    <th>내용</th>
                    <th>기간</th>
                    <th>수정</th>
                    <th>제거</th>
                </tr>
            </thead>
            <tbody>
                {popupList.map((item, index) => (
                    <tr key={index}>
                        <td>{item.image}</td>
                        <td>{item.title}</td>
                        <td>{item.content}</td>
                        <td>{item.startDate} ~ {item.endDate}</td>
                        <td>수정</td>
                        <td>제거</td>
                </tr>
                ))}
            </tbody>
          </table>

          </div>

    </div>
  );
};

export default SiteManagement;