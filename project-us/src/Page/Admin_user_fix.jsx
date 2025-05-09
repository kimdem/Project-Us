import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { validateName, validateID, validatePassword, validateEmail } from "../js/signup_valid";
import { useNavigate } from "react-router-dom";
import "../css/Lobby.css";
import Admin_menubar from "../components/Admin_menubar";

const Admin_user_fix = () => {
    const { User_num } = useParams();
    const [isNickAvailable, setIsNickAvailable] = useState(null);
    const [isIDAvailable, setIsIDAvailable] = useState(null);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Nick: "",
        User_num: "",
        ID: "",
        Pwd: "",
        Email: "",
    });
    useEffect(() => {
        fetch(`http://localhost:5000/api/admin/get-userfix/${User_num}`)
        .then(res => res.json())
        .then(data => {
            setFormData({
                Nick: data.Nick,
                User_num: data.User_num,
                ID: data.ID,
                Pwd: "",
                Email: data.Email,
            });
        })
        .catch((error) => {
            console.error("Error !!:", error);
        });
    },[]);

    const formchange = async (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});

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
        

    const submit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!validateName(formData.Nick)) {
            newErrors.Nick = "닉네임은 2자 이상 10자 이하로 입력해주세요.";
        }
        if (!validateID(formData.ID)) {
            newErrors.ID = "ID는 영문 또는 숫자 조합으로 4~16자로 입력해주세요.";
        }
        if (formData.Pwd.trim() && !validatePassword(formData.Pwd)) {
            newErrors.Pwd = "비밀번호는 최소 8자, 숫자, 특수문자를 포함해야 합니다. 특수문자 (!@#$%*?&+)";
        }
        if (!validateEmail(formData.Email)) {
            newErrors.Email = "유효한 이메일 주소를 입력해주세요.";
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setErrors({});
            try {
                const response = await fetch(`http://localhost:5000/api/admin/user-fix/${User_num}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify ({
                        Nick: formData.Nick,
                        ID: formData.ID,
                        Pwd: formData.Pwd,
                        Email: formData.Email,
                    })
                });
                const data = await response.json();
                if (data.success === true) {
                    alert("수정완료");
                    navigate("/AdminPage");
                } else {
                    alert("수정 실패: " + data.error);
                }
            } catch (error) {
                console.log("수정 요청 데이터:", formData);
                console.error("수정 오류:", error);
                alert("수정 중 오류가 발생했습니다.");
                }
            };
    }
    const user_remove = async (e) => {
        e.preventDefault();
        if(window.confirm("사용자 정보를 삭제합니다. 삭제시 복구가 불가능합니다.")) {
            try {
                const response = await fetch(`http://localhost:5000/api/admin/user-remove/${User_num}`, {
                    method: "POST"
                });
                const data = await response.json();
                if(data.success === true) {
                    alert("삭제 완료");
                    navigate("/AdminPage");
                }
            } catch (error) {
                alert("예기치 못한 오류가 발생했습니다.");
                console.error("삭제 오류:", error);
            }
        }
    }

    return(
        <div>
            <Admin_menubar/>
            <div className="content-box">
                <h1>사용자 정보 수정</h1><br></br><hr></hr><br></br>
                <form onSubmit={submit}>
                    <div className="fix-group">
                        <b>닉네임 : </b>
                        <input type="text" name="Nick" value={formData.Nick} onChange={formchange} required></input>
                        {errors.Nick && <p className="error">{errors.Nick}</p>}
                        {isNickAvailable === false && <p className="error">이미 사용 중인 닉네임입니다.</p>}
                    </div>
                    <div className="fix-group">
                        <b>식별번호 : </b>
                        <input type="text" name="User_num" value={formData.User_num} readOnly></input>
                    </div>
                    <div className="fix-group">
                        <b>ID : </b>
                        <input type="text" name="ID" value={formData.ID} onChange={formchange} required></input>
                        {errors.ID && <p className="error">{errors.ID}</p>}
                        {isIDAvailable === false && <p className="error">이미 사용 중인 ID입니다.</p>}
                    </div>
                    <div className="fix-group">
                        <b>비밀번호 : </b>
                        <input type="text" name="Pwd" placeholder="유출방지 || 공백시 비밀번호 유지" onChange={formchange}></input>
                        {errors.Pwd && <p className="error">{errors.Pwd}</p>}
                    </div>
                    <div className="fix-group">
                        <b>E-mail : </b>
                        <input type="email" name="Email" value={formData.Email} onChange={formchange}></input>
                        {errors.Email && <p className="error">{errors.Email}</p>}
                    </div>
                    <button type="submit" className="btn">수정하기</button><br></br>
                    <button type="button" onClick={user_remove} className="dangerbtn">삭제하기</button>
                </form>
                
            </div>
        </div>
        
    );
}
export default Admin_user_fix;