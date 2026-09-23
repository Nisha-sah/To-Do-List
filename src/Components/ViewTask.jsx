import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const getToday = () => {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${today.getFullYear()}-${month}-${day}`;
};

const ViewTask = () => {
  const navigate = useNavigate();

  // Store tasks received from backend
  const [tasks, setTasks] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");

  // Get tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:3000/view-tasks");

        const data = await response.json();

        if (!response.ok) {
          alert(data.message);
          return;
        }

        // The API may return the array directly or wrap it in a `tasks` field.
        // Keep state as an array so searching and filtering are always safe.
        const receivedTasks = Array.isArray(data) ? data : data.tasks;

        if (!Array.isArray(receivedTasks)) {
          console.error("Unexpected task response:", data);
          alert("The server returned an invalid task list.");
          setTasks([]);
          return;
        }

        setTasks(receivedTasks);
      } catch (error) {
        console.log(error);
        setTasks([]);
        alert("Unable to connect to server");
      }
    };

    fetchTasks();
  }, []);

  const today = getToday();

  // Search and filter
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = `${task.title || ""} ${task.description || ""}`
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || (task.status || "To Do") === statusFilter;

    const matchesPriority =
      priorityFilter === "All" || task.priority === priorityFilter;

    const taskDate = task.dueDate
      ? new Date(task.dueDate).toISOString().split("T")[0]
      : "";

    const matchesDate =
      dateFilter === "All" ||
      (dateFilter === "Today" && taskDate === today) ||
      (dateFilter === "Overdue" && taskDate && taskDate < today) ||
      (dateFilter === "Upcoming" && taskDate && taskDate > today);

    return matchesSearch && matchesStatus && matchesPriority && matchesDate;
  });

  const navigateToUpdateTask = (taskId) => {
    navigate(`/update-task/${taskId}`);
  };

  const navigateToDeleteTask = (taskId) => {
    navigate(`/delete-task/${taskId}`);
  };

  return (
    <main className="page tasks-page">
      <div className="page-heading">
        <p className="eyebrow">Task planner</p>

        <h1>View Tasks</h1>

        <p className="page-intro">
          A calm overview of what needs your attention.
        </p>
      </div>

      {/* Search */}
      <div className="search-section">
        <label htmlFor="task-search">Search Task</label>

        <div className="search-input">
          <svg className="search-icon" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="6" />
            <path d="m16 16 4 4" />
          </svg>

          <input
            id="task-search"
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="task-filters">
          {/* Status */}
          <div>
            <label htmlFor="status-filter">Status</label>

            <select
              id="status-filter"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="All">All statuses</option>

              <option value="To Do">To Do</option>

              <option value="In Progress">In Progress</option>

              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Priority */}
          <div>
            <label htmlFor="priority-filter">Priority</label>

            <select
              id="priority-filter"
              value={priorityFilter}
              onChange={(event) => setPriorityFilter(event.target.value)}
            >
              <option value="All">All priorities</option>

              <option value="Low">Low</option>

              <option value="Medium">Medium</option>

              <option value="High">High</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date-filter">Due date</label>

            <select
              id="date-filter"
              value={dateFilter}
              onChange={(event) => setDateFilter(event.target.value)}
            >
              <option value="All">Any date</option>

              <option value="Today">Due today</option>

              <option value="Upcoming">Upcoming</option>

              <option value="Overdue">Overdue</option>
            </select>
          </div>
        </div>
      </div>

      {/* Task count */}
      <div className="task-list-heading">
        <h2>All Tasks</h2>

        <span>{filteredTasks.length} tasks</span>
      </div>

      {/* Tasks */}
      <section className="task-list" aria-label="Task list">
        {filteredTasks.map((task) => (
          <article className="task-card" key={task._id}>
            <div className="task-card-top">
              <span
                className={`priority priority-${(
                  task.priority || "Medium"
                ).toLowerCase()}`}
              >
                {task.priority}
              </span>

              <span className="category">{task.category}</span>
            </div>

            <p className="task-status">{task.status || "To Do"}</p>

            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p className="due-date">
              <span>Due date</span>

              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString()
                : "No due date"}
            </p>

            {task.reminder && task.reminder !== "None" && (
              <p className="task-reminder">Reminder: {task.reminder}</p>
            )}

            <div className="task-actions">
              <button
                className="task-action task-action-update"
                type="button"
                onClick={() => navigateToUpdateTask(task._id)}
              >
                Update
              </button>

              <button
                className="task-action task-action-delete"
                type="button"
                onClick={() => navigateToDeleteTask(task._id)}
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default ViewTask;
