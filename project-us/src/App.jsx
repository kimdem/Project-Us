import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Page/Home';
import LoginOrRegister from './Page/LoginOrRegister';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginOrRegister />} />
      </Routes>
    </Router>
  );
}

export default App;
