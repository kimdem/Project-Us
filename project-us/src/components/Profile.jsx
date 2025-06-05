import React, { useEffect, useState } from "react";
import axios from "axios";
import { validateName, validateID, validatePassword, validateEmail } from "../js/signup_valid";

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const [formData, setFormData] = useState({
        Nick: "",
        ID: "",
        Email: "",
    });
    const [errors, setErrors] = useState({});
    const [isNickAvailable, setIsNickAvailable] = useState(null);
    const [modal, setmodal] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
            const loacalData = localStorage.getItem("user");
            if(loacalData) {
                const parsedData = JSON.parse(loacalData);
                setProfileData(parsedData);
                setFormData({
                    Nick: parsedData.Nick,
                    ID: parsedData.ID,
                    Email: parsedData.Email,
                });
            }
        }, []);

        const handleChange = async (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
            if (name === "Nick") {
                try {
                    const response = await axios.get(`https://project-us-backend.onrender.com/api/users/check-duplicate?field=${name}&value=${value}`);
                    if (name === "Nick"){
                        setIsNickAvailable(!response.data.exists);
                    } 
                } catch (error) {
                    console.error("중복 검사 오류:", error);
                }
            }
        };

        const profileupdate = async (e) => {
            e.preventDefault();
            const newErrors = {};
            
            if (!validateName(formData.Nick)) {
                newErrors.Nick = "닉네임은 2자 이상 10자 이하로 입력해주세요.";
            }
            if (!validateEmail(formData.Email)) {
                newErrors.email = "유효한 이메일 주소를 입력해주세요.";
            }
            if (isNickAvailable === false) {
                newErrors.Nick = "이미 사용 중인 닉네임입니다.";
            }
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            } else {
                setErrors({});
            }
                try {
                    const response = await fetch(`https://project-us-backend.onrender.com/api/users/profile-update/${profileData.Usernum}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(formData),
                    });
                    const data = await response.json();
                    if(data.success === true) {
                        alert("상태가 업데이트 되었습니다.");
                        localStorage.setItem("user", JSON.stringify({ ...profileData, ...formData }));
                        setProfileData({ ...profileData, ...formData });
                    } else {
                        alert("업데이트 중 예상치 못한 오류가 발생했습니다.");
                    }
                } catch (error) {
                    console.error("프로필 업데이트 db오류:", error);
                }
            };

            const passwordupdate = async () => {
                const newErrors = {};
                if (!validatePassword(password)) {
                    newErrors.password = "비밀번호는 최소 8자, 숫자, 특수문자를 포함해야 합니다. 특수문자 (!@#$%*?&+)";
                }
                if (password !== confirmPassword) {
                    newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
                }
                if (Object.keys(newErrors).length > 0) {
                    setErrors(newErrors);
                    return;
                }

                try {
                    const response = await fetch(`https://project-us-backend.onrender.com/api/users/password-update/${profileData.Usernum}`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ password }),
                        }
                    );
                    const data = await response.json();
                    if (data.success === true) {
                        alert("비밀번호가 업데이트 되었습니다.");
                        setmodal(false);
                        setPassword("");
                        setConfirmPassword("");
                    } else {
                        alert("비밀번호 업데이트 중 오류가 발생했습니다.");
                        setmodal(false);
                    }
                } catch (error) {
                    console.error("비밀번호 업데이트 오류:", error);
                }
            };

            if (!profileData) {
                return <div className="content-box"><p>로그인이 필요합니다.</p></div>;
            }


            return (
                <div className="content-box">
                    <h1>프로필</h1><br></br><hr></hr><br></br>
                    {profileData ? (
                        <div style={{textAlign: "left"}}>
                            <form onSubmit={profileupdate}>
                                <p>닉네임</p>
                                <input type="text" name="Nick" value={formData.Nick} onChange={handleChange} required></input><br></br>
                                {errors.Nick && <p className="error">{errors.Nick}</p>}
                                {isNickAvailable === false && !errors.Nick && (<p className="error">이미 사용 중인 닉네임입니다.</p>)}
                                <p>아이디</p>
                                <input type="text" name="ID" value={formData.ID} readOnly></input><br></br>
                                <p>비밀번호</p>
                                <button type="button" className="modal-btn" onClick={() => setmodal(true)}>변경하기</button>
                                <p>이메일</p>
                                <input type="email" name="Email" value={formData.Email} onChange={handleChange} required></input><br></br>
                                {errors.Email && <p className="error">{errors.Email}</p>}
                                <button type="button" onClick={profileupdate}>수정하기</button>
                            </form>
                        </div>
                    ) : (
                        <p>로그인이 필요합니다.</p>
                    )}
                    {modal && (
                        <div className="modal">
                            <div className="modal-content">
                                <h3>비밀번호 변경</h3><br></br>
                                <form onSubmit={(e) => { e.preventDefault();}}>
                                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="새 비밀번호" required />
                                    {errors.password && <p className="error">{errors.password}</p>}
                                    <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="비밀번호 확인" required />
                                    {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                                    <button type="button" className="modal-btn" onClick={passwordupdate}>수정하기</button><br></br>
                                    <button type="button" className="dangerbtn" onClick={() => {setmodal(false); setPassword(""); setConfirmPassword(""); setErrors({});}}>취소</button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            );
        };

export default Profile;