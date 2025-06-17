import React, { useState } from "react";

const SignUp = ({ onSignUp, switchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const API_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || (data.errors && data.errors[0]?.msg) || "Sign up failed");
        return;
      }
      localStorage.setItem("token", data.token);
      onSignUp(data.user); // Pass user info up
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <form className="p-4 bg-white rounded shadow" style={{ minWidth: 320 }} onSubmit={handleSubmit}>
        <h2 className="mb-3">Sign Up</h2>
        {error && <div className="alert alert-danger py-1">{error}</div>}
        <input
          className="form-control mb-2"
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
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
        <button className="btn btn-success w-100 mb-2" type="submit">Sign Up</button>
        <div className="text-center">
          <span>Already have an account? </span>
          <button type="button" className="btn btn-link p-0" onClick={switchToLogin}>Login</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;