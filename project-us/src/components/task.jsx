import React from "react";
import { Link } from "react-router-dom";

const task = () => {

  const createDOC = () => {
    
  }

  const enterDOC = () => {

  }
  return (
    <div className="content-box">
      <div>
        <h1>문서 리스트</h1>
        <Link to="/CreateDoc" className="btn btn-primary">문서 생성</Link>
        <button className="create-btn" onClick={enterDOC}>문서 입장</button>
      </div><br></br><hr></hr><br></br>
        
        <li>문서1</li>
    </div>
  );
}
export default task;
