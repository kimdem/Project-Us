import React, { useEffect,useState } from "react";
import "../css/Chat.css";
import { Link } from "react-router-dom";

const Chat = () => {
  const [roomList, setRoomList] = useState([]);
  useEffect(() => {
    const localData = localStorage.getItem("user");
    const user = localData ? JSON.parse(localData) : null;
   

    if(user) {
      fetch(`http://localhost:5000/api/chat/get-room/${user.Usernum}`)
        .then(res => res.json())
        .then(data => {
        setRoomList(data);
      })
      .catch(err => console.error("채팅방 목록 불러오기 오류:", err))
    } else {alert("로그인 필수");}
  }, []);
  

  return (
    <div className="content-box">
      <div className="chat-header">
        <h1>채팅방</h1>
        <Link to="/CreateChat" className="create-btn">+ 채팅방 생성</Link>
      </div><hr /><br />
      <ul className="room-list">
        {roomList.length > 0 ? (
          roomList.map((room) => (
            <li key={room.room_id} className="room-item">
              <strong>{room.room_name}</strong>
            </li>
          ))
        ) : (
          <p>참가 중인 채팅방이 없습니다.</p>
        )}
      </ul>
    </div>
  );
};

export default Chat;
