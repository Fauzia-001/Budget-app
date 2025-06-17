import React, { useState } from "react";

const GoalsModal = ({ isOpen, onClose, onSubmit }) => {
  const [goal, setGoal] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ goal });
    setGoal("");
  };

  return (
    <div
      className="modal show fade d-block"
      tabIndex="-1"
      style={{
        background: "rgba(0,0,0,0.3)",
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 1050,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-4">
          <div className="modal-header border-0 pb-0">
            <h4 className="modal-title fw-bold text-primary">Set a New Goal</h4>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Goal</label>
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Describe your goal"
                  value={goal}
                  onChange={e => setGoal(e.target.value)}
                  required
                  autoFocus
                  style={{ borderRadius: "1rem" }}
                />
              </div>
              <div className="d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary px-4">
                  Save Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalsModal;