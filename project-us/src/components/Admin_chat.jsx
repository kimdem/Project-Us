import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import React from "react";
const Admin_user = () => {
    const [chat, setchat] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/api/admin/get-chat`)
        .then(res => res.json())
        .then(data => {
        setchat(data);
        })
        .catch((error) => {
            console.error("Error !!:", error);
        });
    }, []);

    return (
        <div className="contents-box content-left">
            <h1>채팅 정보</h1><hr></hr><br></br>
            <ul className="user-list">
                {chat.length > 0 ? (
                    chat.map((chat) => (
                        <li key={chat.room_id} className="user-item">
                            <Link to={`/Admin_chat_fix/${chat.room_id}`} className="user-link">
                                <strong>번호:{chat.room_id} - 이름: {chat.room_name}</strong>
                            </Link>
                        </li>
                    ))
                ) : (
                    <p>없음</p>
                )}
            </ul>
        </div>
    );
}

export default Admin_user;