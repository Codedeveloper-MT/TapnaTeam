/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";


const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #333;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px;
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
