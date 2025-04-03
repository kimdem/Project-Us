import react from 'react';
import "../css/Welcome.css";
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <>
      <div className="welcome-container">
        <div className="welcome-box">
          <div className="welcome-header">
            <h1>Project Us와 함께해주셔서 감사합니다!</h1>
            <p>회원가입이 완료되었습니다.</p>
          </div>
        </div>
      </div>
      <div className="welcome-button-wrapper">
        <Link to="/login" className="welcome-button">로그인</Link>
      </div>
    </>
  );
}

export default Welcome;