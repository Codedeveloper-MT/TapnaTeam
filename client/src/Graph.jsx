import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import Chart from 'chart.js/auto';

const AppWrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  background-color: white;
  color: blue;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Dashboard = styled.div`
  padding: 20px;
   background-color: white;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardTitle = styled.div`
  font-size: 13px;
  color: #7f8c8d;
`;

const CardValue = styled.div`
  font-size: 25px;
  font-weight: bold;
  color: #2c3e50;
`;

const Button = styled.button`
  padding: 10px;
  margin: 5px;
  background-color: blue;
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
  width: 90%;
  max-width: 1200px;
  height: 70%;
`;

const CloseButton = styled.button`
  background-color: blue;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: black;
  }
`;

function Graph() {
  const [repositories, setRepositories] = useState([]);
  const [ganttChartVisible, setGanttChartVisible] = useState(false);
  const [progressValue, setProgressValue] = useState('0%');
  const [resourcesValue, setResourcesValue] = useState('No resources');
  const [specificRepo, setSpecificRepo] = useState('');
  const [chart, setChart] = useState(null);

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
      results.innerHTML = `<p>Found ${data.length} repositories:</p>`;
    } catch (error) {
      results.innerHTML = `<p>Error: ${error.message}</p>`;
    }
  };

  const fetchRepoProgressAndResources = async () => {
    if (!specificRepo) {
      alert('Please enter a specific repository');
      return;
    }

    const username = document.getElementById('username').value.trim();

    try {
      const url = `https://api.github.com/repos/${username}/${specificRepo}/commits`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Error fetching data from GitHub.');

      const commits = await response.json();
      const commitCount = commits.length;

      const progress = Math.min(commitCount * 3, 100); // Each commit = 3%, max 100%
      setProgressValue(`${progress}%`);
      setResourcesValue(`Resources: ${commitCount} commits`);

      updateLineChart(commitCount, progress);
    } catch (error) {
      setProgressValue('Error');
      setResourcesValue('Error');
      console.error(error);
    }
  };

  const updateLineChart = (count, progress) => {
    const ctx = document.getElementById('push-chart').getContext('2d');

    if (chart) {
      chart.destroy();
    }

    const data = {
      labels: Array.from({ length: count }, (_, i) => `Commit ${i + 1}`),
      datasets: [
        {
          label: 'Push Progress (%)',
          data: Array.from({ length: count }, (_, i) => Math.min((i + 1) * 3, 100)),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
          tension: 0.4,
        },
      ],
    };

    const newChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          tooltip: { callbacks: { label: (tooltipItem) => `${tooltipItem.raw}%` } },
        },
      },
    });

    setChart(newChart);
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
      type: 'line',
      data: {
        labels: ['0', '5','10','15,','20','25','30','35','40','45','50','55','60','65','70','75','80','85','90','95', 'End'],
        datasets: [
          {
            label: 'Team Progress in a form of GanttChart',
            data: [0, 50, parseInt(progressValue)],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 5)',
            borderWidth: 1,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true, max: 100 } },
      },
    });
  };

  return (
    <AppWrapper>
      <MainContent>
        <Header>
        <h1>Progress Tracking</h1>
        </Header>
        <Link to="/admin">Back</Link>
        <Dashboard>
        <Card>
            <CardTitle>Projects</CardTitle>
            <CardValue>{repositories.length}</CardValue>
            <Button onClick={fetchGitHubData}>Search Repos</Button>
          <h3>Enter a username to see repositories.</h3>
            <CardTitle>GitHub Username</CardTitle>
            <GitHubInput>
              <Input
                type="text"
                id="username"
                placeholder="Enter GitHub username"
              />
              <CardTitle>Repository</CardTitle>
            <Input
              type="text"
              value={specificRepo}
              onChange={(e) => setSpecificRepo(e.target.value)}
              placeholder="Enter repository name"
            />
            <Button onClick={fetchRepoProgressAndResources}>Get Repo Stats</Button>
            </GitHubInput>
            <CardTitle>Team Progress</CardTitle>
            <CardValue>{progressValue}</CardValue>
            <Button onClick={openGanttChart}>Real-Time Progress Tracking</Button>
            <GanttModal show={ganttChartVisible}>
              <GanttModalContent>
                <canvas id="gantt-chart" width="600" height="400"></canvas>
                <CloseButton onClick={closeGanttChart}>Close</CloseButton>
              </GanttModalContent>
            </GanttModal>
          </Card>
          <Card>
            <CardTitle>Resources</CardTitle>
            <CardValue>{resourcesValue}</CardValue>
            <p>Resource Data Graph</p>
            <canvas id="push-chart" width="400" height="200"></canvas>
          </Card>
        </Dashboard>
      </MainContent>
    </AppWrapper>
  );
}

export default Graph;
