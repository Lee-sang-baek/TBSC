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
    const [isUpdateManagerOpen, setIsUpdateManagerOpen] = useState(0);
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
        if (isUpdateManagerOpen) {
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
        <SectionComponent
            section={selectedSection === "mainImage" ? "main-img" : "hidden"}
            title="메인 이미지"
            itemList={mainImageList}
            isAssetManagerOpen={isAssetManagerOpen}
            toggleAssetManager={toggleAssetManager}
            toggleUpdateManager={toggleUpdateManager}
            isUpdateManagerOpen={isUpdateManagerOpen}
            setDeleteItemId={setDeleteItemId}
            setShowDeleteModal={setShowDeleteModal}
            page={mpage}
            pages={mPages}
            handlePageChange={handlePageChange}
        />
        <SectionComponent
            section={selectedSection === "banner" ? "banner" : "hidden"}
            title="베너"
            itemList={bannerList}
            isAssetManagerOpen={isAssetManagerOpen}
            toggleAssetManager={toggleAssetManager}
            toggleUpdateManager={toggleUpdateManager}
            isUpdateManagerOpen={isUpdateManagerOpen}
            setDeleteItemId={setDeleteItemId}
            setShowDeleteModal={setShowDeleteModal}
            page={bpage}
            pages={bPages}
            handlePageChange={handlePageChange}
        />
        <SectionComponent
            section={selectedSection === "popup" ? "popup" : "hidden"}
            title="팝업"
            itemList={popupList}
            isAssetManagerOpen={isAssetManagerOpen}
            toggleAssetManager={toggleAssetManager}
            toggleUpdateManager={toggleUpdateManager}
            isUpdateManagerOpen={isUpdateManagerOpen}
            setDeleteItemId={setDeleteItemId}
            setShowDeleteModal={setShowDeleteModal}
            page={ppage}
            pages={pPages}
            handlePageChange={handlePageChange}
        />
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

const TableComponent = ({ asset, itemList, toggleUpdateManager, setDeleteItemId, setShowDeleteModal, isUpdateManagerOpen }) => {

    const getStatus = (start, end) => {
        const now = new Date();
        const startDate = new Date(start);
        const endDate = new Date(end);
    
        if (now >= startDate && now <= endDate) {
            return (<label className="already">[표시중]</label>); // Currently displayed
        } else if (now < startDate) {
            return (<label className="notyet">[예약됨]</label>); // Scheduled
        } else {
            return (<label className="end">[기간만료]</label>); // Expired
        }
    };

    return (
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
                {itemList.map((item, index) => (
                    <tr key={index}>
                        <td><img src={`/uploads/${item.image}`} alt={item.image} /></td>
                        <td>{item.title}</td>
                        <td>{item.content}</td>
                        <td>
                            {getStatus(item.start, item.end)} <br /> 
                            {DateFormat(item.start)} ~ <br /> 
                            {DateFormat(item.end)}
                        </td>
                        <td>
                            <Button text="수정" className="btn-two blue rounded" onClick={() => toggleUpdateManager(item.num)} />
                            {isUpdateManagerOpen === item.num && (
                                <VisualAssetManager asset={asset} itemToEdit={item} close={() => toggleUpdateManager(0)} />
                            )}
                        </td>
                        <td>
                            <Button onClick={() => { setDeleteItemId(item.num); setShowDeleteModal(true); }} text="제거" className="btn-two red rounded" />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

const SectionComponent = ({ section, title, itemList, isAssetManagerOpen, toggleAssetManager, toggleUpdateManager, isUpdateManagerOpen, setDeleteItemId, setShowDeleteModal, page, pages, handlePageChange }) => (
    <div className={section ? section : "hidden"}>
        <div className="middle-box">
            <h3>{title}</h3>
            <div className="add-button">
                <Button text="+ 추가" className="btn-two blue rounded" onClick={toggleAssetManager} />
                {isAssetManagerOpen && <VisualAssetManager asset={title} close={toggleAssetManager} />}
            </div>
        </div>
        <TableComponent
            asset={title}
            itemList={itemList}
            toggleUpdateManager={toggleUpdateManager}
            setDeleteItemId={setDeleteItemId}
            setShowDeleteModal={setShowDeleteModal}
            isUpdateManagerOpen={isUpdateManagerOpen}
        />
        <div className="pagination">
            <button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>이전</button>
            <span>페이지: {page + 1} / {pages}</span>
            <button onClick={() => handlePageChange(page + 1)} disabled={page === pages - 1}>다음</button>
        </div>
    </div>
);

export default SiteManagement;