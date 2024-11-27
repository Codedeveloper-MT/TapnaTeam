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
    <div>
      <header css={headerStyle}>
        <h1>Track Changes</h1>
        <p>Track your GitHub activity, commits, branch changes, and more!</p>
      </header>
      <div css={fixedTopStyle}>
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
      <div css={containerStyle}>
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
  );
};

const headerStyle = css`
  background-color: #007bff;
  color: white;
  padding: 10px;
  text-align: center;
`;

const fixedTopStyle = css`
  position: sticky;
  top: 0;
  background: white;
  z-index: 1000;
  padding: 20px;
  border-bottom: 1px solid #ddd;
`;

const inputStyle = css`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const buttonStyle = css`
  padding: 10px 20px;
  background-color: #007bff;
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
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
  &:hover {
    background-color: #0056b3;
  }
`;

const goBackButtonStyle = css`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
  &:hover {
    background-color: #0056b3;
  }
`;

const containerStyle = css`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  overflow-x: auto;
`;

const activityLogStyle = css`
  margin-top: 20px;
  padding: 10px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 500px;
  overflow-y: auto;
`;

const branchInfoStyle = css`
  margin-top: 15px;
  padding: 10px;
  background-color: #e9ecef;
  border-radius: 5px;
`;

const errorStyle = css`
  margin-top: 20px;
  padding: 10px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 5px;
`;

export default TrackChanges;
