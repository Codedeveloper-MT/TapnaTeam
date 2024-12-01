/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { Link } from "react-router-dom";

const CLIENT_ID = "Ov23li7VcXpDBhyFVgJM"; // Keep this safe in environment variables

const Login = () => {

  // Correct the function definition
  const loginWithGithub = () => {
    window.location.assign(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`);
  };

  return (
    <div css={styles.container}>
      <h1 css={styles.title}>TapnaTeam</h1>
      <p css={styles.text}>Sign in with your GitHub account or create a new one.</p>
      
      <button css={styles.button} onClick={loginWithGithub}>
        Login with GitHub
      </button>

      <button 
        css={styles.button} 
        onClick={() => window.location.href = 'https://github.com/join'} 
        style={{ marginTop: '10px' }}
      >
        Sign Up for GitHub
      </button>
      <Link to="/" css={styles.link}>Back</Link>
    </div>
  );
};

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: white;
    font-family: 'Arial', sans-serif;
  `,
  title: css`
    font-size: 2rem;
    margin-bottom: 10px;
  `,
  text: css`
    margin-bottom: 20px;
    font-size: 1.2rem;
    color: blue;
  `,
  button: css`
    padding: 10px 20px;
    background-color: blue;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
    width: 200px;

    &:hover {
      background-color: #444;
    }
  `,
  link: css`
    color: #0077b6;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  `,
};

export default Login;
