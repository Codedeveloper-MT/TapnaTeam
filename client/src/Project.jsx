/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const Project = () => {
  const repositories = JSON.parse(localStorage.getItem('repositories')) || [];

  return (
    <div css={styles.container}>
      <h1 css={styles.heading}>Explore Your Projects</h1>
      <ul css={styles.repoList}>
        {repositories.length === 0 ? (
          <li>No repositories found. Fetch data from the dashboard and bring your ideas to life!</li>
        ) : (
          repositories.map((repo) => (
            <li key={repo.name} css={styles.repoItem}>
              <h3>{repo.name}</h3>
              <p>Amazing things are happening here!</p>
              <a href={repo.clone_url} download css={styles.repoLink}>
                Download Now
              </a>
            </li>
          ))
        )}
      </ul>
      <p css={styles.emotionMessage}>Every line of code has a story. Keep creating!</p>
      <a href="admin.html" css={styles.backButton}>
        Back to Admin
      </a>
    </div>
  );
};

const styles = {
  container: css`
    margin: 0;
    font-family: 'Arial', sans-serif;
    background-color: #f0f4f8;
    color: #34495e;
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 20px;
  `,
  heading: css`
    text-align: center;
    font-size: 2.5rem;
    color: #2980b9;
    margin-top: 0;
  `,
  repoList: css`
    list-style: none;
    padding: 0;
    max-width: 600px;
    margin: 20px auto;
    overflow-y: auto;
    flex-grow: 1;
    max-height: calc(100vh - 120px);
  `,
  repoItem: css`
    background: #ecf0f1;
    margin: 15px 0;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-size: 1.1rem;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }
  `,
  repoLink: css`
    color: #e74c3c;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s ease;

    &:hover {
      color: #c0392b;
    }
  `,
  backButton: css`
    display: block;
    margin: 20px auto;
    padding: 12px 25px;
    background-color: #2980b9;
    color: white;
    border: none;
    border-radius: 30px;
    text-align: center;
    text-decoration: none;
    width: 180px;
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #3498db;
    }
  `,
  emotionMessage: css`
    text-align: center;
    font-size: 1.3rem;
    color: #8e44ad;
    font-style: italic;
    margin-top: 20px;
  `,
};

export default Project;
