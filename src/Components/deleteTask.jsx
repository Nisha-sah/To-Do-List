import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DeleteTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    const fetchTask = async () => {
      try {
        const response = await fetch("http://localhost:3000/view-tasks");
        const data = await response.json();

        if (!response.ok) {
          alert(data.message || "Unable to load the task.");
          return;
        }

        const tasks = Array.isArray(data) ? data : data.tasks;
        const selectedTask = Array.isArray(tasks)
          ? tasks.find((savedTask) => String(savedTask._id) === id)
          : null;

        setTask(selectedTask);
      } catch (error) {
        console.error("Failed to load task:", error);
        alert("Unable to connect to server.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/delete-task/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Unable to delete the task.");
        return;
      }

      alert(data.message || "Task deleted successfully.");
      navigate("/view-task");
    } catch (error) {
      console.error("Failed to delete task:", error);
      alert("Unable to connect to server.");
    }
  };

  if (isLoading) {
    return (
      <main className="page dashboard-page">
        <p>Loading task...</p>
      </main>
    );
  }

  if (!id || !task) {
    return (
      <main className="page dashboard-page">
        <div className="page-heading">
          <p className="eyebrow">Task planner</p>
          <h1>Delete Task</h1>
          <p className="page-intro">Select a task from your task list to delete it.</p>
        </div>
        <button type="button" onClick={() => navigate("/view-task")}>
          View Tasks
        </button>
      </main>
    );
  }

  return (
    <main className="page dashboard-page">
      <div className="page-heading">
        <p className="eyebrow">Task planner</p>
        <h1>Delete Task</h1>
        <p className="page-intro">
          Delete <strong>{task.title}</strong>? This cannot be undone.
        </p>
      </div>
      <button type="button" onClick={handleDelete}>Delete Task</button>
      <button type="button" onClick={() => navigate("/view-task")}>Cancel</button>
    </main>
  );
};

export default DeleteTask;
