/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';

// Styled components with new color scheme (grey, white, and red)
const Container = styled.div`
  font-family: Arial, sans-serif;
  margin: 20px;
  display: flex;
  justify-content: space-between;
  background-color: #fff; /* White background for the container */
  color: #333; /* Dark text color for readability */
`;

const LeftColumn = styled.div`
  width: 45%;
`;

const RightColumn = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: 80vh;
  overflow-y: auto;
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TaskCard = styled.div`
  background-color: #f0f0f0; /* Light grey background for task cards */
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.2em;
`;

const TaskDetails = styled.div`
  margin-top: 10px;
`;

const Deadline = styled.span`
  color: #888;
  font-size: 0.9em;
`;

const TaskInput = styled.input`
  margin: 5px 0;
  padding: 8px;
  font-size: 1em;
  width: 100%;
  box-sizing: border-box;
  background-color: #f0f0f0; /* Light grey background for input */
  border: 1px solid #ccc;
  color: #333;
`;

const SelectInput = styled.select`
  margin: 5px 0;
  padding: 8px;
  font-size: 1em;
  width: 100%;
  box-sizing: border-box;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  color: #333;
`;

const AddTaskButton = styled.button`
  background-color: #28a745; /* Green for the button */
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 1em;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #218838; /* Darker green on hover */
  }
`;

const PriorityIndicator = styled.span`
  padding: 3px 8px;
  border-radius: 5px;
  background-color: ${({ priority }) =>
    priority === 'High' ? '#dc3545' : priority === 'Medium' ? '#ffc107' : '#28a745'}; /* Red for High priority, Yellow for Medium, Green for Low */
  color: white;
`;

const StatusIndicator = styled.span`
  padding: 3px 8px;
  border-radius: 5px;
  background-color: ${({ status }) =>
    status === 'Completed' ? '#28a745' : status === 'In Progress' ? '#ffc107' : '#dc3545'}; /* Green for Completed, Yellow for In Progress, Red for Pending */
  color: white;
`;

const Notification = styled.div`
  background-color: #f8d7da; /* Light red for notifications */
  color: #721c24; /* Darker red for text */
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
  font-weight: bold;
  max-height: 150px;
  overflow-y: auto;
`;

function TaskManagement() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDeadline, setTaskDeadline] = useState('');
  const [taskDependency, setTaskDependency] = useState('');
  const [taskPriority, setTaskPriority] = useState('Low');
  const [taskStatus, setTaskStatus] = useState('Pending');

  const addTask = () => {
    // Check if any field is empty
    if (!taskTitle || !taskDeadline || !taskDependency) {
      alert('Please fill in all fields before adding a task.');
      return;
    }

    const newTask = {
      title: taskTitle,
      deadline: taskDeadline,
      dependency: taskDependency,
      priority: taskPriority,
      status: taskStatus,
    };

    setTasks([...tasks, newTask]);

    // Clear the input fields
    setTaskTitle('');
    setTaskDeadline('');
    setTaskDependency('');
    setTaskPriority('Low');
    setTaskStatus('Pending');
  };

  useEffect(() => {
    // Automatic reminders for upcoming deadlines
    const interval = setInterval(() => {
      const currentDate = new Date().toISOString().split('T')[0]; // Get today's date (YYYY-MM-DD)
      tasks.forEach((task) => {
        if (task.deadline === currentDate && task.status !== 'Completed') {
          alert(`Reminder: Task "${task.title}" is due today.`);
        }
      });
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [tasks]);

  return (
    <Container>
      {/* Left Column for Task Input */}
      <LeftColumn>
        <h1 css={{ textAlign: 'center', color: '#333' }}>Advanced Task Management</h1>
        <div>
          <h2>Add New Task</h2>
          <TaskInput
            type="text"
            placeholder="Task Title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <TaskInput
            type="date"
            value={taskDeadline}
            onChange={(e) => setTaskDeadline(e.target.value)}
          />
          <TaskInput
            type="text"
            placeholder="Dependency (if any)"
            value={taskDependency}
            onChange={(e) => setTaskDependency(e.target.value)}
          />
          <SelectInput
            value={taskPriority}
            onChange={(e) => setTaskPriority(e.target.value)}
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </SelectInput>
          <SelectInput
            value={taskStatus}
            onChange={(e) => setTaskStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </SelectInput>
          <AddTaskButton onClick={addTask}>Add Task</AddTaskButton>
        </div>
      </LeftColumn>

      {/* Right Column for Deadline Notifications and Task List */}
      <RightColumn>
        <h2>Deadline Notifications</h2>
        {tasks.map((task, index) => {
          // Check if task is due today and show notification
          const currentDate = new Date().toISOString().split('T')[0];
          if (task.deadline === currentDate && task.status !== 'Completed') {
            return (
              <Notification key={index}>
                Reminder: Task "{task.title}" is due today!
              </Notification>
            );
          }
          return null;
        })}

        <h2>Task List</h2>
        <TaskList>
          {tasks.map((task, index) => (
            <TaskCard key={index}>
              <Title>{task.title}</Title>
              <TaskDetails>
                <div>
                  <strong>Deadline: </strong>
                  <Deadline>{task.deadline}</Deadline>
                </div>
                {task.dependency && (
                  <div>
                    <strong>Depends on: </strong>{task.dependency}
                  </div>
                )}
                <div>
                  <strong>Priority: </strong>
                  <PriorityIndicator priority={task.priority}>{task.priority}</PriorityIndicator>
                </div>
                <div>
                  <strong>Status: </strong>
                  <StatusIndicator status={task.status}>{task.status}</StatusIndicator>
                </div>
              </TaskDetails>
            </TaskCard>
          ))}
        </TaskList>
      </RightColumn>
    </Container>
  );
}

export default TaskManagement;
