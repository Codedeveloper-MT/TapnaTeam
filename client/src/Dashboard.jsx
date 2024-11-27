/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const updateDateTime = () => {
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();
  return `Date: ${date} | Time: ${time}`;
};

const Dashboard = () => {
  const [dateTime, setDateTime] = useState(updateDateTime());
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(updateDateTime());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const loginUser = async (email, password) => {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (data.token) {
      setUsername(data.username);
      localStorage.setItem('authToken', data.token);
      setError('');
    } else {
      setError('Login failed: Invalid credentials');
    }
  };

  useEffect(() => {
    loginUser('user@example.com', 'password123');
  }, []);

  const bodyStyle = css`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #007bff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100vh;
    padding: 20px;
    color: #fff;
    overflow: hidden;
  `;

  const headerStyle = css`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    color: #fff;
  `;

  const titleStyle = css`
    font-size: 36px;
    font-weight: bold;
    color: #fff;
  `;

  const infoStyle = css`
    font-size: 18px;
    color: #fff;
  `;

  const errorStyle = css`
    font-size: 16px;
    color: #e74c3c;
    margin-top: 10px;
  `;

  const buttonContainerStyle = css`
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 30px;
  `;

  const buttonStyle = css`
    position: relative;
    width: 250px;
    height: 250px;
    cursor: pointer;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    color: #000;
    font-size: 20px;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    overflow: hidden;
    padding: 20px;

    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #ff7e5f, #feb47b);
      opacity: 0.3;
      z-index: 0;
      transition: opacity 0.3s ease;
    }

    &:hover::before {
      opacity: 0.6;
    }
  `;

  const buttonTextStyle = css`
    z-index: 1;
    text-align: center;
  `;

  const dateTimeStyle = css`
    font-size: 18px;
    color: #fff;
    margin-top: 20px;
  `;

  const handleVersionControlClick = () => {
    navigate('/version-control');
  };

  const handleAdminDashboardClick = () => {
    navigate('/admin'); 
  };

  return (
    <div css={bodyStyle}>
      <div css={headerStyle}>
        <div css={titleStyle}>Welcome to TapnaTeam</div>
        <div css={infoStyle}>Username: {username || 'Loading...'}</div>
      </div>

      {error && <div css={errorStyle}>{error}</div>}

      <div css={buttonContainerStyle}>
        <div
          className="button"
          css={buttonStyle}
          id="admin-dashboard"
          onClick={handleAdminDashboardClick} 
        >
          <span className="button-text" css={buttonTextStyle}>Admin Dashboard</span>
        </div>

        <div
          className="button"
          css={buttonStyle}
          id="version-control"
          onClick={handleVersionControlClick}
        >
          <span className="button-text" css={buttonTextStyle}>Version Control</span>
        </div>
      </div>

      <div id="date-time" css={dateTimeStyle}>
        {dateTime}
      </div>
    </div>
  );
};

export default Dashboard;
