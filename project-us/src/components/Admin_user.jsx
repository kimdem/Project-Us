import {useState, useEffect} from "react";
import React from "react";
import { Link } from "react-router-dom";
const Admin_user = () => {
    const [user, setuser] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/api/admin/get-user`)
        .then(res => res.json())
        .then(data => {
        setuser(data);
        })
        .catch((error) => {
            console.error("Error !!:", error);
        });
    }, []);

    return (
        <div className="contents-box content-left">

            <h1>사용자 정보</h1><hr></hr><br></br>
            <ul className="user-list">
                {user.length > 0 ? (
                    user.map((user) => (
                        <li key={user.User_num} className="user-item">
                            <Link to={`/Admin_user_fix/${user.User_num}`} className="user-link">
                                <strong>번호:{user.User_num} - 이름: {user.Nick}</strong>
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