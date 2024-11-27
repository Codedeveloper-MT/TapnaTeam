import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5002/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/dashboard");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Error logging in. Please try again.");
    }
  };

  return (
    <Container>
      <div>
        <WelcomeText>TapnaTeam</WelcomeText>
        <FormWrapper>
          <Heading>Login</Heading>

          <Form onSubmit={handleSubmit}>
            {error && <ErrorMessage>{error}</ErrorMessage>}{" "}
            <Label>
              E-mail Address:
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Label>
            <Label>
              Password:
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Label>
            <Button type="submit">Login</Button>
          </Form>

          <SignUpLink>
            <Link to="/signup">Don't have an account? Sign Up</Link>
          </SignUpLink>

          <Link to="/reset-password">Forgot Password?</Link>

          <Separator />

          <GoogleButton>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 48 48"
              fill="none"
            >
              <path
                fill="#4285F4"
                d="M23.49 12.3c0-.73-.06-1.43-.17-2.1H12.9v4h5.8c-0.34 1.86-1.35 3.42-2.83 4.26v3.55h4.55C22.97 21.9 24 18.74 24 15.4c0-3.69-2.58-6.77-6.07-7.97A8.41 8.41 0 0 0 23.49 12.3z"
              />
              <path
                fill="#34A853"
                d="M12.9 12.2v-4H8.4v4h4.5c0-.2-.03-.4-.03-.6z"
              />
              <path
                fill="#FBBC05"
                d="M8.4 4.2C8.4 3.8 8.6 3.4 9.1 3C9.6 3.4 9.9 3.8 9.9 4.2h1c-.1-.4-.4-.7-.8-.9-.5-.2-.9-.3-1.3-.4-.5-.1-.9-.1-1.4-.1-.4 0-.9 0-1.4.1-.5.1-.9.3-1.3.4-.4.2-.7.5-.8.9H8.4z"
              />
            </svg>
            Sign Up With Google
          </GoogleButton>
        </FormWrapper>
      </div>
    </Container>
  );
}

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-bottom: 10px;
  text-align: center;
`;

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
  min-height: 100vh;
  padding: 20px;
  background: white;
  font-family: "Arial", sans-serif;
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

const WelcomeText = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 20px;
`;

const Heading = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 15px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  font-size: 0.9rem;
  margin-bottom: 8px;
  color: #2c3e50;
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
  background-color: #3498db;
  color: white;
  font-size: 0.9rem;
  transition: transform 0.2s ease, background-color 0.3s ease;
  width: 100%;
  text-align: center;

  &:hover {
    background-color: #2980b9;
    transform: translateY(-3px);
  }
`;

const SignUpLink = styled.p`
  font-size: 0.9rem;
  margin: 8px 0;
  text-align: center;
  color: #2980b9;
`;

const Separator = styled.hr`
  width: 100%;
  border: 1px solid #ecf0f1;
  margin: 15px 0;
`;

const GoogleButton = styled.button`
  padding: 8px 12px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: transparent;
  color: #2c3e50;
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

  & svg {
    margin-right: 6px;
  }
`;

export default Login;
