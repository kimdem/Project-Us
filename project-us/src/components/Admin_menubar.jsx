import React from "react";
import { useNavigate } from "react-router-dom";
const Admin_menubar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        const RULogout = window.confirm("로그아웃 하시겠습니까?");
        if(RULogout) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
        }
    }
    const golobby = () => {
        navigate("/AdminPage");
    }
    return (
            <div className="menu-bar">
                <div className="logo">
                    <img src={"/favicon.ico"} alt="Logo" onClick={golobby} style={{ cursor: "pointer" }}/>
                </div>
                <div className="nav-items">
                    <p style={{marginTop: 8}}><b>관리자 모드</b></p>
                    <a href="#" onClick={handleLogout}>로그아웃</a>
                </div>
            </div>
    );
}
export default Admin_menubar;