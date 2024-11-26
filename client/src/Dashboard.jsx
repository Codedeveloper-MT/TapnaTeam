/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
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

const SearchBar = styled.input`
  padding: 8px;
  border-radius: 5px;
  border: none;
  outline: none;
`;

const ProfileDropdown = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  & ul {
    position: absolute;
    top: 40px;
    right: 0;
    background: #fff;
    color: #333;
    border: 1px solid #ccc;
    border-radius: 5px;
    list-style: none;
    padding: 10px;
    display: ${({ show }) => (show ? "block" : "none")};

    & li {
      padding: 10px;
      cursor: pointer;

      &:hover {
        background: #f0f0f0;
      }
    }
  }
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
  const [content, setContent] = useState("Welcome to your dashboard!");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSidebarClick = (item) => {
    setContent(`You clicked on ${item}`);
  };

  const getGreetingMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning, User!";
    if (hour < 18) return "Good afternoon, User!";
    return "Good evening, User!";
  };

  return (
    <DashboardContainer>
      <Sidebar>
        <h2>Menu</h2>
        <SidebarItem onClick={() => handleSidebarClick("Dashboard")}>
          Dashboard
        </SidebarItem>
        <SidebarItem onClick={() => handleSidebarClick("Profile")}>
          Profile
        </SidebarItem>
        <SidebarItem onClick={() => handleSidebarClick("Settings")}>
          Settings
        </SidebarItem>
        <SidebarItem onClick={() => handleSidebarClick("Logout")}>
          Logout
        </SidebarItem>
      </Sidebar>
      <ContentContainer>
        <Navbar>
          <h3>TapnaTeam Dashboard</h3>
          <div>
            <SearchBar type="text" placeholder="Search..." />
            <ProfileDropdown
              onClick={() => setDropdownOpen(!dropdownOpen)}
              show={dropdownOpen}
            >
              <p>👤 Profile</p>
              <ul>
                <li onClick={() => alert("View Profile")}>View Profile</li>
                <li onClick={() => alert("Settings")}>Settings</li>
                <li onClick={() => alert("Logout")}>Logout</li>
              </ul>
            </ProfileDropdown>
          </div>
        </Navbar>
        <ContentArea>
          <Greeting>{getGreetingMessage()}</Greeting>
          <p>{content}</p>
        </ContentArea>
      </ContentContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
