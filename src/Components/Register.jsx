import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(
          response.status === 409
            ? "An account with this email already exists."
            : data.message || "Registration failed.",
        );
        return;
      }

      alert(data.message);

      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Unable to connect to server");
    }
  };

  return (
    <main className="page auth-page">
      <div className="page-heading">
        <p className="eyebrow">Task planner</p>
        <h1>Create account</h1>
        <p className="page-intro">Start organizing what matters.</p>
      </div>

      <form className="auth-form register-form" onSubmit={handleSubmit}>
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

        <div>
          <label>Confirm Password:</label>
          <br />

          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm your password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit">Register</button>
      </form>
    </main>
  );
};

export default Register;
