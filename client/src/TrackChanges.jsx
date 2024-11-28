/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css } from '@emotion/react';
import { jsPDF } from 'jspdf';

const TrackChanges = () => {
  const [username, setUsername] = useState('');
  const [repository, setRepository] = useState('');
  const [activityLog, setActivityLog] = useState('');
  const [branchInfo, setBranchInfo] = useState('');
  const [error, setError] = useState('');

  const fetchGitHubActivity = async () => {
    setActivityLog('Loading...');
    setBranchInfo('');
    setError('');

    const apiUrl = `https://api.github.com/repos/${username}/${repository}/events`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setActivityLog('');
      if (data.length === 0) {
        setActivityLog('No activity found for this repository.');
        return;
      }

      let branchEvents = new Set();
      let activities = [];

      data.forEach(event => {
        let activityDetails = `<h4>${event.type}</h4><p><strong>Repository:</strong> ${event.repo.name}</p><p><strong>Performed by:</strong> ${event.actor.login}</p>`;
        if (event.type === 'PushEvent') {
          activityDetails += `<p><strong>Commits:</strong></p><ul>`;
          event.payload.commits.forEach(commit => {
            activityDetails += `<li><strong>${commit.sha.slice(0, 7)}:</strong> ${commit.message} <strong>Branch:</strong> ${event.payload.ref}</li>`;
            branchEvents.add(event.payload.ref);
          });
          activityDetails += "</ul>";
        } else if (event.type === 'CreateEvent') {
          activityDetails += `<p><strong>Created:</strong> ${event.payload.ref_type} - ${event.payload.ref}</p>`;
          branchEvents.add(event.payload.ref);
        } else if (event.type === 'DeleteEvent') {
          activityDetails += `<p><strong>Deleted:</strong> ${event.payload.ref_type} - ${event.payload.ref}</p>`;
          branchEvents.add(event.payload.ref);
        } else if (event.type === 'PullRequestEvent') {
          activityDetails += `<p><strong>Pull Request:</strong> ${event.payload.action}</p><p><strong>PR Title:</strong> ${event.payload.pull_request.title}</p>`;
        }

        activities.push(<div className="activity" key={event.id} dangerouslySetInnerHTML={{ __html: activityDetails }} />);
      });

      setActivityLog(activities);

      if (branchEvents.size > 0) {
        setBranchInfo(
          <ul>
            {Array.from(branchEvents).map((branch, index) => (
              <li key={index}>{branch}</li>
            ))}
          </ul>
        );
      } else {
        setBranchInfo('No branch-related activity found.');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("GitHub Activity Report", 20, 20);

    doc.setFontSize(12);

    let activityText = activityLog.map((item) => item.props.dangerouslySetInnerHTML.__html.replace(/<\/?[^>]+(>|$)/g, ""));
    let logContent = activityText.join("\n\n");

    const margin = 20;
    const pageHeight = doc.internal.pageSize.height;
    let yPosition = 40;

    doc.text(logContent, margin, yPosition, {
      maxWidth: 180,
      align: 'left',
    });

    if (yPosition + 10 > pageHeight) {
      doc.addPage();
      yPosition = 20;
      doc.text(logContent, margin, yPosition, {
        maxWidth: 180,
        align: 'left',
      });
    }

    doc.save('activity-report.pdf');
  };

  const goBackToVersionControl = () => {
    window.location.href = '/version-control';
  };

  return (
    <div css={pageContainerStyle}>
      <header css={headerStyle}>
        <h1>Track Changes</h1>
        <p>Track your GitHub activity, commits, branch changes, and more!</p>
      </header>

      <div css={contentWrapperStyle}>
        <aside css={sidebarStyle}>
          <h2>Enter GitHub Username and Repository</h2>
          <label htmlFor="username">GitHub Username:</label>
          <input
            type="text"
            id="username"
            placeholder="e.g., octocat"
            value={username}
            onChange={e => setUsername(e.target.value)}
            css={inputStyle}
          />
          <label htmlFor="repository">Repository Name:</label>
          <input
            type="text"
            id="repository"
            placeholder="e.g., Hello-World"
            value={repository}
            onChange={e => setRepository(e.target.value)}
            css={inputStyle}
          />
          <div css={buttonGroupStyle}>
            <button onClick={fetchGitHubActivity} css={buttonStyle}>
              Fetch Activity
            </button>
            <button onClick={downloadPDF} css={downloadButtonStyle}>
              Download PDF
            </button>
            <button onClick={goBackToVersionControl} css={goBackButtonStyle}>
              Go back to VersionControl
            </button>
          </div>
        </aside>

        <div css={mainContentStyle}>
          <h3>Activity Log</h3>
          <div id="activityLog" css={activityLogStyle}>
            {activityLog}
          </div>
          <div id="branchInfo" css={branchInfoStyle}>
            {branchInfo}
          </div>
          {error && <div css={errorStyle}>{error}</div>}
        </div>
      </div>
    </div>
  );
};

const pageContainerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const headerStyle = css`
  background-color: #007bff;
  color: white;
  padding: 20px;
  text-align: center;
  width: 100%;
  margin-bottom: 20px;
`;

const contentWrapperStyle = css`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1200px;
  padding: 10px;
  justify-content: space-between;
`;

const sidebarStyle = css`
  width: 100%;
  max-width: 480px;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  border-radius: 8px;
  flex: 1;
  
  @media (min-width: 768px) {
    width: 48%;
  }
`;

const mainContentStyle = css`
  flex: 1;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-left: 20px;
  border-radius: 8px;
  min-width: 320px;
  
  @media (min-width: 768px) {
    width: 48%;
  }
`;

const inputStyle = css`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const buttonGroupStyle = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
`;

const buttonStyle = css`
  padding: 10px 20px;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const downloadButtonStyle = css`
  padding: 10px 20px;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #218838;
  }
`;

const goBackButtonStyle = css`
  padding: 10px 20px;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #c82333;
  }
`;

const activityLogStyle = css`
  margin-top: 20px;
  max-height: 400px;
  overflow-y: auto;
`;

const branchInfoStyle = css`
  margin-top: 20px;
`;

const errorStyle = css`
  color: red;
  font-size: 14px;
  margin-top: 20px;
`;

export default TrackChanges;
