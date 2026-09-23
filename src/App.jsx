import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./Components/Register.jsx";
import Login from "./Components/Login.jsx";
import "./index.css";
import Dashboard from "./Components/Dashboard.jsx";
import ViewTask from "./Components/ViewTask.jsx";
import UpdateTask from "./Components/UpdateTask.jsx";
import DeleteTask from "./Components/deleteTask.jsx";
import TaskStatus from "./Task Status Management/TaskStatus.jsx";
const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/view-task" element={<ViewTask />} />
        <Route path="/update-task" element={<UpdateTask />} />
        <Route path="/update-task/:id" element={<UpdateTask />} />
        <Route path="/delete-task" element={<DeleteTask />} />
        <Route path="/delete-task/:id" element={<DeleteTask />} />
        <Route path="/task-status" element={<TaskStatus />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
