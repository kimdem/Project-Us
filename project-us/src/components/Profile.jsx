import React, { useEffect, useState } from "react";

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const [nick, setNick] = useState("");
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const [confirmpassword, setconfirmpassword] = useState("");
    const [modal, setmodal] = useState(false);

    useEffect(() => {
            const loacalData = localStorage.getItem("user");
            if(loacalData) {
                const parsedData = JSON.parse(loacalData);
                setProfileData(parsedData);
                setNick(parsedData.Nick);
                setId(parsedData.ID);
                setEmail(parsedData.Email);
            }
        }, []);

        const profileupdate = async () => {
            const updatedProfile = {
                ...profileData,
                Nick: nick,
                ID: id,
                Email: email,
            };
            try {
                const response = await fetch(`https://project-us-backend.onrender.com/api/users/profile-update/${profileData.Usernum}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedProfile),
                });
                const data = await response.json();
                if(data.success === true) {
                    alert("상태가 업데이트 되었습니다.");
                } else {
                    alert("업데이트 중 예상치 못한 오류가 발생했습니다.");
                }
            } catch (error) {
                console.error("프로필 업데이트 db오류:", error);
            }
        };

        const passwordupdate = async () => {
            if(password !== confirmpassword) {
                alert("비밀번호가 일치하지 않습니다.");
                return;
            }
            try {
                const response = await fetch(`https://project-us-backend.onrender.com/api/users/password-update/${profileData.Usernum}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ password }),
                });
                const data = await response.json();
                if(data.success === true) {
                    alert("비밀번호가 업데이트 되었습니다.");
                    setmodal(false);
                } else {
                    alert("비밀번호 업데이트 중 오류가 발생했습니다.");
                    setmodal(false);
                }
            } catch (error) {
                console.error("비밀번호 업데이트 오류:", error);
            }
        };

    return (
        <div className="content-box">
            <h1>프로필</h1><br></br><hr></hr><br></br>
            {profileData ? (
                <div style={{textAlign: "left"}}>
                    <form onSubmit={(e)=> {e.preventDefault();}}>
                        <p>닉네임</p>
                        <input type="text" name="Nick" value={nick} onChange={(e) => setNick(e.target.value)} required></input><br></br>
                        <p>아이디</p>
                        <input type="text" name="ID" value={id} onChange={(e) => setId(e.target.value)} required></input><br></br>
                        <p>비밀번호</p>
                        <button type="button" className="modal-btn" onClick={() => setmodal(true)}>수정하기</button>
                        <p>이메일</p>
                        <input type="email" name="Email" value={email} onChange={(e) => setEmail(e.target.value)} required></input><br></br>
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
                            <input type="password" name="password" value={password} onChange={(e) => setpassword(e.target.value)} placeholder="새 비밀번호" required />
                            <input type="password" name="confirmpassword" value={confirmpassword} onChange={(e) => setconfirmpassword(e.target.value)} placeholder="비밀번호 확인" required />
                            <button type="button" className="modal-btn" onClick={passwordupdate}>수정하기</button><br></br>
                            <button type="button" className="dangerbtn" onClick={() => setmodal(false)}>취소</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;