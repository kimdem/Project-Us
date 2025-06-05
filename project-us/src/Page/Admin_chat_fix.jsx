import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../components/Admin_menubar";
import "../css/Lobby.css";
import Admin_menubar from "../components/Admin_menubar";

const Admin_chat_fix = () => {
    const { room_id } = useParams();
    const [formData, setFormData] = useState({
        room_name: "",
        room_password: "",
    });
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`https://project-us-backend.onrender.com/api/admin/get-chatfix/${room_id}`)
        .then(res => res.json())
        .then(data=> {
            setFormData({
                room_name: data.room_name,
                room_password: data.room_password,
            })
        })
    },[]);
    const formchange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };
    const chat_remove = async (e) => {
        e.preventDefault();
        window.confirm("정말로 삭제하시겠습니까? 복구는 불가능합니다.");
        if(window.confirm) {
            try {
                const resp = await fetch(`https://project-us-backend.onrender.com/api/admin/chat-remove/${room_id}`, {
                    method: "POST",
                })
                const data = await resp.json(); 
                if(data.success === true) {
                    alert("채팅방 삭제 완료");
                    navigate("/AdminPage");
                } else {
                    alert("채팅방 삭제 오류");
                }
            } catch (error) {
                console.error("Error !!:", error);
            }
        }
    }
    const submit = async (e) => {
        e.preventDefault();
        window.confirm("정말로 수정하시겠습니까?");
        if(window.confirm) {
            try {
                const resp = await fetch(`https://project-us-backend.onrender.com/api/admin/chat-fix/${room_id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        room_name: formData.room_name,
                        room_password: formData.room_password,
                    })
                });
                const data = await resp.json();
                if(data.success === true) {
                    alert("채팅방 수정 완료");
                    navigate("/AdminPage");
                } else {
                    alert("채팅방 수정 오류");
                }
            } catch(error) {
                console.log("Error !!:", error);
                alert("채팅방 수정 오류");
            }
        }
    }
    
    return (
        <div>
            <Admin_menubar/>
            <div className="content-box">
                <h1>채팅방 수정</h1><br></br><hr></hr><br></br>
                <form onSubmit={submit}>
                    <div className="fix-group">
                        <b>채팅방 이름 : </b>
                        <input type="text" name="room_name" value={formData.room_name} onChange={formchange} required/>
                    </div>
                    <div className="fix-group">
                        <b>비밀번호 : </b>
                        <input type="text" name="room_password" value={formData.room_password} onChange={formchange} required/>
                    </div>
                    <button type="submit" className="btn">수정</button><br/>
                    <button type="button" onClick={chat_remove} className="dangerbtn">삭제</button>
                </form>
            </div>
        </div>
        
    );
}
export default Admin_chat_fix;