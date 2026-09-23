import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [reminder, setReminder] = useState("None");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("Personal");
  const [status, setStatus] = useState("To Do");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // for backend api
    

    try {
      const response = await fetch("http://localhost:3000/create-task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      description,
      dueDate,
      reminder,
      priority,
      category,
      status,
    }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert(data.message);
    } catch (error) {
      console.error("Failed to create task:", error);
      alert("Unable to create the task. Please try again.");
      return;
    }

    const task = {
      id: Date.now(),
      title,
      description,
      dueDate,
      reminder,
      priority,
      category,
      status,
    };

    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    localStorage.setItem("tasks", JSON.stringify([...savedTasks, task]));

    setTitle("");
    setDescription("");
    setDueDate("");
    setReminder("None");
    setPriority("Medium");
    setCategory("Personal");
    setStatus("To Do");

    navigate("/view-task");
  };

  return (
    <main className="page dashboard-page">
      <div className="page-heading">
        <p className="eyebrow">Task planner</p>
        <h1>Dashboard</h1>
        <p className="page-intro">Turn your next priority into a clear plan.</p>
      </div>

      <form className="task-form" onSubmit={handleSubmit}>
        <h2>Create Task</h2>

        <label>Task Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Task Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <label htmlFor="reminder">Reminder</label>
        <select
          id="reminder"
          value={reminder}
          onChange={(e) => setReminder(e.target.value)}
        >
          <option value="None">No reminder</option>
          <option value="At due time">At due time</option>
          <option value="10 minutes before">10 minutes before</option>
          <option value="1 hour before">1 hour before</option>
          <option value="1 day before">1 day before</option>
        </select>

        <label>Priority</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Personal">Personal</option>
          <option value="Study">Study</option>
          <option value="Work">Work</option>
        </select>

        <button type="submit">Create Task</button>
      </form>
    </main>
  );
};

export default Dashboard;
