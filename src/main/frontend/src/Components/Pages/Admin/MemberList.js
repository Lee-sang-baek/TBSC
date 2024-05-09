import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MemberList.css";

const MemberList = () => {
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [memberList, setMemberList] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("all");
    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetchMemberList();
    }, [page]);

    const fetchMemberList = () => {
        axios.get(`/member/list?page=${page}&size=${size}&searchTerm=${searchTerm}&category=${category}`)
            .then(response => {
                setMemberList(response.data.content);
                setTotalPages(response.data.totalPages);
                setTotal(response.data.totalElements)
            })
            .catch(error => {
                console.error("회원 목록을 가져오는 중 에러 발생:", error);
            });
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

    const handleSearch = () => {
        fetchMemberList();
        setPage(0);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            fetchMemberList();
            setPage(0);
        }
    };

    return (
        <div className="MemberList-compo">
            <h2>회원 목록</h2>

            <div className="search-bar">
                <select value={category} onChange={handleCategoryChange}>
                    <option value="all">전체</option>
                    <option value="name">이름</option>
                    <option value="email">이메일</option>
                    <option value="address">주소</option>
                    <option value="phoneNum">전화번호</option>
                    <option value="compName">기업명</option>
                    <option value="businessNum">기업번호</option>
                    <option value="representative">대표자명</option>
                    <option value="compAddress">기업주소</option>
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

            <label className="size-label">
                한 페이지에 표시 할 회원 수
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
                        <th>이메일</th>
                        <th>주소</th>
                        <th>전화번호</th>
                        <th>생년월일</th>
                        <th>기업명</th>
                        <th>기업번호</th>
                        <th>대표자명</th>
                        <th>기업주소</th>
                        <th>회원등급</th>
                        <th>회원정보수정</th>
                    </tr>
                </thead>
                <tbody>
                    {memberList.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.address}</td>
                            <td>{item.phoneNum}</td>
                            <td>{item.birth}</td>
                            <td>{item.compName}</td>
                            <td>{item.businessNum}</td>
                            <td>{item.representative}</td>
                            <td>{item.compAddress}</td>
                            <td>
                                {item.state === "ADMIN" && "관리자"}
                                {item.state === "COMP" && "기업회원"}
                                {item.state === "NORMAL" && "일반회원"}
                            </td>
                            <td>
                                <a href="#">수정</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h4>총 {total}명의 회원 조회됨</h4>
        </div>
    );
};

export default MemberList;
