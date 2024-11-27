/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';

const TaskManagement = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [content, setContent] = useState('welcome');
    const [errorMessage, setErrorMessage] = useState('');

    const handleCreateTask = (task) => {
        setTasks([...tasks, task]);
    };

    const renderCreateTaskForm = () => {
        return (
            <div css={createTaskFormContainerStyle}>
                <h3>Create New Task</h3>
                {errorMessage && <p css={errorTextStyle}>{errorMessage}</p>}
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        const taskTitle = event.target.taskTitle.value;
                        const taskDescription = event.target.taskDescription.value;

                        if (!taskTitle || !taskDescription) {
                            setErrorMessage('Please fill in all fields.');
                            return;
                        }

                        const newTask = {
                            id: Date.now(),
                            title: taskTitle,
                            description: taskDescription,
                            deadline: new Date(event.target.taskDeadline.value),
                            priority: event.target.taskPriority.value,
                            dependencies: event.target.taskDependencies.value.split(',').map(dep => dep.trim()).filter(dep => dep),
                            responsible: event.target.taskResponsible.value,
                            responsibleEmail: event.target.taskResponsibleEmail.value,
                            status: 'To Do'
                        };
                        handleCreateTask(newTask);
                        setContent('taskList');
                    }}
                    css={formStyle}
                >
                    <div>
                        <label>Task Title</label>
                        <input type="text" name="taskTitle" required css={inputStyle} />
                    </div>
                    <div>
                        <label>Task Description</label>
                        <textarea name="taskDescription" required css={inputStyle} />
                    </div>
                    <div>
                        <label>Deadline</label>
                        <input type="datetime-local" name="taskDeadline" required css={inputStyle} />
                    </div>
                    <div>
                        <label>Priority</label>
                        <select name="taskPriority" css={inputStyle}>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                    <div>
                        <label>Dependencies</label>
                        <input type="text" name="taskDependencies" placeholder="Task IDs separated by commas" css={inputStyle} />
                    </div>
                    <div>
                        <label>Responsible Person</label>
                        <input type="text" name="taskResponsible" required css={inputStyle} />
                    </div>
                    <div>
                        <label>Responsible Email</label>
                        <input type="email" name="taskResponsibleEmail" required css={inputStyle} />
                    </div>
                    <button type="submit" css={submitButtonStyle}>
                        Add Task
                    </button>
                </form>
            </div>
        );
    };

    const renderTaskList = () => {
        return (
            <div css={taskListContainerStyle}>
                <h3>Task List</h3>
                <ul>
                    {tasks.slice(-5).map(task => (
                        <li key={task.id} css={taskItemStyle}>
                            <div>
                                Task: {task.title} | Priority: {task.priority} | Created on: {new Date(task.id).toLocaleDateString()}
                            </div>
                            <button onClick={() => deleteTask(task.id)} css={deleteButtonStyle}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    const renderTaskAssignment = () => {
        return (
            <div>
                <h2>Task Assignment</h2>
                {tasks.length === 0 ? (
                    <p>No tasks available to assign.</p>
                ) : (
                    <ul>
                        {tasks.map(task => (
                            <li key={task.id} css={taskItemStyle}>
                                <div>
                                    <strong>Task Name:</strong> {task.title} <br />
                                    <strong>Priority:</strong> {task.priority} <br />
                                    <strong>Assigned to:</strong> {task.responsible} <br />
                                    <strong>Email:</strong> {task.responsibleEmail}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    };

    const renderDeadlineNotification = () => {
        const currentDate = new Date();

        return (
            <div>
                <h2>Deadline Notifications</h2>
                {tasks.length === 0 ? (
                    <p>No tasks with deadlines.</p>
                ) : (
                    <ul>
                        {tasks.map(task => {
                            const isDeadlinePassed = currentDate > task.deadline;
                            const deadlineStatus = isDeadlinePassed ? "Reached Deadline" : "Complete a Task";
                            return (
                                <li key={task.id}>
                                    <div>
                                        <strong>Task:</strong> {task.title} <br />
                                        <strong>Responsible Person:</strong> {task.responsible} <br />
                                        <strong>Email:</strong> {task.responsibleEmail} <br />
                                        <strong>Deadline:</strong> {task.deadline.toLocaleString()} <br />
                                        <strong>Status:</strong> {deadlineStatus}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        );
    };

    const handleBack = () => {
        navigate('/admin');
    };

    const deleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const downloadPDF = () => {
        if (tasks.length === 0) {
            setErrorMessage('No tasks available to download.');
            return;
        }

        const doc = new jsPDF();
        doc.text('Latest 5 Tasks', 10, 10);
        tasks.slice(-5).forEach((task, index) => {
            const yOffset = 20 + (index * 30);
            doc.text(`Task ${index + 1}: ${task.title}`, 10, yOffset);
            doc.text(`Priority: ${task.priority}`, 10, yOffset + 10);
            doc.text(`Status: ${task.status}`, 10, yOffset + 20);
            doc.text(`Deadline: ${new Date(task.deadline).toLocaleString()}`, 10, yOffset + 30);
            doc.text(`Responsible: ${task.responsible}`, 10, yOffset + 40);
        });
        doc.save('task-list.pdf');
    };

    return (
        <div css={appStyle}>
            <div css={sidebarStyle}>
                <button onClick={() => navigate('/Dependencies-Page')} css={buttonStyle}>
                    Task Dependencies
                </button>
                <button onClick={() => setContent('createTask')} css={buttonStyle}>
                    Create Task
                </button>
                <button onClick={() => setContent('taskList')} css={buttonStyle}>
                    Task List
                </button>
                <button onClick={() => setContent('taskAssignment')} css={buttonStyle}>
                    Task Assignment
                </button>
                <button onClick={downloadPDF} css={buttonStyle}>
                    Download PDF
                </button>
                <button onClick={() => setContent('deadlineNotification')} css={buttonStyle}>
                    Deadline Notification
                </button>
                <button onClick={handleBack} css={buttonStyle}>
                    Back
                </button>
            </div>

            <div css={contentStyle}>
                {content === 'welcome' && (
                    <div>
                        <h1>Welcome to Task Management</h1>
                        <p>Use the sidebar to navigate through the options.</p>
                    </div>
                )}
                {content === 'createTask' && renderCreateTaskForm()}
                {content === 'taskList' && renderTaskList()}
                {content === 'taskAssignment' && renderTaskAssignment()}
                {content === 'Dependencies-Page' && (
                    <div>
                        <h2>Task Dependencies</h2>
                        <p>Here you can manage and view task dependencies.</p>
                    </div>
                )}
                {content === 'deadlineNotification' && renderDeadlineNotification()}
            </div>
        </div>
    );
};

const appStyle = css`
    display: flex;
    min-height: 100vh;
    background-color: #f0f2f5;
    font-family: Arial, sans-serif;
`;

const sidebarStyle = css`
    position: fixed;
    top: 0;
    left: 0;
    background-color: #0000FF;
    color: white;
    width: 250px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 100%;
    overflow-y: auto;
`;

const contentStyle = css`
    margin-left: 250px;
    flex-grow: 1;
    padding: 20px;
    overflow-y: auto;
`;

const buttonStyle = css`
    background-color: #FFFFFF;
    color: #0000FF;
    padding: 12px;
    margin: 8px 0;
    width: 100%;
    border: none;
    cursor: pointer;
    text-align: left;
    border-radius: 5px;

    &:hover {
        background-color: #f0f0f0;
    }
`;

const formStyle = css`
    display: flex;
    flex-direction: column;
`;

const inputStyle = css`
    width: 100%;
    padding: 10px;
    margin: 8px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const submitButtonStyle = css`
    background-color: #0000FF;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
    font-size: 16px;

    &:hover {
        background-color: #3333ff;
    }
`;

const taskListContainerStyle = css`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: 20px auto;
`;

const taskItemStyle = css`
    margin-bottom: 10px;
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const deleteButtonStyle = css`
    background-color: red;
    color: white;
    border: none;
    padding: 6px;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 10px;

    &:hover {
        background-color: #cc0000;
    }
`;

const createTaskFormContainerStyle = css`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: 20px auto;
    height: 400px;
    overflow-y: auto;
`;

const errorTextStyle = css`
    color: red;
    font-size: 14px;
`;

export default TaskManagement;
