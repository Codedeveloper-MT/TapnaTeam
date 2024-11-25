/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';

const appStyle = css`
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
  background-color: white;
`;

const sidebarStyle = css`
  width: 250px;
  background-color: #2f2f2f; /* Dark gray */
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const sidebarItemStyle = css`
  padding: 15px;
  cursor: pointer;
  &:hover {
    background-color: #c0392b; /* Red on hover */
  }
`;

const headerStyle = css`
  background-color: #c0392b; /* Red */
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const dashboardStyle = css`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const cardStyle = css`
  background-color: #ecf0f1; /* Light gray */
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const cardTitleStyle = css`
  font-size: 18px;
  color: #7f8c8d; /* Gray */
`;

const cardValueStyle = css`
  font-size: 32px;
  font-weight: bold;
  color: #2c3e50; /* Dark gray */
`;

const buttonStyle = css`
  padding: 10px;
  margin: 5px;
  background-color: #c0392b; /* Red */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #e74c3c; /* Lighter red on hover */
  }
`;

function Admin() {
  const [projects, setProjects] = useState(0);
  const [teamProgress, setTeamProgress] = useState(0);
  const [resources, setResources] = useState(0);

  // Example team members and their roles
  const teamMembers = ['Admin', 'Project Manager', 'Developer', 'Designer'];

  // Adding a task
  const handleCreateTask = (taskName, assignedTo) => {
    const newTask = { taskName, assignedTo, status: 'Not Started' };
    setTasks([...tasks, newTask]);
  };

  // Handle project updates
  const handleUpdateProgress = () => {
    if (teamProgress < 100) {
      setTeamProgress(teamProgress + 5);
    }
  };

  return (
    <div css={appStyle}>
      <div css={sidebarStyle}>
        <div css={sidebarItemStyle}>Dashboard</div>
        <div css={sidebarItemStyle}>Projects</div>
        <div css={sidebarItemStyle}>Teams</div>
        <div css={sidebarItemStyle}>chat</div>
        <div css={sidebarItemStyle}>Resources</div>
        <div css={sidebarItemStyle}>Settings</div>
      </div>

      <div css={{ flex: 1 }}>
        <div css={headerStyle}>
          <div>Admin Dashboard</div>
          <div>Welcome, Admin</div>
        </div>

        <div css={dashboardStyle}>
          {/* Projects Card */}
          <div css={cardStyle}>
            <div css={cardTitleStyle}>Projects</div>
            <div css={cardValueStyle}>{projects}</div>
            <button css={buttonStyle} onClick={() => setProjects(projects + 1)}>
              Add Project
            </button>
            <button css={buttonStyle} onClick={() => setProjects(projects - 1)}>
              Delete Project
            </button>
          </div>

          {/* Team Progress Card */}
          <div css={cardStyle}>
            <div css={cardTitleStyle}>Team Progress</div>
            <div css={cardValueStyle}>{teamProgress}%</div>
            <button css={buttonStyle} onClick={handleUpdateProgress}>
              Update Progress
            </button>
          </div>

          {/* Resources Card */}
          <div css={cardStyle}>
            <div css={cardTitleStyle}>Resources</div>
            <div css={cardValueStyle}>{resources}</div>
            <button css={buttonStyle} onClick={() => setResources(resources + 1)}>
              Add Resource
            </button>
            <button css={buttonStyle} onClick={() => setResources(resources - 1)}>
              Delete Resource
            </button>
          </div>
        </div>

        {/* Task Management Section */}
        <div css={dashboardStyle}>
          <div css={cardStyle}>
            <div css={cardTitleStyle}>Task Management</div>
            <button
              css={buttonStyle}
              onClick={() =>
                handleCreateTask('Design Homepage', 'Developer')
              }
            >
              Create Task
            </button>
            <button
              css={buttonStyle}
              onClick={() => handleSetDependency('Design Homepage', 'Setup Project')}
            >
              Set Dependency
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
