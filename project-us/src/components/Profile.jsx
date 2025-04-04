import React, { useEffect, useState } from "react";

const Profile = () => {
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
            const loacalData = localStorage.getItem("user");
            if(loacalData) {
                setProfileData(JSON.parse(loacalData));
            }
        }, []);
    return (
        <div className="content-box">
            <h1>프로필</h1><br></br><hr></hr><br></br>
            {profileData ? (
                <div style={{textAlign: "left"}}>
                    <p>닉네임: {profileData.Nick}</p><br></br>
                    <p>아이디: {profileData.ID}</p><br></br>
                    <p>비밀번호: 수정하기버튼 추가하기</p><br></br>
                    <p>이메일: {profileData.Email}</p><br></br>
                </div>
            ) : (
                <p>로그인이 필요합니다.</p>
            )}
        </div>
    );
};

export default Profile;