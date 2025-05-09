import React, { useState } from "react";
import Admin_user from "../components/Admin_user";
import Admin_doc from "../components/Admin_doc";
import Admin_chat from "../components/Admin_chat";
import Admin_menubar from "../components/Admin_menubar";
import "../css/Adminpage.css";

const Adminpage = () => {
    return (
        <div className="admin-container">
            <Admin_menubar/>
            <Admin_user/>
            <Admin_doc/>
            <Admin_chat/>
        </div>
    )
}
export default Adminpage;