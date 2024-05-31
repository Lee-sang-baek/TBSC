import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AccessLog.css";
import { exportToExcel } from "../../util/ExportToExcel";

const AccessLog = () => {
    useEffect(() => {
        if (sessionStorage.getItem("state") !== "ADMIN") {
            window.location.href = "/";
        }
    }, [])
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [logList, setLogList] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("all");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [menu, setMenu] = useState("all");
    const [sortOrder, setSortOrder] = useState("asc");
    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetchLogList();
    }, [page, menu, sortOrder]);

    const fetchLogList = () => {
        if (fromDate === "" || toDate === "") {
            axios.get(`/admin/log/list?page=${page}&size=${size}&searchTerm=${searchTerm}&category=${category}&menu=${menu}&sort=${sortOrder}`)
            .then(response => {
                setLogList(response.data.content);
                setTotalPages(response.data.totalPages);
                setTotal(response.data.totalElements);
            })
            .catch(error => {
                console.error("로그 목록을 가져오는 중 에러 발생:", error);
            });
        } else {
            axios.get(`/admin/log/list?page=${page}&size=${size}&searchTerm=${searchTerm}&category=${category}&menu=${menu}&sort=${sortOrder}&fromDate=${fromDate}&toDate=${toDate}`)
            .then(response => {
                setLogList(response.data.content);
                setTotalPages(response.data.totalPages);
                setTotal(response.data.totalElements);
            })
            .catch(error => {
                console.error("로그 목록을 가져오는 중 에러 발생:", error);
            });
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage);
        }
    };

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleFromDateChange = (e) => {
        setFromDate(e.target.value);
    };

    const handleToDateChange = (e) => {
        setToDate(e.target.value);
    };

    const handleMenuChange = (e) => {
        setMenu(e.target.value);
        setPage(0);
    };

    const handleSortToggle = () => {
        setSortOrder(prevOrder => prevOrder === "asc" ? "desc" : "asc");
    };

    const handleSearch = () => {
        fetchLogList();
        setPage(0);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            fetchLogList();
            setPage(0);
        }
    };

    const exportAllToExcel = () => {
        // logListToDownload 배열 초기화
        const allLogListToDownload = [];

        // 모든 페이지의 데이터를 logListToDownload 배열에 추가
        for (let i = 0; i < totalPages; i++) {
            axios.get(`/admin/log/list?page=${i}&size=${size}&searchTerm=${searchTerm}&category=${category}&menu=${menu}&sort=${sortOrder}`)
            .then(response => {
                allLogListToDownload.push(...response.data.content);

                // 마지막 페이지 데이터를 추가한 후에 엑셀로 다운로드
                if (i === totalPages - 1) {
                    exportToExcel(allLogListToDownload, 'access_log');
                }
            })
            .catch(error => {
                console.error("로그 목록을 가져오는 중 에러 발생:", error);
            });
        }
    };

    const formatDate = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const milliseconds = date.getMilliseconds().toString().padStart(3, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
    };

    if (sessionStorage.getItem("state") !== "ADMIN") {
        return null;
    }

    return (
        <div className="AccessLog-compo">
            <h2>접속 로그 목록</h2>
            <div className="search-bar">
                <select value={category} onChange={handleCategoryChange}>
                    <option value="all">전체</option>
                    <option value="id">아이디</option>
                    <option value="ipAddress">IP 주소</option>
                    <option value="path">접속 메뉴</option>
                </select>
                <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                    onKeyPress={handleKeyPress}
                />
                <button onClick={handleSearch}>검색</button>
            </div>

            <div className="search-bottom">
                <label className="size-label">
                    한 페이지에 표시 할 로그 수
                    <input type="number" value={size} onChange={(e) => setSize(e.target.value)} />
                </label>

                <div className="time-filters">
                    <input type="datetime-local" value={fromDate} onChange={handleFromDateChange} /> 부터
                    <input type="datetime-local" value={toDate} onChange={handleToDateChange} /> 까지
                </div>
            </div>

            <div className="page-excel">

                <div className="pagination">
                    <button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>이전</button>
                    <span>페이지: {page + 1} / {totalPages}</span>
                    <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages - 1}>다음</button>
                </div>

                <div className="excel-button">
                    <button onClick={() => exportAllToExcel()}>엑셀 다운로드</button>
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>IP 주소</th>
                        <th>아이디</th>
                        <th>
                            <select value={menu} onChange={handleMenuChange}>
                                <option value="all">접속 메뉴</option>

                                <option value="admin">관리자 메뉴</option>

                                <option value="login">로그인 창</option>
                                <option value="signup">회원가입</option>
                                <option value="myPage">마이페이지</option>

                                <option value="notices">공지사항</option>
                                <option value="centernews">센터소식</option>
                                <option value="pressrelease">보도자료</option>

                                <option value="centerIntro">센터 소개</option>
                                <option value="facility">시설 안내</option>
                                <option value="orgchart">조직도</option>
                                <option value="wayToCome">오시는 길</option>

                                <option value="tnotice">기업 홍보</option>

                                <option value="reservation">이용예약 안내</option>
                                <option value="consultants">기업 컨설팅 신청</option>
                                <option value="jobConsult">일자리 상담신청</option>
                                <option value="rental">회의실 대관신청</option>

                            </select>
                        </th>
                        <th onClick={handleSortToggle} style={{ cursor: "pointer" }}>
                            접속 시간
                            {sortOrder === "asc" ? " ▲" : " ▼"}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {logList.map((item, index) => (
                        <tr key={index}>
                            <td>{item.num}</td>
                            <td>{item.ipAddress}</td>
                            <td>{item.member === null ? "비회원" : item.member.id}</td>
                            <td>{item.path}</td>
                            <td>{formatDate(item.time)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h4>총 {total}개의 접속 로그 조회됨</h4>
        </div>
    );
};

export default AccessLog;
