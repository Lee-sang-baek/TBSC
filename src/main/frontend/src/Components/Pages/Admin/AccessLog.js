import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AccessLog.css";

const AccessLog = () => {
    const [logList, setLogList] = useState([]);

    useEffect(() => {
        axios.post("/log/list")
        .then(response => {
            setLogList(response.data);
            console.log(response.data);
        });
    }, []);

  return (
    <div className="AccessLog-compo">
      <h2>접록 로그 목록</h2>
      <table>
      	<thead>
      		<tr>
      			<th>번호</th>
      			<th>Ip주소</th>
      			<th>아이디</th>
      			<th>접속메뉴</th>
      			<th>접속시간</th>
      		</tr>
      	</thead>
      	<tbody>
      		{logList.map(item => (
                <tr>
                    <td>{item.num}</td>
                    <td>{item.ipAddress}</td>
                    <td>{item.member === null ? "비회원" : item.member.id }</td>
                    <td>{item.path}</td>
                    <td>{item.time}</td>
                </tr>
            ))}
      	</tbody>
      </table>
    </div>
  );
};

export default AccessLog;