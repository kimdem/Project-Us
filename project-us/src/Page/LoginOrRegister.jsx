import React, { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Sign-up";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container">
      {isLogin ? <Login /> : <Signup />}
      <p style={{textAlign: "center"}}>
        {isLogin ? "계정이 없으신가요?    " : "이미 계정이 있으신가요?    "}
        <a href="#" onClick={(e) => {
            e.preventDefault();
            setIsLogin(!isLogin);
          }}
          className="toggle-link"
        >
          {isLogin ? "회원가입"  : "로그인"}
        </a>
      </p>
    </div>
  );
};

export default AuthPage;
