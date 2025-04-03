import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Page/Home';
import LoginOrRegister from './Page/LoginOrRegister';
import Welcome from './Page/Welcome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginOrRegister />} />
        <Route path="/Welcome" element={<Welcome />} />
      </Routes>
    </Router>
  );
}

export default App;
