import React, { useState } from "react";
import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";

// Navbar component
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <NavContainer>
      <Logo>WebsiteLogo</Logo>
      <HamburgerIcon onClick={toggleMenu}>
        {isMenuOpen ? "X" : "☰"}
      </HamburgerIcon>
      <NavLinks isOpen={isMenuOpen}>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/profile">Profile</NavLink>
        <NavLink href="/tasks">Tasks</NavLink>
        <NavLink href="/dashboard">Tasks</NavLink>
      </NavLinks>
    </NavContainer>
  );
};
// Navbar styling
const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #24292f;
  color: white;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const HamburgerIcon = styled.div`
  font-size: 1.5rem;
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    display: ${(props) => (props.isOpen ? "block" : "none")};
    background-color: #24292f;
    position: absolute;
    top: 60px;
    right: 0;
    left: 0;
    padding: 10px;
  }
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

export default Navbar;

