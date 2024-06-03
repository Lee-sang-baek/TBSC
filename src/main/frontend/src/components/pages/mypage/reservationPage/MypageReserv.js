import React, {useEffect, useState} from "react";
import "./MypageReserv.css";
import Sidebar from "../../../fragments/sidebar/Sidebar";
import Button from "../../../baseComponents/Button";
import axios from "axios";
import img from "../../../imgs/login.png";
import {useNavigate} from "react-router-dom";

const ReservDetails = (props) => {
    const memberId = sessionStorage.getItem("id");

    const [selectedSection, setSelectedSection] = useState("consultant"); // 현재 선택된 섹션 상태

    const [currentPage, setCurrentPage] = useState(1);

    const pagesPerGroup = 5; // 5페이지씩 보이게

    const [consultantList, setConsultantList] = useState([]);
    const [jobConsultList, setJobConsultList] = useState([]);
    const [rentalList, setRentalList] = useState([]);

    const [consultantTotalPages, setConsultantTotalPages] = useState(1);
    const [jobConsultTotalPages, setJobConsultTotalPages] = useState(1);
    const [rentalTotalPages, setRentalTotalPages] = useState(1);

    const [total, setTotal] = useState(1);
    const [currentGroup, setCurrentGroup] = useState(1);
    const [cancelReserve, setCancelReserve] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [consultantStartPage, setConsultantStartPage] = useState(1);
    const [consultantEndPage, setConsultantEndPage] = useState(1);

    const [jobConsultStartPage, setJobConsultStartPage] = useState(1);
    const [jobConsultEndPage, setJobConsultEndPage] = useState(1);

    const [rentalStartPage, setRentalStartPage] = useState(1);
    const [rentalEndPage, setRentalEndPage] = useState(1);

    useEffect(() => {
        if (memberId) {
            getReserve();
            setCurrentGroup(Math.ceil(currentPage / pagesPerGroup));
        }
    }, [memberId, currentPage]);

    useEffect(() => {
        if (selectedSection === "consultant") {
            setTotal(consultantList.totalElements || 0);
            setConsultantStartPage(((currentGroup - 1) * pagesPerGroup) + 1);
            setConsultantEndPage(Math.min(currentGroup * pagesPerGroup, consultantTotalPages || 1));
        } else if (selectedSection === "jobConsult") {
            setTotal(jobConsultList.totalElements || 0);
            setJobConsultStartPage(((currentGroup - 1) * pagesPerGroup) + 1);
            setJobConsultEndPage(Math.min(currentGroup * pagesPerGroup, jobConsultTotalPages || 1));
        } else if (selectedSection === "rental") {
            setTotal(rentalList.totalElements || 0);
            setRentalStartPage(((currentGroup - 1) * pagesPerGroup) + 1);
            setRentalEndPage(Math.min(currentGroup * pagesPerGroup, rentalTotalPages || 1));
        }
    }, [selectedSection, currentGroup, pagesPerGroup, consultantTotalPages, jobConsultTotalPages, rentalTotalPages]);

    const getReserve = () => {
        axios.get(`/consultants/member/pageable/${memberId}?page=${currentPage - 1}`)
            .then((res) => {
                setConsultantList(res.data.content);
                setConsultantTotalPages(res.data.totalPages);
                setTotal(res.data.totalElements);
            });
        axios.get(`/jobConsult/member/pageable/${memberId}?page=${currentPage - 1}`)
            .then((res) => {
                setJobConsultList(res.data.content);
                setJobConsultTotalPages(res.data.totalPages);
                setTotal(res.data.totalElements);
            });
        axios.get(`/rental/member/pageable/${memberId}?page=${currentPage - 1}`)
            .then((res) => {
                setRentalList(res.data.content);
                setRentalTotalPages(res.data.totalPages);
                setTotal(res.data.totalElements);
            });
    }

    // 예약 취소 버튼 클릭 시 호출되는 함수
    const cancelReservation = () => {
        axios.put(`/rental/modify/${cancelReserve}`)
            .then((res) => {
                console.log("Reservation cancelled successfully");
                // 예약 정보를 다시 가져옵니다. (업데이트된 정보 반영)
                getReserve();
            })
            .catch((error) => {
                console.error("Error cancelling reservation:", error);
            });
        setShowDeleteModal(false);
    }

    const toggleSection = (section) => {
        setSelectedSection(section === selectedSection ? null : section); // 선택된 섹션이 현재 선택된 섹션과 같으면 null로 설정하여 토글
    };

    const modifyLink = (index) => {
        window.location.href = `/myPage/modify-reserv/${index}`;
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePreviousGroup = () => {
        if (selectedSection === "consultant") {
            setCurrentPage(consultantStartPage - 1);
        } else if (selectedSection === "jobConsult") {
            setCurrentPage(jobConsultStartPage - 1);
        } else if (selectedSection === "rental") {
            setCurrentPage(rentalStartPage - 1);
        }
    };

    const handleNextGroup = () => {
        if (selectedSection === "consultant") {
            setCurrentPage(consultantEndPage + 1);
        } else if (selectedSection === "jobConsult") {
            setCurrentPage(jobConsultEndPage + 1);
        } else if (selectedSection === "rental") {
            setCurrentPage(rentalEndPage + 1);
        }
    };

    const handleCancelClick = (num) => {
        setCancelReserve(num);
        setShowDeleteModal(true);
    };

    if (!memberId) {
        return (
            <div className="rental-compo">
                <div className="rental-compo-in">
                    <h1>로그인 후 이용해주세요</h1>
                </div>
            </div>
        );
    }
    ;

    return (
        <div className="ReservDetails-compo">
            <h1 className="pageTitle">예약 내역</h1>

            <div className="management-button">
                <button onClick={() => {
                    toggleSection("consultant");
                    setCurrentPage(1);
                    setCurrentGroup(1);
                }}
                        className={selectedSection === "consultant" ? "active" : "de-active"}>기업 컨설팅 신청
                </button>
                <button onClick={() => {
                    toggleSection("jobConsult");
                    setCurrentPage(1);
                    setCurrentGroup(1);
                }}
                        className={selectedSection === "jobConsult" ? "active" : "de-active"}>일자리 상담 신청
                </button>
                <button onClick={() => {
                    toggleSection("rental");
                    setCurrentPage(1);
                    setCurrentGroup(1);
                }}
                        className={selectedSection === "rental" ? "active" : "de-active"}>회의실 대관 신청
                </button>
            </div>

            {selectedSection === "consultant" && (
                <div className="pagination">
                    {(consultantStartPage > 1) && (
                        <button onClick={handlePreviousGroup}>&laquo;</button>
                    )}
                    {[...Array(consultantEndPage - consultantStartPage + 1)].map((_, index) => {
                        const pageNumber = consultantStartPage + index;

                        return (
                            <button
                                key={pageNumber}
                                onClick={() => handlePageChange(pageNumber)}
                                className={pageNumber === currentPage ? 'active' : ''}
                            >
                                {pageNumber}
                            </button>
                        );
                    })}
                    {consultantEndPage < consultantTotalPages && (
                        <button onClick={handleNextGroup}>&raquo;</button>
                    )}
                </div>)}
            {selectedSection === "consultant" && consultantList && consultantList.map((reservation, index) => (
                <ReservesViewer reservation={reservation} index={index} selectedSection={selectedSection}
                                handleCancelClick={handleCancelClick} modifyLink={modifyLink}/>
            ))}

            {selectedSection === "jobConsult" && (
                <div className="pagination">
                    {(jobConsultStartPage > 1) && (
                        <button onClick={handlePreviousGroup}>&laquo;</button>
                    )}
                    {[...Array(jobConsultEndPage - jobConsultStartPage + 1)].map((_, index) => {
                        const pageNumber = jobConsultStartPage + index;

                        return (
                            <button
                                key={pageNumber}
                                onClick={() => handlePageChange(pageNumber)}
                                className={pageNumber === currentPage ? 'active' : ''}
                            >
                                {pageNumber}
                            </button>
                        );
                    })}
                    {jobConsultEndPage < jobConsultTotalPages && (
                        <button onClick={handleNextGroup}>&raquo;</button>
                    )}
                </div>
            )}
            {selectedSection === "jobConsult" && jobConsultList && jobConsultList.map((reservation, index) => (
                <ReservesViewer reservation={reservation} index={index} selectedSection={selectedSection}
                                handleCancelClick={handleCancelClick} modifyLink={modifyLink}/>
            ))}

            {selectedSection === "rental" && (
                <div className="pagination">
                    {(rentalStartPage > 1) && (
                        <button onClick={handlePreviousGroup}>&laquo;</button>
                    )}
                    {[...Array(rentalEndPage - rentalStartPage + 1)].map((_, index) => {
                        const pageNumber = rentalStartPage + index;

                        return (
                            <button
                                key={pageNumber}
                                onClick={() => handlePageChange(pageNumber)}
                                className={pageNumber === currentPage ? 'active' : ''}
                            >
                                {pageNumber}
                            </button>
                        );
                    })}
                    {rentalEndPage < rentalTotalPages && (
                        <button onClick={handleNextGroup}>&raquo;</button>
                    )}
                </div>
            )}
            {selectedSection === "rental" && rentalList && rentalList.map((reservation, index) => (
                <ReservesViewer reservation={reservation} index={index} selectedSection={selectedSection} handleCancelClick={handleCancelClick}
                                modifyLink={modifyLink}/>
            ))}

            {showDeleteModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>정말 예약을 취소하시겠습니까?</h2>
                        <button onClick={cancelReservation}>예</button>
                        <button onClick={() => setShowDeleteModal(false)}>아니오</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const ReservesViewer = ({reservation, index, handleCancelClick, modifyLink, selectedSection}) => {

    // 날짜와 시간 형식을 변환하는 함수
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(); // 형식을 원하는 대로 변경할 수 있습니다.
    }

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString(); // 형식을 원하는 대로 변경할 수 있습니다.
    }

    console.log(reservation);
    console.log(selectedSection);

    return (
        <div className="pageInfo" key={index}>
            <div className="reservContainer">
                <div className="reservHeader">
                    <div className="reservTitle">
                        {reservation.place || ""}
                    </div>

                    <div className="reservDate">
                        {selectedSection === "rental" &&
                            <>
                                <div className="startDate">
                                    {formatDate(reservation.startDate) || ""}
                                </div>
                                <p>~</p>
                                <div className="endDate">
                                    {formatDate(reservation.endDate) || ""}
                                </div>
                            </>
                        }
                        {selectedSection === "consultant" &&
                            <>
                                <div className="startDate">
                                    {formatDate(reservation.appDate) || ""}
                                </div>
                                <p>(</p>
                                <div className="endDate">
                                    {formatTime(reservation.appDate) || ""}
                                </div>
                                <p>)</p>
                            </>
                        }
                        {selectedSection === "jobConsult" &&
                            <>
                            <div className="startDate">
                                    {formatDate(reservation.startDate) || ""}
                                </div>
                                <p>~</p>
                                <div className="endDate">
                                    {formatDate(reservation.endDate) || ""}
                                </div>
                            </>
                        }
                    </div>
                </div>
                <div className="detailContent">
                    <img className="reservImg" src={img} alt=""/>
                    <div className="reservTime">
                        <div className="startDate">
                            {formatTime(reservation.startDate) || ""}
                        </div>
                        <p>~</p>
                        <div className="endDate">
                            {formatTime(reservation.endDate) || ""}
                        </div>
                    </div>
                    {(reservation.state === "RESERVE") &&
                        <div className="RESERVE">
                            예약완료
                        </div>
                    }
                    {(reservation.state === "CHECK") &&
                        <div className="CHECK">
                            검토 중
                        </div>
                    }
                    {(reservation.state === "APPROVE") &&
                        <div className="APPROVE">
                            승인됨
                        </div>
                    }
                    {(reservation.state === "DENY") &&
                        <div className="DENY">
                            거절됨
                        </div>
                    }
                    {(reservation.state === "CANCEL") &&
                        <div className="CANCEL">
                            예약취소
                        </div>
                    }
                    <button type="button" className="cancelButton"
                            onClick={() => handleCancelClick(reservation.num)}>
                        예약취소
                    </button>
                    <Button text="예약수정" onClick={() => modifyLink(index)}/>
                </div>
            </div>
        </div>
    )
};

export default ReservDetails;
