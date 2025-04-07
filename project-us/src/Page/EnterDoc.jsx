import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../css/CreateDoc.css";

const EnterDoc = () => {
    const [docid, setdocid] = useState("");
    const [docpassword, setdocpassword] = useState("");
    const navigate = useNavigate();
    const backbtn = () => {
        navigate(-1);
    }

    const enter = async (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem("user"));
        const user_id = user?.Usernum;
        if (!user_id) return alert("로그인이 필요합니다.");

        try {
            const res = await fetch("http://localhost:5000/api/DOC/enter-doc", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ doc_id: docid, doc_password: docpassword, user_id }),
            });

            const data = await res.json();
            if (data.success) {
                alert("문서 방에 참가했습니다.");
                navigate('/Lobby');
            } else {
                alert(data.message || "입장 실패");
            }
        } catch (err) {
            console.error("입장 오류:", err);
        }
    }

    return (
        <div className="create-container">
            <div className="create-box">
                <h2>문서 참가</h2><br></br><hr></hr><br></br>
                <form onSubmit={enter}>
                    <input type="text" name="DOC_id" value={docid} placeholder="문서 번호" onChange={(e) => setdocid(e.target.value)} required/>
                    <input type="password" name="DOC_password" value={docpassword} placeholder="문서 비밀번호" onChange={(e) => setdocpassword(e.target.value)} required/>
                    <button type="submit" className="btn">입장하기</button><br></br>
                    <button type="button" className="backbtn" onClick={backbtn}>취소</button>
                </form>
            </div>
        </div>
    );
}
export default EnterDoc;