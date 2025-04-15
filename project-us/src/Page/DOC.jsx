import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DOC_edit from "../components/DOC_edit";
import "../css/DOC.css"

const DOC = () => {
    const {DOC_id} = useParams();
    const [docname, setdocname] = useState("문서이름");
    const [member, setmember] = useState([]);
    useEffect(() => {
        const GetDOC = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/DOC/getDOCinfo/${DOC_id}`);
                const data = await res.json();
                setdocname(data.DOCNAME);
                setmember(data.MEMBER);
            } catch (err) {
                console.log("error : ", err);
            }
        };
        GetDOC();
    }, [DOC_id]);

    return (
        <div className="doc-container">
            <header className="doc-header">
                <h2><strong>{docname}</strong></h2>
                <span className="doc-status">저장상태</span>
            </header>
            <div className="doc-body">
                <aside className="doc-sidebar">
                    <h3>참여자</h3>
                    <ul>
                        {Array.isArray(member) ? (
                            member.map((nick, idx) => (
                            <li key={idx}>{nick}</li>
                            ))
                        ) : (
                            <li>참여자 없음</li>
                        )}
                    </ul>
                </aside>
                <DOC_edit docId={DOC_id} />
            </div>
        </div>
    );
};
export default DOC;