import React from "react";
import DOC_edit from "../components/DOC_edit";
import "../css/DOC.css"

const DOC = () => {
    return (
        <div className="doc-container">
            <header className="doc-header">
                <h2>문서 제목</h2>
                <span className="doc-status">저장됨</span>
            </header>

            <div className="doc-body">
                <aside className="doc-sidebar">
                    <h3>참여자</h3>
                    <ul>
                        <li>hard-coding</li>
                        <li>NEED TO EDIT</li>
                    </ul>
                </aside>
                <DOC_edit/>
            </div>
        </div>
    );
};
export default DOC;