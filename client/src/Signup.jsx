import React, { useState } from "react";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";

const containerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f8ff;
  padding: 20px;
`;

const cardStyle = css`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const headingStyle = css`
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  color: #0066cc;
`;

const formStyle = css`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const inputGroupStyle = css`
  display: flex;
  flex-direction: column;
`;

const labelStyle = css`
  font-size: 14px;
  margin-bottom: 5px;
  color: #333;
`;

const inputStyle = css`
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;

  &:focus {
    border-color: #0066cc;
  }
`;

const buttonContainerStyle = css`
  display: flex;
  justify-content: center;
`;

const buttonStyle = css`
  padding: 10px 20px;
  background-color: #0066cc;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #005bb5;
  }
`;

const errorStyle = css`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
`;

const successStyle = css`
  color: green;
  font-size: 14px;
  margin-bottom: 10px;
`;

const successMessageStyle = css`
  color: green;
  font-size: 14px;
  margin-bottom: 10px;
`;

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
    } else {
      setError("");

      try {
        const response = await fetch("http://localhost:5002/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          setSuccessMessage("Sign-up successful! Please log in.");
          setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
        } else {
          setError(result.message);
        }
      } catch (error) {
        setError("Error signing up. Please try again.");
      }
    }
  };

  return (
    <div css={containerStyle}>
      <div css={cardStyle}>
        <h2 css={headingStyle}>Welcome to TapnaTeam</h2>
        <form onSubmit={handleSubmit} css={formStyle}>
          {error && <p css={errorStyle}>{error}</p>}
          {successMessage && <p css={successMessageStyle}>{successMessage}</p>}
          <div css={inputGroupStyle}>
            <label htmlFor="name" css={labelStyle}>
              Username:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your username"
              value={formData.name}
              onChange={handleChange}
              required
              css={inputStyle}
            />
          </div>
          <div css={inputGroupStyle}>
            <label htmlFor="email" css={labelStyle}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              css={inputStyle}
            />
          </div>
          <div css={inputGroupStyle}>
            <label htmlFor="password" css={labelStyle}>
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              css={inputStyle}
            />
          </div>
          <div css={inputGroupStyle}>
            <label htmlFor="confirmPassword" css={labelStyle}>
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              css={inputStyle}
            />
          </div>
          <div css={buttonContainerStyle}>
            <button type="submit" css={buttonStyle}>
              Sign Up
            </button>
          </div>
          <div>
            <p>Already have an account?</p>
          </div>
          <div css={buttonContainerStyle}>
            <button css={buttonStyle}>
              <Link to="/login" css={{ marginLeft: "8px", color: "#6c63ff" }}>
                Log In
              </Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
