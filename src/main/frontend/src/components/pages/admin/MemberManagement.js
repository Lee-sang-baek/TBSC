import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MemberManagement.css";
import { useNavigate } from "react-router";

const MemberManagement = ({ isLoggedIn, memberState }) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn || memberState !== "ADMIN") {
            navigate("/");
        }
    }, []);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [requestList, setRequestList] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    const [category, setCategory] = useState("ALL");
    const [total, setTotal] = useState(0);
    const [reload, setReload] = useState(false);


    useEffect(() => {
        fetchRequestList();
        setReload(false);
    }, [page, category, reload]);

    const fetchRequestList = () => {
        axios.get(`/api/admin/memberRequest/list?page=${page}&size=${size}&category=${category}`)
            .then(response => {
                setRequestList(response.data.content);
                setTotalPages(response.data.totalPages);
                setTotal(response.data.totalElements);
            })
            .catch(error => {
                console.error("신청 목록을 가져오는 중 에러 발생:", error);
            });
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage);
        }
    };


    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleApprove = (num) => {
        axios.post(`/api/admin/memberRequest/${num}/approve`)
            .then((response) => {
                alert(response.data);
            })
            .catch((err) => {
                alert(err);
            });
        setReload(true);
    }

    const handleDeny = (num) => {
        axios.post(`/api/admin/memberRequest/${num}/deny`)
            .then((response) => {
                alert(response.data);
            })
            .catch((err) => {
                alert(err);
            })
        setReload(true);
    }




    if (!isLoggedIn || memberState !== "ADMIN") {
        return null;
    }

    return (
        <div className="MemberManagement-compo">
            <h2>기업 회원 신청 목록</h2>



            <label className="size-label">
                한 페이지에 표시 할 신청 수
                <input type="number" value={size} onChange={(e) => setSize(e.target.value)} />
            </label>

            <div className="pagination">
                <button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>이전</button>
                <span>페이지: {page + 1} / {totalPages}</span>
                <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages - 1}>다음</button>
            </div>

            <table>
                <thead>
                <tr>
                    <th>아이디</th>
                    <th>이름</th>
                    <th>기업명</th>
                    <th>기업번호</th>
                    <th>대표자명</th>
                    <th>기업주소</th>
                    <th>
                        <select value={category} onChange={handleCategoryChange}>
                            <option value="ALL">전체</option>
                            <option value="WAIT">대기</option>
                            <option value="APPROVE">승인</option>
                            <option value="DENY">거절</option>
                            <option value="REAPPLY">재신청</option>
                        </select>
                    </th>
                    <th>상태변경</th>
                </tr>
                </thead>
                <tbody>
                {requestList.map(item => (
                    <tr key={item.num}>
                        <td>{item.member.id}</td>
                        <td>{item.member.name}</td>
                        <td>{item.compName}</td>
                        <td>{item.businessNum}</td>
                        <td>{item.representative}</td>
                        <td>{item.compAddress}</td>
                        <td>
                            {item.status === "WAIT" && "대기"}
                            {item.status === "APPROVE" && "승인"}
                            {item.status === "DENY" && "거절"}
                            {item.status === "REAPPLY" && "재신청"}
                        </td>
                        <td>
                            {item.status !== "APPROVE" && (
                                <div>
                                    <button type="button" className="approve" onClick={() => handleApprove(item.num)}>승인</button>
                                    <button type="button" className="deny" onClick={() => handleDeny(item.num)}>거절</button>
                                </div>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <h4>총 {total}개의 신청 조회됨</h4>
        </div>
    );
};

export default MemberManagement;
