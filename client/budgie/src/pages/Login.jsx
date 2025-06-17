import React, { useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

const Login = ({ onLogin, switchToSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }
      localStorage.setItem("token", data.token);
      onLogin(data.user); // Pass user info up
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <form className="p-4 bg-white rounded shadow" style={{ minWidth: 320 }} onSubmit={handleSubmit}>
        <h2 className="mb-3">Login</h2>
        {error && <div className="alert alert-danger py-1">{error}</div>}
        <input
          className="form-control mb-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-primary w-100 mb-2" type="submit">Login</button>
        <div className="text-center">
          <span>Don't have an account? </span>
          <button type="button" className="btn btn-link p-0" onClick={switchToSignUp}>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default Login;