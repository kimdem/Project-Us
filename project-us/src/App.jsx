import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Page/Home';
import LoginOrRegister from './Page/LoginOrRegister';
import Welcome from './Page/Welcome';
import Lobby from './Page/Lobby';
import CreateChat from './Page/CreateChat';
import Chatroom from './Page/Chatroom';
import EnterChat from './Page/EnterChat';
import Room_info from './Page/Room_info';
import CreateDoc from './Page/CreateDoc';
import EnterDoc from './Page/EnterDoc';
import DOC from './Page/DOC';
import Adminpage from './Page/Adminpage';
import Admin_user_fix from './Page/Admin_user_fix';
import Admin_doc_fix from './Page/Admin_doc_fix';
import Admin_chat_fix from './Page/Admin_chat_fix';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginOrRegister />} />
        <Route path="/Welcome" element={<Welcome />} />
        <Route path="/Lobby" element={<Lobby />} />
        <Route path="/CreateChat" element={<CreateChat />} />
        <Route path="/chatroom/:room_id" element={<Chatroom />} />
        <Route path="/EnterChat" element={<EnterChat />} />
        <Route path="/Room_info/:room_id" element={<Room_info />} />
        <Route path="/CreateDoc" element={<CreateDoc/>} />
        <Route path="/EnterDoc" element={<EnterDoc/>} />
        <Route path="/DOC/:DOC_id" element={<DOC/>} />
        <Route path="/Adminpage" element={<Adminpage />} />
        <Route path="/Admin_user_fix/:User_num" element={<Admin_user_fix />} />
        <Route path="/Admin_doc_fix/:DOC_id" element={<Admin_doc_fix />} />
        <Route path="/Admin_chat_fix/:room_id" element={<Admin_chat_fix />} />
      </Routes>
    </Router>
  );
}

export default App;
