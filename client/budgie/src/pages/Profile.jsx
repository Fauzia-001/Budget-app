import React, { useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

const Profile = ({ user, onUserUpdate, onClose }) => {
  const [avatar, setAvatar] = useState(user.avatar || "");
  const [avatarFile, setAvatarFile] = useState(null);
  const [income, setIncome] = useState(user.income || "");
  const [expenses, setExpenses] = useState(user.expenses || "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload(); // Forces redirect to login page
  };

  // Preview selected image
  const handleAvatarChange = e => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleSave = async e => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("income", income);
      formData.append("expenses", expenses);
      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      const res = await fetch(`${API_URL}/api/user/${user.id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Update failed");
        return;
      }
      setMessage("Profile updated!");
      onUserUpdate && onUserUpdate(data);
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: 500 }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-outline-secondary" onClick={onClose}>
          ← Back
        </button>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="card shadow-sm p-4">
        <div className="text-center mb-3">
          <img
            src={
              avatar
                ? avatar.startsWith("http")
                  ? avatar
                  : `${API_URL}${avatar}`
                : "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.name)
            }
            alt="avatar"
            className="rounded-circle mb-2 border"
            style={{ width: 100, height: 100, objectFit: "cover", borderWidth: 3, borderColor: "#eee" }}
          />
          <div>
            <input
              className="form-control mt-2"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              style={{ maxWidth: 250, margin: "0 auto" }}
            />
          </div>
        </div>
        <h3 className="text-center mb-3">{user.name}</h3>
        <form onSubmit={handleSave}>
          {message && <div className="alert alert-success py-1">{message}</div>}
          {error && <div className="alert alert-danger py-1">{error}</div>}
          <div className="mb-3">
            <label className="form-label">Monthly Income</label>
            <input
              className="form-control"
              type="number"
              value={income}
              onChange={e => setIncome(e.target.value)}
              min={0}
              placeholder="Enter your monthly income"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Monthly Expenses</label>
            <input
              className="form-control"
              type="number"
              value={expenses}
              onChange={e => setExpenses(e.target.value)}
              min={0}
              placeholder="Enter your monthly expenses"
            />
          </div>
          <button className="btn btn-primary w-100" type="submit">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;