import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  padding: 20px;
  background: #3498db;
  font-family: "Arial", sans-serif;
  width: 100%;
  animation: ${fadeIn} 1s ease-out;
`;

const FormWrapper = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 1s ease-out 0.2s;
`;

const Heading = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 15px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-bottom: 10px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  font-size: 0.9rem;
  margin-bottom: 8px;
  color: black;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 100%;
  font-size: 0.9rem;
  box-shadow: inset 0px 1px 3px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
    border: 1px solid #3498db;
    box-shadow: 0px 0px 3px rgba(52, 152, 219, 0.5);
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  margin: 10px 0;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background-color: #2980b9;
  color: white;
  font-size: 0.9rem;
  transition: transform 0.2s ease, background-color 0.3s ease;
  width: 100%;
  text-align: center;

  &:hover {
    background-color: #3498db;
    transform: translateY(-3px);
  }
`;

const SignUpLink = styled.p`
  font-size: 0.9rem;
  margin: 8px 0;
  text-align: center;
  color: #2980b9;
`;

const ForgotPasswordLink = styled.p`
  font-size: 0.9rem;
  margin: 8px 0;
  text-align: center;
  color: #e74c3c;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const GoogleButton = styled.button`
  padding: 8px 12px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #2980b9;
  color: white;
  font-size: 0.9rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #ecf0f1;
    transform: translateY(-3px);
  }
`;

const Separator = styled.hr`
  width: 100%;
  border: 1px solid #ecf0f1;
  margin: 15px 0;
`;

const GoBackButton = styled.button`
  padding: 8px 16px;
  margin-top: 15px;
  border: none;
  border-radius: 6px;
  background-color: #e74c3c;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  width: 100%;
  text-align: center;

  &:hover {
    background-color: #c0392b;
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5002/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setError("");
        navigate("/admin");
      } else {
        setError(data.message);
      }
    } catch {
      setError("Error logging in. Please try again.");
    }
  };

  const goBackHome = () => {
    navigate("/");
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic here
    alert("Redirecting to password reset page...");
    navigate("/reset-password");
  };

  return (
    <Container>
      <FormWrapper>
        <Heading>Login</Heading>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Login</Button>
        </Form>
        <SignUpLink>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </SignUpLink>
        <ForgotPasswordLink onClick={handleForgotPassword}>
          Forgot Password?
        </ForgotPasswordLink>
        <Separator />
        <GoBackButton onClick={goBackHome}>Go Back Home</GoBackButton>
      </FormWrapper>
    </Container>
  );
};

export default Login;
