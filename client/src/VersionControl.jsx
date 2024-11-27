/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

function VersionControl() {
  const navigate = useNavigate();

  const handleTrackChanges = () => {
    navigate('/track-changes');
  };

  const handleManageVersion = () => {
    navigate('/manage-project');  
  };

  const handleHome = () => {
    navigate('/dashboard');
  };

  return (
    <div className="App" css={styles.container}>
      <h1 css={styles.heading}>Version Control</h1>
      <button css={styles.button} onClick={handleTrackChanges}>
        Track Changes
      </button>
      <button css={styles.button} onClick={handleManageVersion}>
        Manage Project Version
      </button>
      <button css={styles.button} onClick={handleHome}>
        DashBoard(Home)
      </button>
    </div>
  );
}

const styles = {
  container: css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    flex-direction: column;
    background-color: white;
  `,
  heading: css`
    color: blue;
  `,
  button: css`
    background-color: blue;
    color: white;
    font-size: 16px;
    padding: 15px 30px;
    margin: 20px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: darkblue;
    }
  `
};

export default VersionControl;
