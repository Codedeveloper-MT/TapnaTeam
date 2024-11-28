import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; 
  width: 170vh;
  padding: 20px;
  background-color: white;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: blue; 
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); 
`;

const Heading = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const InputField = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 100%;
  max-width: 350px;
  margin-bottom: 15px;
  font-size: 1rem;
  box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
    border-color: #6c63ff;
    box-shadow: 0 0 5px rgba(108, 99, 255, 0.5);
  }
`;

const Button = styled.button`
  padding: 12px 20px;
  background-color: blue;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #584dcb; 
    transform: translateY(-2px);
  }
`;

const LinkContainer = styled.div`
  margin-top: 20px;
  font-size: 0.9rem;
  color: #333;
  text-align: center;

  & a {
    color: #6c63ff;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ResetPasswordForm = () => {
  return (
    <Container>
      <Logo>TT</Logo>
      <Heading>Reset Password</Heading>
      <InputField type="email" placeholder="Enter your email address" />
      <Button>Reset Password</Button>
      <LinkContainer>
        <p>Already have an account?</p>
        <Link to="/login">Log In</Link>
      </LinkContainer>
    </Container>
  );
};

export default ResetPasswordForm;
