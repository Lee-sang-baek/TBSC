import React, { useState, useEffect } from "react";
import Button from "../../baseComponents/Button";
import "./SiteManagement.css";
import { DateFormat } from "../../util/DateFormat";
import VisualAssetManager from "./VisualAssetManager";
import axios from "axios";

const SiteManagement = () => {
    useEffect(() => {
        if (sessionStorage.getItem("state") !== "ADMIN") {
            window.location.href = "/";
        }
    }, [])
    const [selectedSection, setSelectedSection] = useState("mainImage"); // 현재 선택된 섹션 상태
    const [isAssetManagerOpen, setIsAssetManagerOpen] = useState(false); // VisualAssetManager 창이 열려있는지 여부를 추적하는 상태
    const [isUpadateManagerOpen, setIsUpdateManagerOpen] = useState(0);
    const [mainImageList, setMainImageList] = useState([]);
    const [mPages, setMPages] = useState(0);
    const [mpage, setMPage] = useState(0);
    const [bannerList, setBannerList] = useState([]);
    const [bPages, setBPages] = useState(0);
    const [bpage, setBPage] = useState(0);
    const [popupList, setPopupList] = useState([]);
    const [pPages, setPPages] = useState(0);
    const [ppage, setPPage] = useState(0);
    const [size, setSize] = useState(5);
    const [showDeleteModal, setShowDeleteModal] = useState(false); // 삭제 모달 창 표시 여부 상태
    const [deleteItemId, setDeleteItemId] = useState(null); // 삭제할 아이템 ID 상태


    useEffect(() => {
        loadList();
    }, [size, mpage, ppage, bpage]);

    const loadList = () => {
        axios.get(`/admin/mainImage/list?page=${mpage}&size=${size}`)
        .then((res) => {
            setMainImageList(res.data.content);
            setMPages(res.data.totalPages);
        });
        axios.get(`/admin/banner/list?page=${bpage}&size=${size}`)
        .then((res) => {
            setBannerList(res.data.content);
            setBPages(res.data.totalPages);
        });
        axios.get(`/admin/popup/list?page=${ppage}&size=${size}`)
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

    const toggleUpdateManager = (num) => {
        if (isUpadateManagerOpen) {
            setIsUpdateManagerOpen(0);
        } else {
            setIsUpdateManagerOpen(num);
        }
    };

    const handlePageChange = (newPage) => {
        if (selectedSection === "mainImage") {
            if (newPage >= 0 && newPage < mPages) {
                setMPage(newPage);
            }
        }
        if (selectedSection === "banner") {
            if (newPage >= 0 && newPage < bPages) {
                setBPage(newPage);
            }
        }
        if (selectedSection === "popup") {
            if (newPage >= 0 && newPage < pPages) {
                setPPage(newPage);
            }
        }
    };

    const confirmDelete = () => {
        const assetStr = selectedSection;
        if (deleteItemId && assetStr) {
            axios.get(`/admin/${assetStr}/remove?num=${deleteItemId}`)
                .then(() => {
                    alert("삭제 되었습니다.")
                    loadList();
                })
                .catch((error) => {
                    console.error('Error deleting item:', error);
                })
                .finally(() => {
                    setShowDeleteModal(false);
                    setDeleteItemId(null);
                });
        }
    };

    if (sessionStorage.getItem("state") !== "ADMIN") {
        return null;
    }

  return (
    <div className="SiteManagement-compo">
      <h2>사이트 관리</h2>

      <div className="management-button">
        <button onClick={() => toggleSection("mainImage")} className={selectedSection === "mainImage" ? "active" : "de-active"}>메인 이미지 관리</button>
        <button onClick={() => toggleSection("banner")} className={selectedSection === "banner" ? "active" : "de-active"}>베너 관리</button>
        <button onClick={() => toggleSection("popup")} className={selectedSection === "popup" ? "active" : "de-active"}>팝업 관리</button>
      </div>

      <label className="size-label">
            한 페이지에 표시 할 개체 수
            <input type="number" value={size} onChange={(e) => setSize(e.target.value)} />
        </label>

      <div className={selectedSection === "mainImage" ? "main-img" : "hidden"}>

        <div className="middle-box">
            <h3>메인 이미지 관리</h3>

            <div className="add-button">
                <Button text="+ 추가" className="btn-two blue rounded" onClick={toggleAssetManager} />
                {isAssetManagerOpen && <VisualAssetManager asset="메인 이미지" close={toggleAssetManager}/>}
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
                    <td><img src={`/uploads/${item.image}`} alt={item.image}/></td>
                    <td>{item.title}</td>
                    <td>{item.content}</td>
                    <td>{item.startDate} ~ {item.endDate}</td>
                    <td>
                        <Button text="수정" className="btn-two blue rounded" onClick={() => toggleUpdateManager(item.num)} />
                        {isUpadateManagerOpen === item.num && <VisualAssetManager asset="메인 이미지" itemToEdit={item} close={() => toggleUpdateManager(0)} />}
                    </td>
                    <td><Button onClick={() => {setDeleteItemId(item.num); setShowDeleteModal(true);}} text="제거" className="btn-two red rounded" /></td>
                </tr>
            ))}
        </tbody>
      </table>

        <div className="pagination">
            <button onClick={() => handlePageChange(mpage - 1)} disabled={mpage === 0}>이전</button>
            <span>페이지: {mpage + 1} / {mPages}</span>
            <button onClick={() => handlePageChange(mpage + 1)} disabled={mpage === mPages - 1}>다음</button>
        </div>

      </div>

      <div className={selectedSection === "banner" ? "banner" : "hidden"}>

          <div className="middle-box">
              <h3>베너 관리</h3>

              <div className="add-button">
                  <Button text="+ 추가" className="btn-two blue rounded" onClick={toggleAssetManager} />
                  {isAssetManagerOpen && <VisualAssetManager asset="베너" close={toggleAssetManager} />}
              </div>
          </div>

        <table>
          <thead>
              <tr>
                  <th>이미지</th>
                  <th>이름</th>
                  <th>내용</th>
                  <th>기간</th>
                  <th>구분</th>
                  <th>수정</th>
                  <th>제거</th>
              </tr>
          </thead>
          <tbody>
            {bannerList.map((item, index) => (
                <tr key={index}>
                    <td><img src={`/uploads/${item.image}`} alt={item.image}/></td>
                    <td>{item.title}</td>
                    <td>{item.content}</td>
                    <td>{item.startDate} ~ {item.endDate}</td>
                    <td>{item.state === 'SIDE' ? "사이드 베너" : "메인 베너"}</td>
                    <td>
                        <Button text="수정" className="btn-two blue rounded" onClick={() => toggleUpdateManager(item.num)} />
                        {isUpadateManagerOpen === item.num && <VisualAssetManager asset="베너" itemToEdit={item} close={() => toggleUpdateManager(0)} />}
                    </td>
                    <td><Button onClick={() => {setDeleteItemId(item.num); setShowDeleteModal(true);}} text="제거" className="btn-two red rounded" /></td>
                </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
            <button onClick={() => handlePageChange(bpage - 1)} disabled={bpage === 0}>이전</button>
            <span>페이지: {bpage + 1} / {bPages}</span>
            <button onClick={() => handlePageChange(bpage + 1)} disabled={bpage === bPages - 1}>다음</button>
        </div>

        </div>

        <div className={selectedSection === "popup" ? "popup" : "hidden"}>

            <div className="middle-box">
                <h3>팝업 관리</h3>

                <div className="add-button">
                  <Button text="+ 추가" className="btn-two blue rounded" onClick={toggleAssetManager} />
                  {isAssetManagerOpen && <VisualAssetManager asset="팝업" close={toggleAssetManager} />}
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
                        <td><img src={`/uploads/${item.image}`} alt={item.image}/></td>
                        <td>{item.title}</td>
                        <td>{item.content}</td>
                        <td>{DateFormat(item.startDate)} ~<br/> {DateFormat(item.endDate)}</td>
                        <td>
                            <Button text="수정" className="btn-two blue rounded" onClick={() => toggleUpdateManager(item.num)} />
                            {isUpadateManagerOpen === item.num && <VisualAssetManager asset="팝업" itemToEdit={item} close={() => toggleUpdateManager(0)} />}
                        </td>
                        <td><Button onClick={() => {setDeleteItemId(item.num); setShowDeleteModal(true);}} text="제거" className="btn-two red rounded" /></td>
                </tr>
                ))}
            </tbody>
          </table>

          <div className="pagination">
                <button onClick={() => handlePageChange(ppage - 1)} disabled={ppage === 0}>이전</button>
                <span>페이지: {ppage + 1} / {pPages}</span>
                <button onClick={() => handlePageChange(ppage + 1)} disabled={ppage === pPages - 1}>다음</button>
            </div>

          </div>

        {showDeleteModal && (
            <div className="modal">
                <div className="modal-content">
                    <p>정말로 삭제하시겠습니까?</p>
                    <div>
                        <Button onClick={confirmDelete} text="확인" className="btn-two red rounded" />
                        <Button onClick={() => setShowDeleteModal(false)} text="취소" className="btn-two cyan rounded" />
                    </div>
                </div>
            </div>
        )}

    </div>
  );
};

export default SiteManagement;