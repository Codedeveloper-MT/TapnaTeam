/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';

// Sample data for tasks and their dependencies
const tasksData = [
  { id: 1, name: 'Task 1', dependencies: [] },
  { id: 2, name: 'Task 2', dependencies: [1] },
  { id: 3, name: 'Task 3', dependencies: [1] },
  { id: 4, name: 'Task 4', dependencies: [2, 3] },
];

function DependenciesPage() {
  const [tasks] = useState(tasksData);

  // Set the browser tab title to "Dependencies" when the component mounts
  useEffect(() => {
    document.title = "Dependencies"; // This will set the title of the page in the browser
  }, []);

  // Helper function to get the names of the dependencies
  const getDependencyNames = (task) => {
    return task.dependencies
      .map((id) => tasks.find((t) => t.id === id)?.name)
      .join(', ') || 'No dependencies';
  };

  return (
    <div css={styles.container}>
      <h1 css={styles.heading}>Dependencies</h1>
      <div css={styles.taskContainer}>
        {tasks.map((task) => (
          <div key={task.id} css={styles.task}>
            <h3>{task.name}</h3>
            <p><strong>Dependencies:</strong> {getDependencyNames(task)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Styles for the page and task components
const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f4f4f9;
    padding: 20px;
    height: 100vh;
    font-family: Arial, sans-serif;
  `,
  heading: css`
    color: #333;
    margin-bottom: 20px;
  `,
  taskContainer: css`
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
  `,
  task: css`
    background-color: #fff;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 200px;
    margin: 10px;
    transition: transform 0.2s ease-in-out;
    &:hover {
      transform: scale(1.05);
    }
  `,
};

export default DependenciesPage;
