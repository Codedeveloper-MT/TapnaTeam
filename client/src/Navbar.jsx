import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useState } from "react";
// import { Link } from "react-router-dom";
import {
  FaBell,
  FaEnvelope,
  FaCog,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";

const NavBar = () => {
  const handleLogout = () => {
    // Handle logout functionality here
    console.log("User logged out.");
  };

  return (
    <nav css={navBarStyle}>
      <div css={logoStyle}>TapnaTeam</div>
      <ul css={menuStyle}>
        <li css={menuItemStyle}>
          <FaHome /> <span>Home</span>
        </li>
        <li css={menuItemStyle}>
          <FaBell /> <span>Notifications</span>
        </li>
        <li css={menuItemStyle}>
          <FaEnvelope /> <span>Messages</span>
        </li>
        <li css={menuItemStyle}>
          <FaCog /> <span>Settings</span>
        </li>
        <li css={menuItemStyle} onClick={handleLogout}>
          <FaSignOutAlt /> <span>Logout</span>
        </li>
      </ul>
    </nav>
  );
};

// Styling
const navBarStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #2c3e50;
  color: #fff;
  position: sticky;
  top: 0;
  z-index: 1000;
  height: 60px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const logoStyle = css`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ecf0f1;
`;

const menuStyle = css`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const menuItemStyle = css`
  margin: 0 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 1rem;
  color: #ecf0f1;
  transition: color 0.3s ease;

  span {
    margin-left: 5px;
  }

  &:hover {
    color: #3498db;
  }
`;

// Exporting the NavBar component
export default NavBar;
