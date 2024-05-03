import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MemberList.css";

const MemberList = () => {
  const [memberList, setMemberList] = useState([]);

useEffect(() => {
  const getList = () => {
    axios.post("/member/list")
    .then(response => {
        setMemberList(response.data);
        console.log(response.data);
    });
  };
  getList();
}, []);

  return (
    <div className="MemberList-compo">
      <h2>회원 목록</h2>
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
                <tr>
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
    </div>
  );
};

export default MemberList;