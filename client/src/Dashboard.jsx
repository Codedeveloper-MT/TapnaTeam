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

const SidebarItem = styled.div`
  margin: 15px 0;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #444;
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
`;

const Navbar = styled.div`
  height: 60px;
  background-color: #6c63ff;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 20px;
`;

const Greeting = styled.h1`
  font-size: 1.5rem;
  color: #333;
`;

const Dashboard = () => {
  return (
    <DashboardContainer>
      <Sidebar>
        <h2>Menu</h2>
        <SidebarItem>Dashboard</SidebarItem>
        <SidebarItem>Profile</SidebarItem>
        <SidebarItem>Settings</SidebarItem>
        <SidebarItem>Logout</SidebarItem>
      </Sidebar>
      <ContentContainer>
        <Navbar>
          <h3>TapnaTeam Dashboard</h3>
          <p>Welcome, User!</p>
        </Navbar>
        <ContentArea>
          <Greeting>Hello, User! Here's your dashboard content.</Greeting>
          <p>
            This is the main area where you can display data, charts, or any
            other dashboard features.
          </p>
        </ContentArea>
      </ContentContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
