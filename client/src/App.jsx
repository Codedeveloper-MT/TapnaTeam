import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import ResetPasswordForm from "./ResetPasswordForm";
import UserProfile from "./UserProfile";
import VersionControl from "./VersionControl";
import TaskManagement from "./TaskManagement";
import Admin from "./Admin";
import CollaborationTools from "./CollaborationTools";
import DependenciesPage from "./DependenciesPage";
import TrackChanges from "./TrackChanges";
import ManageProject from "./ManageProject";
import Project from "./Project";
import HomePage from "./HomePage";
import Graph from "./Graph";
import Management from "./Management";
import FileSchudule from "./FileSchudule";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/version-control" element={<VersionControl />} />
        <Route path="/task-management" element={<TaskManagement />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/Collaborate-tool" element={<CollaborationTools />} />
        <Route path="/Dependencies-Page" element={<DependenciesPage />} />
        <Route path="/Track-Changes" element={<TrackChanges />} />
        <Route path="/Manage-Project" element={<ManageProject />} />
        <Route path="/project" element={<Project />} />
        <Route path="/graph" element={<Graph />} />
        <Route path="/team-management" element={<Management />} />
        <Route path="/file-Schudule" element={<FileSchudule />} />
      </Routes>
    </Router>
  );
}

export default App;
