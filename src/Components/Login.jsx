import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert(data.message);

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Unable to connect to server");
    }
  };

  return (
    <main className="page auth-page">
      <div className="page-heading">
        <p className="eyebrow">Task planner</p>
        <h1>Welcome back</h1>
        <p className="page-intro">Sign in to keep your day in order.</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <br />

          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Password:</label>
          <br />

          <input
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit">Login</button>
      </form>
    </main>
  );
};

export default Login;
