/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

const ManageProject = () => {
  const [commits, setCommits] = useState([]);
  const [selectedCommit, setSelectedCommit] = useState(null);
  const [username, setUsername] = useState('');
  const [repository, setRepository] = useState('');
  const [versionDetails, setVersionDetails] = useState('Select a version to see the details');
  const [errorMessage, setErrorMessage] = useState(''); 

  const navigate = useNavigate();

  const containerStyle = css`
    font-family: Arial, sans-serif;
    background-color: white;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    min-height: 100vh;
    color: #333;
    padding: 20px;
    box-sizing: border-box;
    gap: 20px;
  `;

  const leftBoxStyle = css`
    background-color: #fff;
    padding: 20px;
    flex: 1 1 320px;  /* Flexible basis and minimum width */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    overflow: hidden;
    max-width: 100%;
  `;

  const headingStyle = css`
    font-size: 2em;
    margin-bottom: 20px;
    color: #007BFF;
    text-align: left;
  `;

  const inputStyle = css`
    padding: 10px;
    margin: 10px 5px;
    border: 1px solid #007BFF;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
  `;

  const buttonStyle = css`
    background-color: blue;
    color: white;
    border: none;
    padding: 12px 20px;
    font-size: 1.1em;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 20px;
    transition: background-color 0.3s;
    width: 100%;
    box-sizing: border-box;
  `;

  const buttonHoverStyle = css`
    background-color: #0056b3;
  `;

  const disabledButtonStyle = css`
    background-color: #ddd;
    cursor: not-allowed;
  `;

  const versionListStyle = css`
    width: 100%;
    max-height: 300px;
    overflow-y: auto;
    margin-top: 20px;
    box-sizing: border-box;
  `;

  const listItemStyle = css`
    background-color: #f0f0f0;
    margin: 5px 0;
    padding: 12px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s;
  `;

  const selectedItemStyle = css`
    background-color: #007BFF;
    color: white;
  `;

  const versionDetailsStyle = css`
    margin-top: 20px;
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 4px;
    text-align: center;
  `;

  const errorStyle = css`
    color: red;
    font-size: 1.1em;
    margin-top: 10px;
  `;

  const rightBoxStyle = css`
    background-color: #fff;
    padding: 20px;
    flex: 1 1 580px;  /* Flexible basis and minimum width */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    overflow: hidden;
    max-width: 100%;
  `;

  const handleFetchCommitHistory = () => {
    if (!username || !repository) {
      setErrorMessage('Please enter both username and repository.');
      return;
    }

    const url = `https://api.github.com/repos/${username}/${repository}/commits`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setErrorMessage(data.message);
        } else {
          setCommits(data);
          setErrorMessage(''); 
        }
      })
      .catch((error) => setErrorMessage('Error fetching commit history: ' + error));
  };

  const handleVersionClick = (index) => {
    const commit = commits[index];
    setVersionDetails(commit.commit.message);
    setSelectedCommit(commit);

    const items = document.querySelectorAll('.version-list li');
    items.forEach((item) => item.classList.remove('selected'));

    const selectedItem = items[index];
    selectedItem.classList.add('selected');
  };

  const handleRollback = () => {
    if (selectedCommit) {
      setVersionDetails('Rolling back to selected version...');
      setTimeout(() => {
        setVersionDetails(`Successfully rolled back to version: ${selectedCommit.sha.substring(0, 7)}`);
        setSelectedCommit(null);
      }, 2000);
    }
  };

  const handleGoBack = () => {
    navigate('/version-control');
  };

  return (
    <div css={containerStyle}>
      <div css={leftBoxStyle}>
        <h1 css={headingStyle}>Project Version Rollback</h1>
        <div>
          <input
            type="text"
            placeholder="GitHub Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            css={inputStyle}
          />
          <input
            type="text"
            placeholder="Repository Name"
            value={repository}
            onChange={(e) => setRepository(e.target.value)}
            css={inputStyle}
          />
          <button
            onClick={handleFetchCommitHistory}
            css={[buttonStyle, buttonHoverStyle]}
          >
            Fetch Version History
          </button>
        </div>

        {errorMessage && <p css={errorStyle}>{errorMessage}</p>}
      </div>

      <div css={rightBoxStyle}>
        <div css={versionListStyle}>
          <h2>Version History:</h2>
          <ul className="version-list">
            {commits.map((commit, index) => (
              <li
                key={commit.sha}
                onClick={() => handleVersionClick(index)}
                css={[listItemStyle, selectedCommit && index === commits.indexOf(selectedCommit) && selectedItemStyle]}
              >
                {`${commit.sha.substring(0, 7)}: ${commit.commit.message}`}
              </li>
            ))}
          </ul>
        </div>

        <div css={versionDetailsStyle}>
          <h2>Version Details:</h2>
          <p>{versionDetails}</p>
        </div>

        <div css={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={handleRollback}
            disabled={!selectedCommit}
            css={[buttonStyle, selectedCommit ? buttonHoverStyle : disabledButtonStyle]}
          >
            Rollback to Selected Version
          </button>
          <button
            onClick={handleGoBack}
            css={[buttonStyle, buttonHoverStyle, { marginTop: '10px' }]}
          >
            Go Back to VersionControl
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageProject;
