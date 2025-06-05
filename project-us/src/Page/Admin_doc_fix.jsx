import React from "react";
import "../css/Lobby.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Admin_menubar from "../components/Admin_menubar";

const Admin_doc_fix = () => {
    const navigate = useNavigate();
    const { DOC_id } = useParams();
    const [formData, setFormData] = useState({
            DOC_name: "",
            DOC_password: "",
        });
    useEffect(() => {
        fetch(`https://project-us-backend.onrender.com/api/admin/get-docfix/${DOC_id}`)
        .then(res => res.json()) 
        .then(data => {
            setFormData({
                DOC_name: data.DOC_name,
                DOC_password: data.DOC_password,
            });
        })
        .catch((error) => {
            console.error("Error !!:", error);
        });
    },[]);
    const formchange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://project-us-backend.onrender.com/api/admin/doc-fix/${DOC_id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    DOC_name: formData.DOC_name,
                    DOC_password: formData.DOC_password,
                }) 
                });
                const data = await response.json();
                if(data.success) {
                    alert("문서 수정 완료");
                    navigate("/AdminPage");
                } else {
                    alert("문서 수정 오류");
                }
            } catch (error) {
                console.error("문서 수정 오류:", error);
                alert("문서 수정 중 오류가 발생했습니다.");
            }
        };
        const doc_remove = async (e) => {
            e.preventDefault();
            window.confirm("정말 삭제하시겠습니까? 삭제시 복구가 불가능합니다.");
            if(window.confirm) {
                try {
                    const response = await fetch(`https://project-us-backend.onrender.com/api/admin/doc-remove/${DOC_id}`, {
                        method: "POST",
                    })
                    const data = await response.json();
                    if(data.success === true) {
                        alert("문서 삭제 완료");
                        navigate("/AdminPage");
                    } else {
                        alert("문서 삭제 오류");
                    }
                } catch (error) {
                    console.error("문서 삭제 오류:", error);
                    alert("문서 삭제 중 오류가 발생했습니다.");
                }
            } 
        };
    return (
        <div>
            <Admin_menubar/>
            <div className="content-box">
                <h1>문서 수정</h1><br></br><hr></hr><br></br>
                <form onSubmit={submit}>
                    <div className="fix-group">
                        <b>문서 이름 : </b>
                        <input type="text" name="DOC_name" value={formData.DOC_name} onChange={formchange} required/>
                    </div>
                    <div className="fix-group">
                        <b>문서 비밀번호</b>
                        <input type="text" name="DOC_password" value={formData.DOC_password} onChange={formchange} required/>
                    </div>
                    <button type="submit" className="btn">수정</button><br></br>
                    <button type="button" onClick={doc_remove} className="dangerbtn">삭제</button>
                </form>
            </div>
        </div>
    );
}
export default Admin_doc_fix;