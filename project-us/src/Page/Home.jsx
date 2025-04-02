import React from "react";
import "../css/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>작업를 한 곳에서!</h1>
        <p>Project - Us</p>
      </header>
      <main className="home-main"><br></br><br></br>
        <Link to="/login" className="home-button">로그인</Link>
      </main>
    </div>
  );
};

export default Home;
