import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Page/Home';
import LoginOrRegister from './Page/LoginOrRegister';
import Welcome from './Page/Welcome';
import Lobby from './Page/Lobby';
import CreateChat from './Page/CreateChat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginOrRegister />} />
        <Route path="/Welcome" element={<Welcome />} />
        <Route path="/Lobby" element={<Lobby />} />
        <Route path="/CreateChat" element={<CreateChat />} />
      </Routes>
    </Router>
  );
}

export default App;
