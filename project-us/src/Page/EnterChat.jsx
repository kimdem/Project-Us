import React from "react";
import "../css/Login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EnterChat = () => {  
    const [roomId, setRoomId] = useState("");
    const [roomPassword, setRoomPassword] = useState("");
    const navigate = useNavigate();
  
    const enterroom = async (e) => {
      e.preventDefault();
      const user = JSON.parse(localStorage.getItem("user"));
      const user_id = user?.Usernum;
  
      if (!user_id) return alert("로그인이 필요합니다.");
  
      try {
        const res = await fetch("https://project-us-backend.onrender.com/api/chat/enter-room", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ room_id: roomId, room_password: roomPassword, user_id }),
        });

        const data = await res.json();
        if (data.success) {
            alert("채팅방에 입장했습니다.");
            navigate(`/Lobby`, { state: { Whatpage: "Chat" } });
        } else {
          alert(data.message || "입장 실패");
        }
      } catch (err) {
        console.error("입장 오류:", err);
      }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>채팅방 입장</h1><br></br><hr></hr><br></br>
                <form onSubmit={enterroom}>
                    <input type="text" name="room_id" value={roomId} placeholder="방 번호" onChange={(e) => setRoomId(e.target.value)} required/>
                    <input type="password" name="room_password" value={roomPassword} placeholder="방 비밀번호" onChange={(e) => setRoomPassword(e.target.value)} required/><br/>
                    <button type="submit" className="btn">입장하기</button>
                    <br></br>
                    <Link to="/lobby" className="backbtn">취소</Link>
                </form>
            </div>
        </div>
    );
};
export default EnterChat;