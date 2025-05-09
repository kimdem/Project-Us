import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ ID: "", password: "", Usernum: "", Email: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", formData);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        if(response.data.user.Usernum === 1) {
          navigate("/Adminpage");
        } else {
          navigate("/Lobby");
        }
      }
    } catch (error) {
      if(error.response) {
        if(error.response.status === 401) {
          setError("ID 또는 비밀번호가 틀렸습니다.");
        } else if(error.response.status === 400) {
          setError("유효성 검사 실패");
        } else {
          setError("서버 오류. 새로 고침 후 다시 시도해주세요.");
        }
      } else {
        setError("Unknown error");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>로그인</h2>
        <form onSubmit={handleLogin}>
          <input type="text" name="ID" placeholder="ID" value={formData.ID} onChange={handleChange} required/>
          <input type="password" name="password" placeholder="비밀번호" value={formData.password} onChange={handleChange} required/>
          <button type="submit">로그인</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
