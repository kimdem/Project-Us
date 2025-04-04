import React, { useState } from "react";
import axios from "axios";
import "../css/Signup.css";
import { validateName, validateID, validatePassword, validateEmail } from "../js/signup_valid";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    Nick: "",
    ID: "",
    password: "", 
    confirmpassword: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [isNickAvailable, setIsNickAvailable] = useState(null);
  const [isIDAvailable, setIsIDAvailable] = useState(null);
  const navigate = useNavigate();

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "Nick" || name === "ID") {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/check-duplicate?field=${name}&value=${value}`);
        if (name === "Nick") {
          setIsNickAvailable(!response.data.exists);
        } else if (name === "ID") {
          setIsIDAvailable(!response.data.exists);
        }
      } catch (error) {
        console.error("중복 검사 오류:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // 유효성 검사
    if (!validateName(formData.Nick)) {
      newErrors.Nick = "닉네임은 2자 이상 10자 이하로 입력해주세요.";
    }
    if (!validateID(formData.ID)) {
      newErrors.ID = "ID는 영문, 숫자 조합으로 4~16자로 입력해주세요.";
    }
    if (!validatePassword(formData.password)) {
      newErrors.password = "비밀번호는 최소 8자, 숫자, 특수문자를 포함해야 합니다. 특수문자 (!@#$%*?&+)";
    }
    if (formData.password !== formData.confirmpassword) {
      newErrors.confirmpassword = "비밀번호가 일치하지 않습니다.";
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = "유효한 이메일 주소를 입력해주세요.";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      try {
        const response = await axios.post("http://localhost:5000/api/users/signup", {
          Nick: formData.Nick, 
          ID: formData.ID,      
          email: formData.email,
          password: formData.password,
        });
  
        if (response.data.success) {
         navigate("/Welcome");
        } else {
          alert("회원가입 실패: " + response.data.error);
        }
      } catch (error) {
        console.log("회원가입 요청 데이터:", formData);
        console.error("회원가입 오류:", error);
        alert("회원가입 중 오류가 발생했습니다.");
      }
    };
      
    }

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">회원가입</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>닉네임</label>
            <input type="text" name="Nick" placeholder="닉네임(필수)" value={formData.Nick} onChange={handleChange} required />
            {errors.Nick && <p className="error">{errors.Nick}</p>}
            {isNickAvailable === false && <p className="error">이미 사용 중인 닉네임입니다.</p>}
          </div>
          <div className="input-group">
            <label>ID</label>
            <input type="text" name="ID" placeholder="ID(필수)" value={formData.ID} onChange={handleChange}required />
            {errors.id && <p className="error">{errors.id}</p>}
            {isIDAvailable === false && <p className="error">이미 사용 중인 ID입니다.</p>}
          </div>
          <div className="input-group">
            <label>비밀번호</label>
            <input type="password" name="password" placeholder="비밀번호(필수)" value={formData.password} onChange={handleChange} required />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div className="input-group">
            <label>비밀번호 확인</label>
            <input type="password" name="confirmpassword" placeholder="비밀번호를 다시 입력하세요" value={formData.confirmpassword} onChange={handleChange} required />
            {errors.confirmpassword && <p className="error">{errors.confirmpassword}</p>}
          </div>
          <div className="input-group">
            <label>이메일</label>
            <input type="email" name="email" placeholder="이메일" value={formData.email} onChange={handleChange}/>
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <button type="submit" className="btn" disabled={!isNickAvailable || !isIDAvailable}>가입하기</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;