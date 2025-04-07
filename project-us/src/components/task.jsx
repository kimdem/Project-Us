import React from "react";
import { Link } from "react-router-dom";
import "../css/task.css";

const task = () => {

  return (
    <div className="content-box">
      <div className="task-header">
        <h1>문서 리스트</h1>
      </div>
      <div className="task-btn-header">
        <Link to="/CreateDoc" className="task-btn">문서 생성</Link>
        <Link to="/EnterDoc" className="task-btn">문서 참가</Link>
      </div><br></br><hr></hr><br></br>
        
        <li>문서1</li>
    </div>
  );
}
export default task;
