import React, { useState } from "react";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";

const containerStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  max-width: 100%;
  background-color: blue;
`;

const cardStyle = css`
  background-color: #ffffff;
  padding: 2rem 2.5rem;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const logoStyle = css`
  text-align: center;
  margin-bottom: 2rem;
`;

const logoImageStyle = css`
  width: 80px;
  height: auto;
`;

const headingStyle = css`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #000;
`;

const formStyle = css`
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Ensure the form takes available space */
`;

const inputGroupStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const labelStyle = css`
  font-size: 1rem;
  font-weight: bold;
  margin-right: 1rem;
  color: #333;
  flex: 1; /* Allow labels to take up equal space */
`;

const inputStyle = css`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  flex: 2; /* Allow inputs to take up more space */
  &:focus {
    outline: none;
    border-color: #6c63ff; /* Accent color */
    box-shadow: 0 0 0 2px rgba(108, 99, 255, 0.3);
  }
`;

const buttonContainerStyle = css`
  display: flex;
  justify-content: flex-start; /* Aligns the button to the bottom-left */
  margin-top: auto; /* Pushes the button to the bottom */
`;

const buttonStyle = css`
  background-color: #333;
  color: #fff;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #555;
  }
`;

const errorStyle = css`
  color: red;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  text-align: center;
`;

function Signup() {
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
        // This part sends data to backend API for sign-up
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
          {successMessage && <p css={successStyle}>{successMessage}</p>}
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
              <Link to="/" css={{ marginLeft: "8px", color: "#6c63ff" }}>
                Log In
              </Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
