import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const emptyTask = {
  title: "",
  description: "",
  dueDate: "",
  reminder: "None",
  priority: "Medium",
  category: "Personal",
  status: "To Do",
};

const UpdateTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(emptyTask);
  const [taskExists, setTaskExists] = useState(false);
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

        if (selectedTask) {
          setTask({ ...emptyTask, ...selectedTask });
          setTaskExists(true);
        }
      } catch (error) {
        console.error("Failed to load task:", error);
        alert("Unable to connect to server.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTask((currentTask) => ({ ...currentTask, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/edit-task/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: task.title,
          description: task.description,
          dueDate: task.dueDate,
          reminder: task.reminder,
          priority: task.priority,
          category: task.category,
          status: task.status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Unable to update the task.");
        return;
      }

      alert(data.message || "Task updated successfully.");
      navigate("/view-task");
    } catch (error) {
      console.error("Failed to update task:", error);
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

  if (!id || !taskExists) {
    return (
      <main className="page dashboard-page">
        <div className="page-heading">
          <p className="eyebrow">Task planner</p>
          <h1>Update Task</h1>
          <p className="page-intro">
            Select a task from your task list before editing it.
          </p>
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
        <h1>Update Task</h1>
        <p className="page-intro">Correct a detail and save your changes.</p>
      </div>

      <form className="task-form" onSubmit={handleSubmit}>
        <h2>Edit Task</h2>

        <label htmlFor="title">Task Title</label>
        <input
          id="title"
          name="title"
          value={task.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Task Description</label>
        <textarea
          id="description"
          name="description"
          value={task.description}
          onChange={handleChange}
        />

        <label htmlFor="dueDate">Due Date</label>
        <input
          id="dueDate"
          name="dueDate"
          type="date"
          value={task.dueDate}
          onChange={handleChange}
        />

        <label htmlFor="reminder">Reminder</label>
        <select
          id="reminder"
          name="reminder"
          value={task.reminder}
          onChange={handleChange}
        >
          <option value="None">No reminder</option>
          <option value="At due time">At due time</option>
          <option value="10 minutes before">10 minutes before</option>
          <option value="1 hour before">1 hour before</option>
          <option value="1 day before">1 day before</option>
        </select>

        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          name="priority"
          value={task.priority}
          onChange={handleChange}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={task.status}
          onChange={handleChange}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={task.category}
          onChange={handleChange}
        >
          <option value="Personal">Personal</option>
          <option value="Study">Study</option>
          <option value="Work">Work</option>
        </select>

        <button type="submit">Save Changes</button>
      </form>
    </main>
  );
};

export default UpdateTask;
