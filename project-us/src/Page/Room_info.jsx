import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/Lobby.css";

const Room_info = () => {
    const {room_id} = useParams();
    const [roominfo, setroominfo] = useState(null);
    const [admin, setadmin] = useState(null);
    const navigate = useNavigate();
    
    const Backbtn = () => {
        navigate(-1);
    };

    const Leaveroom = async () => {
        const localData = JSON.parse(localStorage.getItem("user"));
        const user_id = localData?.Usernum;
        const RUSURE = (roominfo.room_admin === user_id)
        ? "현재 방장이십니다. 방장의 경우 탈퇴시 방이 삭제됩니다. 정말 나가시겠습니까?"
        : "정말 방을 나가시겠습니까?";

        if (!window.confirm(RUSURE)) return;

        try {
            

            const leave = await fetch(`http://localhost:5000/api/chat/Leaveroom`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    room_id: room_id,
                    user_id: user_id,
                }),
            });
            const data = await leave.json();
            if (data.success) {
                alert("방을 나갔습니다.");
                navigate("/lobby", { state: { Whatpage: "Chat" } });
            } else {
                alert("오류");
            }
        } catch (error) {  
            console.error("Error leaving room:", error);
            alert("오류");
        }
    }

    useEffect(() => {
        fetch(`http://localhost:5000/api/chat/get-Whatmyroom/${room_id}`)
            .then((res) => res.json())
            .then((data) => {
                setroominfo(data.roominfo);
                setadmin(data.admin);
            });
    }, [room_id, admin]);

    return (
        <>
            <div className="content-box">
                <h1>방 정보</h1><br></br><hr></hr>
                {roominfo && admin ? (
                    <div style={{ textAlign: "left"}}>
                    <p>방 이름 : {roominfo.room_name}</p>
                    <p>방 번호 : {roominfo.room_id}</p>
                    <p>방 비밀번호 : {roominfo.room_password}</p>
                    <p>방장 : {admin}</p>
                    <button onClick={Backbtn} className="btn btn-primary">돌아가기</button>
                    </div>
                ) : (
                    <p>잠시만 기다려주세요...</p>
                )}
            </div>
            <div style={{ position: "fixed", bottom: "20px", left: "50%", transform: "translateX(-50%)" }}>
                <button onClick={Leaveroom} className="dangerbtn">방에서 퇴장하기</button>
            </div>
        </>
    );
}
export default Room_info;