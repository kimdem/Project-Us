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
      </Routes>
    </Router>
  );
}

export default App;
