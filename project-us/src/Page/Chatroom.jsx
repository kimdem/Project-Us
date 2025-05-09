import React, { useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import "../css/Chatroom.css";

const socket = io("https://project-us-backend.onrender.com");

const ChatRoom = () => {
const { room_id } = useParams();
const [roomInfo, setRoomInfo] = useState(null);
const [messages, setMessages] = useState([]);
const [input, setInput] = useState("");
const messageEndRef = useRef(null);
const navigate = useNavigate();

const backbtn = () => {
    navigate(-1);
}
const localData = JSON.parse(localStorage.getItem("user"));
const user_id = localData?.Usernum;

useEffect(() => {
    fetch(`https://project-us-backend.onrender.com/api/chat/get-room-info/${room_id}`)
    .then((res) => res.json())
    .then((data) => {
        setRoomInfo(data.roomInfo);
        setMessages(data.message);
    });

    socket.emit("joinRoom", room_id);
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    socket.on("userLeft", (message) => {
      setMessages((prev) => [...prev, message]);
    });
    socket.on("userenter", (message) => {
      setMessages((prev) => [...prev, message]);
    });
    return () => {
      socket.off("userLeft");
      socket.off("userenter");
      socket.off("receiveMessage");
    };
  }, [room_id, user_id]);

const sendMessage = () => {
    if (input.trim() !== "") {
      socket.emit("sendMessage", {
        room_id,
        user_id,
        message: input
      });
      setInput("");
    }
  };

useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

return (
    <div className="chat-container">
        <div className="chat-header">
            <h2>{roomInfo?.room_name || "채팅방"}</h2>
            <Link to={`/Room_info/${room_id}`} className="chat-link">설정</Link>
            <button className="backlobbybtn" onClick={backbtn}>&lt;&lt;</button>
        </div>
      <div className="message-box">
        {messages.map((msg, index) => {
          const samemessage = index > 0 && messages[index - 1].user_id === msg.user_id;

          return (
          <>
          {msg.user_id !== user_id && !samemessage && <div className="nickname">{msg.nickname}</div>}
          <div key={index} className={msg.user_id === user_id ? "my-message" : "other-message"}>
            <div>{msg.message}</div>
          </div>
          </>
          );
        })}
        <div ref={messageEndRef} />
      </div>
      <div className="input-box">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()}/>
        <button onClick={sendMessage}>전송</button>
      </div>
    </div>
  );
};

export default ChatRoom;
