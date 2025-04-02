import React from "react";
import "../css/Login.css";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>로그인</h2>
        <form>
          <input type="ID" placeholder="ID" required />
          <input type="password" placeholder="비밀번호" required />
          <button type="submit">로그인</button><br></br>
        </form>
      </div>
    </div>
  );
};

export default Login;
