/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f8ff;
  font-family: Arial, sans-serif;
  width: 100vw;
`;

const headerStyle = css`
  font-size: 2rem;
  color: blue;
  margin-bottom: 20px;
  text-align: center;
`;

const dateTimeStyle = css`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 40px;
`;

const buttonContainerStyle = css`
  display: flex;
  gap: 20px;
`;

const buttonStyle = css`
  padding: 20px 40px;
  font-size: 1.5rem;
  color: white;
  background-color: blue;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #4682b4;
    transform: scale(1.1);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.3), 0 2px 6px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.98);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.1);
  }
`;

const errorTextStyle = css`
  margin-top: 20px;
  font-size: 1rem;
  color: red;
`;

const HomePage = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleButtonClick = (message) => {
    setError(message);
  };

  const handleVersionControlClick = () => {
    navigate('/version-control');
  };

  const handleAdminDashboardClick = () => {
    navigate('/login');
  };

  return (
    <div css={containerStyle}>
      <h1 css={headerStyle}>Welcome To TapnaTeam</h1>
      <p css={dateTimeStyle}>{dateTime.toLocaleString()}</p>
      <div css={buttonContainerStyle}>
        <button
          css={buttonStyle}
          onClick={handleAdminDashboardClick}
        >
          Admin Dashboard
        </button>
        <button
          css={buttonStyle}
          onClick={handleVersionControlClick}
        >
          Version Control
        </button>
      </div>
      {error && <p css={errorTextStyle}>{error}</p>}
    </div>
  );
};

export default HomePage;
