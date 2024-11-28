import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { FaTasks, FaUsers, FaToolbox, FaChartBar, FaSignOutAlt } from 'react-icons/fa';
import Chart from 'chart.js/auto';

const AppWrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: row;
   background-color: #000;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #000;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

const SidebarItem = styled(Link)`
  text-decoration: none;
  color: white;
  padding: 15px;
  margin: 5px 0;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: white;
    color: black;
  }

  svg {
    margin-right: 10px;
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Header = styled.div`
  background-color: blue;
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Dashboard = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
   background-color: black;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  flex-direction: column;
  align-items: center;
  height: 100%;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 200px;

  @media (max-width: 768px) {
    height: 300px;
  }
`;

function Admin() {
  const [repoNames, setRepoNames] = useState([]);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const username = 'octocat';
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!response.ok) throw new Error('Error fetching data from GitHub.');

        const data = await response.json();
        const repoNames = data.map(repo => repo.name);
        const stars = data.map(repo => repo.stargazers_count);

        setRepoNames(repoNames);
        setStars(stars);

        renderGraph(repoNames, stars);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
      }
    };

    fetchGitHubData();
  }, []);

  const renderGraph = (repoNames, stars) => {
    const ctx = document.getElementById('gantt-chart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: repoNames,
        datasets: [
          {
            label: 'Stars per Repository',
            data: stars,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Stars',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Repositories',
            },
          },
        },
      },
    });
  };

  return (
    <AppWrapper>
      <Sidebar>
        <h1>Admin Dashboard</h1>
        <SidebarItem to="/task-management">
          <FaTasks /> Task Management
        </SidebarItem>
        <SidebarItem to="/team-management">
          <FaUsers /> Team Management
        </SidebarItem>
        <SidebarItem to="/graph">
          <FaChartBar /> Analytics & Reporting
        </SidebarItem>
        <SidebarItem to="/collaborate-tool">
          <FaToolbox /> Collaboration Room
        </SidebarItem>
        <SidebarItem to="/profile">
          <FaChartBar /> Profile
        </SidebarItem>
        <SidebarItem to="/">
          <FaSignOutAlt /> Log Out
        </SidebarItem>
      </Sidebar>

      <MainContent>
        <Header>
          <h2>Welcome to Admin Dashboard</h2>
        </Header>
        <Dashboard>
          <Card>
            <h3>GitHub Repositories and Stars</h3>
            <ChartWrapper>
              <canvas id="gantt-chart"></canvas>
            </ChartWrapper>
          </Card>
        </Dashboard>
      </MainContent>
    </AppWrapper>
  );
}

export default Admin;
