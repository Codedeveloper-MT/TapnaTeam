/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";


const containerStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #6c63ff, #00c6ff);
`;

const cardStyle = css`
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  color: #333;
`;

const headingStyle = css`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #6c63ff;
`;

const formStyle = css`
  display: flex;
  flex-direction: column;
`;

const inputStyle = css`
  margin-bottom: 1rem;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #6c63ff;
    box-shadow: 0 0 0 2px rgba(108, 99, 255, 0.3);
  }
`;

const buttonStyle = css`
  background-color: #6c63ff;
  color: #fff;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #574bcf;
  }
`;

const linkStyle = css`
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #6c63ff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with actual sign-up logic (e.g., API calls)
    console.log("Form Data:", formData);
    alert("Sign-Up Successful! (Placeholder)");
  };

  return (
    <div css={containerStyle}>
      <div css={cardStyle}>
        <h2 css={headingStyle}>Create an Account</h2>
        <form onSubmit={handleSubmit} css={formStyle}>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
            css={inputStyle}
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            css={inputStyle}
          />
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
            css={inputStyle}
          />
          <button type="submit" css={buttonStyle}>
            Sign Up
          </button>
        </form>
        <a href="#" css={linkStyle}>
          Already have an account? Log in
        </a>
      </div>
    </div>
  );
}

export default Signup;