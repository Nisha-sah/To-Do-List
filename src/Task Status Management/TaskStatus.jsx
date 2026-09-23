import React, { useState } from "react";

const TaskStatus = () => {
  const [status, setStatus] = useState("pending");

  return (
    <div>
      <h1>Task Status</h1>

      <label htmlFor="status">Status:</label>

      <select
        id="status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <p>Current Status: {status}</p>
    </div>
  );
};

export default TaskStatus;
