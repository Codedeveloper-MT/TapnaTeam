import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import ResetPasswordForm from "./ResetPasswordForm";
import Dashboard from "./Dashboard";
import UserProfile from "./UserProfile";
import VersionControl from "./VersionControl";
import TaskManagement from "./TaskManagement";  
import Admin from "./Admin";
import CollaborationTools from "./CollaborationTools";
import DependenciesPage from "./DependenciesPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/version-control" element={<VersionControl />} />
        <Route path="/task-management" element={<TaskManagement />} /> 
        <Route path="/admin" element={<Admin />} />
        <Route path="/Collaborate-tool" element={<CollaborationTools/>} />
        <Route path="/Dependencies-Page" element={<DependenciesPage/>} />  
      </Routes>
    </Router>
  );
}

export default App;
