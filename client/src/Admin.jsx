/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';


const AppWrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #000000;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const SidebarItem = styled.div`
  padding: 15px;
  cursor: pointer;

  &:hover {
    background-color: white;
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  background-color: #3498db;
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Dashboard = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardTitle = styled.div`
  font-size: 18px;
  color: #7f8c8d;
`;

const CardValue = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: #2c3e50;
`;

const Button = styled.button`
  padding: 10px;
  margin: 5px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: black;
  }
`;

const GitHubInput = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  padding: 10px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 300px;
`;

const GitHubResults = styled.div`
  margin-top: 20px;
  text-align: center;

  p, ul {
    color: #2c3e50;
  }
`;

const GanttModal = styled.div`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
`;

const GanttModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 120%;
  max-width: 1200px;
  height: 70%;
`;

const CloseButton = styled.button`
  background-color: ;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

function Admin() {
  const [repositories, setRepositories] = useState([]);
  const [ganttChartVisible, setGanttChartVisible] = useState(false);
  const [resourcesValue, setResourcesValue] = useState('Loading...');

  const fetchGitHubData = async () => {
    const username = document.getElementById('username').value.trim();
    const results = document.getElementById('github-results');

    if (!username) {
      results.innerHTML = `<p>Please enter a GitHub username.</p>`;
      return;
    }

    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos`);
      if (!response.ok) throw new Error('User or repositories not found');
      const data = await response.json();

      setRepositories(data);

      updateValue('projects-value', data.length);

      results.innerHTML = `<p>Repositories fetched successfully. Press "Projects" to view them.</p>`;

      data.forEach((repo) => {
        fetchRepositoryResources(username, repo.name);
      });

      results.innerHTML += `<p>Found ${data.length} repositories:</p>`;
    } catch (error) {
      results.innerHTML = `<p>Error: ${error.message}</p>`;
    }
  };

  const fetchRepositoryResources = async (username, repositoryName) => {
    try {
      const [issuesResponse, pullRequestsResponse] = await Promise.all([
        fetch(`https://api.github.com/repos/${username}/${repositoryName}/issues`),
        fetch(`https://api.github.com/repos/${username}/${repositoryName}/pulls`)
      ]);

      if (!issuesResponse.ok || !pullRequestsResponse.ok) {
        throw new Error('Failed to fetch issues or pull requests');
      }

      const issues = await issuesResponse.json();
      const pullRequests = await pullRequestsResponse.json();

      const resourceCount = issues.length + pullRequests.length;

      if (resourceCount > 0) {
        setResourcesValue(`Resources: ${resourceCount} items`);
      } else {
        setResourcesValue('No resources found');
      }
    } catch (error) {
      setResourcesValue('Error fetching resources');
    }
  };

  const updateValue = (id, value) => {
    document.getElementById(id).innerText = value;
  };

  const openGanttChart = () => {
    setGanttChartVisible(true);
    drawGanttChart();
  };

  const closeGanttChart = () => {
    setGanttChartVisible(false);
  };

  const drawGanttChart = () => {
    const ctx = document.getElementById('gantt-chart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Task 1', 'Task 2', 'Task 3', 'Task 4'],
        datasets: [{
          label: 'Task Progress',
          data: [50, 70, 30, 90],
          backgroundColor: ['#3498db', '#2ecc71', '#f1c40f', '#e74c3c'],
          borderColor: ['#2980b9', '#27ae60', '#f39c12', '#c0392b'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  };

  return (
    <AppWrapper>
      <Sidebar>
      <Link to="/task-management">
        <SidebarItem>Task Management</SidebarItem>
        </Link>
        <SidebarItem>Team Management and File Sharing</SidebarItem>
        <Link to="/Collaborate-tool">
        <SidebarItem>Collaboration Room</SidebarItem>
        </Link>
        <Link to="/profile">
        <SidebarItem>Profile</SidebarItem>
        </Link>
        <SidebarItem>Analytics & Reportin</SidebarItem>
        <Link to="/dashboard">
          <SidebarItem>Dashboard</SidebarItem>
        </Link>
      </Sidebar>

      <MainContent>
        <Header>
          <div>Admin Dashboard</div>
          <div>Welcome to TapnaTeam</div>
        </Header>

        <Dashboard>
          <Card>
            <CardTitle>Projects</CardTitle>
            <CardValue id="projects-value">0</CardValue>
            <Button onClick={() => window.location.href = 'projects.html'}>View Projects</Button>
          </Card>

          <Card>
            <CardTitle>Team Progress</CardTitle>
            <CardValue id="progress-value">0%</CardValue>
            <Button onClick={openGanttChart}>Real-Time Progress Tracking</Button>
          </Card>

          <Card>
            <CardTitle>Resources</CardTitle>
            <CardValue id="resources-value">{resourcesValue}</CardValue>
          </Card>
        </Dashboard>

        <GitHubInput>
          <Input id="username" type="text" placeholder="Enter GitHub Username" />
          <Button onClick={fetchGitHubData}>Fetch GitHub Data</Button>
          <Input id="repository" type="text" placeholder="Enter Repository Name" />
          <Button onClick={() => {}}>Track Progress</Button>
        </GitHubInput>

        <GitHubResults id="github-results" />
      </MainContent>

      <GanttModal show={ganttChartVisible}>
        <GanttModalContent>
          <canvas id="gantt-chart"></canvas>
          <CloseButton onClick={closeGanttChart}>Close</CloseButton>
        </GanttModalContent>
      </GanttModal>
    </AppWrapper>
  );
}

export default Admin;
