import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/CreateDoc.css";

const CreateDoc = () => {
    const [docname, setdocname] = useState("");
    const [docpassword, setdocpassword] = useState("");
    const [docdes, setdocdes] = useState("");
    const [notwice, setNotwice] = useState(false);
    const navigate = useNavigate();

    const localData = JSON.parse(localStorage.getItem("user"));
    const userNum = localData ? localData.Usernum : null;

    const create = async (e) => {
        e.preventDefault();
        if(notwice) {return;}
        if(!userNum) {alert("로그인 필수"); return;}
        setNotwice(true);
        try {
            const response = await fetch("http://localhost:5000/api/DOC/create-doc", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    doc_name: docname,
                    doc_password: docpassword,
                    doc_des: docdes,
                    doc_admin: userNum,
                }),
            });

            const data = await response.json();
            alert(data.message);

            if (response.ok) {
                navigate("/Lobby");
            }
        } catch (error) {
            console.error("문서 생성 오류:", error);
            alert("문서 생성 중 오류가 발생했습니다.");
        } finally {
            setNotwice(false);
        }
    };

    return (
        <div className="create-container">
            <div className="create-box">
                <h2>문서 생성</h2>
                <hr/><br/>
                <form onSubmit={create}>
                    <input type="text" name=" DOC_name" placeholder="문서 이름" value={docname} onChange={(e) => setdocname(e.target.value)} required/>
                    <input type="password" name="DOC_password" placeholder="문서 비밀번호" value={docpassword} onChange={(e) => setdocpassword(e.target.value)} required/>
                    <input type="text" name="des" placeholder="문서 설명(선택)" value={docdes} onChange={(e) => setdocdes(e.target.value)}/><br/>
                    <button type="submit" className="btn">생성하기</button>
                    <br></br>
                    <Link to="/lobby" className="backbtn">취소</Link>
                </form>
            </div>
        </div>
    );
};
export default CreateDoc;