import React, { useState } from "react";
import "../css/Lobby.css";
import Profile from "../components/Profile";
import Task from "../components/Task";
import Chat from "../components/Chat";
import { useNavigate } from "react-router-dom";

const Lobby = () => {
  const [Whatpage, setWhatpage] = useState("Task");
  const navigate = useNavigate();
  const handleLogout = () => {
    const RULogout = window.confirm("로그아웃 하시겠습니까?");
    if(RULogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    } 
};


  return (
    <div className="main-container">
      <div className="menu-bar">
        <div className="logo">
            <img src={"/favicon.ico"} alt="Logo" onClick={() => setWhatpage("Task")} style={{ cursor: "pointer" }}/>
        </div>
        <div className="nav-items">
          <a href="#" onClick={() => setWhatpage("Profile")}>프로필</a>
          <a href="#" onClick={() => setWhatpage("Chat")}>채팅</a>
          <a href="#" onClick={handleLogout}>로그아웃</a>
        </div>
    </div>
    {Whatpage === "Task" && <Task />}
    {Whatpage === "Profile" && <Profile />}
    {Whatpage === "Chat" && <Chat />}
    </div>
  );
};

export default Lobby;