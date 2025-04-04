import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../css/Login.css";

const CreateChat = () => {
    const [roomName, setRoomName] = useState("");
    const [roomPassword, setRoomPassword] = useState("");
    const [notwice, setNotwice] = useState(false);
    const navigate = useNavigate();

    const localData = JSON.parse(localStorage.getItem("user"));
    const userNum = localData ? localData.Usernum : null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(notwice) {return;}
        if(!userNum) {alert("로그인 필수"); return;}
        setNotwice(true);
        try {
            const response = await fetch("http://localhost:5000/api/chat/create-room", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    room_name: roomName,
                    room_admin: userNum,
                    room_password: roomPassword,
                }),
            });

            const data = await response.json();
            alert(data.message);

            if (response.ok) {
                navigate("/lobby", { state: { Whatpage: "Chat" } });
            }
        } catch (error) {
            console.error("채팅방 생성 오류:", error);
            alert("채팅방 생성 중 오류가 발생했습니다.");
        } finally {
            setNotwice(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>채팅방 생성</h2>
                <hr/><br/>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="room_name" placeholder="방 이름" value={roomName} onChange={(e) => setRoomName(e.target.value)} required/>
                    <input type="password" name="room_password" placeholder="방 비밀번호" value={roomPassword} onChange={(e) => setRoomPassword(e.target.value)} required/><br/>
                    <button type="submit" className="btn">생성하기</button>
                    <br></br>
                    <Link to="/lobby" className="backbtn">취소</Link>
                </form>
            </div>
        </div>
    );
};

export default CreateChat;
