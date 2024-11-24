/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link } from "react-router-dom";

const container = css`
  display: flex;
  height: 100vh;
  background-color: white;
  font-family: Arial, sans-serif; 
  flex-wrap: wrap; /* Allow items to wrap for small screens */
`;

const sidebar = css`
  background-color: #323232;
  width: 30%;
  padding: 2rem;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%; /* Full width on smaller screens */
    padding: 1.5rem;
    text-align: center;
  }
`;

const main = css`
  flex: 1;
  padding: 2rem;
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;


const logo = css`
  margin-bottom: 3rem;
  img {
    width: 120px; /* Adjust logo size */
    max-width: 100%; /* Ensure logo scales properly on smaller screens */
  }
`;

const button = css`
  background-color: #4b4b4b; /* Dark gray button */
  color: white;
  padding: 0.7rem 1.5rem;
  border: none;
  margin: 0.5rem 0;
  cursor: pointer;
  width: 80%;
  text-align: center;
  font-size: 1rem;
  border-radius: 5px;
  transition: background-color 0.3s;

  /* Hover effect */
  &:hover {
    background-color: #5c5c5c; /* Light gray on hover */
  }

  @media (max-width: 768px) {
    width: 100%; /* Full width on smaller screens */
  }
`;

const input = css`
  width: 100%;
  padding: 0.8rem;
  margin: 0.5rem 0;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #333; /* Dark background for textboxes */
  color: white; /* White text inside input fields */
  ::placeholder {
    color: #bbb; /* Light gray placeholder text */
  }

  @media (max-width: 768px) {
    font-size: 0.9rem; /* Adjust font size for smaller screens */
  }
`;

const formContainer = css`
  background-color: white; 
  padding: 2rem;
  border-radius: 10px;
  width: 400px; /* Fixed width for form container */
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    width: 90%; /* Use a percentage width on smaller screens */
    padding: 1.5rem;
  }
`;

const form = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const orText = css`
  color: #d1d1d1; /* Light gray text for the "or" section */
  margin: 1rem 0;
`;

function Login() {
  return (
    <div css={container}>
      {/* Sidebar */}
      <div css={sidebar}>
        <h1>TapnaTeam</h1>
        <button css={button}>Forget Password</button>
        <Link to="/signup">
          <button css={button}>Sign Up</button>
        </Link>
        <p css={orText}>or</p>
        <button css={button}>Sign Up With Google</button>
      </div>

      {/* Main Section */}
      <div css={main}>
        <div css={logo}>
          <img src="logo.jpeg" alt="TapnaTeam Logo" />
        </div>
        
        {/* Form Container with a black background */}
        <div css={formContainer}>
          <form css={form}>
            <label>
              E-mail Address:
              <input css={input} type="email" placeholder="Enter your email" />
            </label>
            <label>
              Password:
              <input css={input} type="password" placeholder="Enter your password" />
            </label>
            <button css={button}>Log In</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
