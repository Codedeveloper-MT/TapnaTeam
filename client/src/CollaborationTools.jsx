/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const App = () => {
  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); 
  const handleSubmit = () => {
    if (username === '' || message === '') {
      setErrorMessage('Please enter both your name and message.');
      return;
    }

    const currentDate = new Date();
    const date = currentDate.toLocaleDateString();
    const time = currentDate.toLocaleTimeString();

    const newComment = {
      username,
      message,
      date,
      time
    };

    setComments([...comments, newComment]);
    setMessage('');
    setIsSubmitted(true); 
    setErrorMessage(''); 
  };

  return (
    <div css={styles.body}>
      <div css={styles.commentSection}>
        
      <Link to="/admin" css={styles.backButton}>← Back</Link>
        <h2>Collaboration Room</h2>

        <div css={styles.commentsContainer}>
          {comments.map((comment, index) => (
            <div
              key={index}
              css={[styles.comment, comment.username === username ? styles.sent : styles.received]}>
              <div css={styles.sender}>{comment.username}</div>
              <div>{comment.message}</div>
              <div css={styles.timestamp}>{comment.date} {comment.time}</div>
            </div>
          ))}
        </div>

        {errorMessage && <div css={styles.errorMessage}>{errorMessage}</div>}
      </div>

      <div css={styles.commentFormContainer}>
        <div css={styles.commentForm}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
            css={styles.input}
            disabled={isSubmitted} 
          />
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message here..."
            css={styles.input}
          />
          <button onClick={handleSubmit} css={styles.button}>Send</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  body: css`
    font-family: Arial, sans-serif;
    background-color: blue;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 80vw;
  `,
  commentSection: css`
    width: 100%;
    max-width: 600px;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    height: 80%;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
  `,
  backButton: css`
    background-color: #ddd;
    color: #333;
    padding: 8px 12px;
    border-radius: 5px;
    text-decoration: none;
    display: inline-block;
    margin: 10px;
    font-size: 14px;

    &:hover {
      background-color: #bbb;
    }
  `,
  commentsContainer: css`
    flex: 1;
    overflow-y: auto;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #f9f9f9;
    width: 100%;
  `,
  comment: css`
    max-width: 75%;
    padding: 10px;
    border-radius: 10px;
    word-wrap: break-word;
    font-size: 14px;
    margin-bottom: 10px;
  `,
  sent: css`
    align-self: flex-end;
    background-color: #007BFF;
    color: white;
    border: 1px solid #0056b3;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-width: 80%;
  `,
  received: css`
    align-self: flex-start;
    background-color: black;
    color: white;
    border: 1px solid #333;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-width: 80%;
  `,
  sender: css`
    font-weight: bold;
    margin-bottom: 5px;
  `,
  timestamp: css`
    font-size: 10px;
    color: #ddd;
    margin-top: 5px;
    text-align: right;
  `,
  errorMessage: css`
    color: red;
    font-size: 12px;
    margin: 5px 0;
  `,
  commentFormContainer: css`
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: white;
    box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1);
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  commentForm: css`
    display: flex;
    gap: 10px;
    width: 90%;
    max-width: 600px;
  `,
  input: css`
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    font-size: 14px;
    flex: 1;
  `,
  button: css`
    padding: 10px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  `
};

export default App;
