import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/task.css";

const Task = () => {
  const [DOCList, setDOCList] = useState([]);


  useEffect(() => {
    const localData = localStorage.getItem("user");
    const user = localData ? JSON.parse(localData) : null;

    if (user) {
      fetch(`http://localhost:5000/api/DOC/get-doc/${user.Usernum}`)
        .then((res) => res.json())
        .then((data) => {
          setDOCList(data);
        })
        .catch((err) => console.error("문서 방 목록 불러오기 오류:", err));
    } else{
      alert("로그인 필수");
    }
  }, []);

  return (
    <div className="content-box">
      <div className="task-header">
        <h1>문서 리스트</h1>
      </div>
      <div className="task-btn-header">
        <Link to="/CreateDoc" className="task-btn">문서 생성</Link>
        <Link to="/EnterDoc" className="task-btn">문서 참가</Link>
      </div><br></br><hr></hr><br></br>
        <ul className="room-list">
                {DOCList.length > 0 ? (
                  DOCList.map((doc) => (
                    <li key={doc.DOC_id} className="room-item">
                      <Link to={`/DOC/${doc.DOC_id}`} className="room-link">
                        <strong>{doc.DOC_name}</strong>
                      </Link>
                    </li>
                  ))
                ) : (
                  <p>작업 중인 문서가 없습니다.</p>
                )}
              </ul>
    </div>
  );
}
export default Task;
