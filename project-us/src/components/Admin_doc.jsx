import {useState, useEffect} from "react";
import React from "react";
import { Link } from "react-router-dom";
const Admin_doc = () => {
    const [doc, setdoc] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/api/admin/get-doc`)
        .then(res => res.json())
        .then(data => {
        setdoc(data);
        })
        .catch((error) => {
            console.error("Error !!:", error);
        });
    }, []);
    return (
        <div className="contents-box content-center">
            <h1>문서 정보</h1><hr></hr><br></br>
            <ul className="user-list">
                {doc.length > 0 ? (
                    doc.map((doc) => (
                        <li key={doc.DOC_id} className="user-item">
                            <Link to={`/Admin_doc_fix/${doc.DOC_id}`} className="user-link">
                                <strong>문서번호:{doc.DOC_id} - 제목: {doc.DOC_name}</strong>
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

export default Admin_doc;