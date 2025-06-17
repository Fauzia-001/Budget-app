import React from "react";

const Goals = ({ goals = [], onAddGoal, onToggleGoal, onDeleteGoal }) => {
  const [newGoal, setNewGoal] = React.useState("");

  const handleAdd = e => {
    e.preventDefault();
    if (newGoal.trim()) {
      onAddGoal(newGoal.trim());
      setNewGoal("");
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: 600 }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">My Goals</h2>
      </div>
      <form className="d-flex mb-4" onSubmit={handleAdd}>
        <input
          className="form-control me-2"
          type="text"
          placeholder="Add a new goal..."
          value={newGoal}
          onChange={e => setNewGoal(e.target.value)}
        />
        <button className="btn btn-success" type="submit">
          Add
        </button>
      </form>
      <ul className="list-group shadow-sm">
        {goals.length === 0 && (
          <li className="list-group-item text-center text-muted">
            No goals yet. Add one above!
          </li>
        )}
        {goals.map(goal => (
          <li
            key={goal.id}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              goal.completed ? "bg-light text-decoration-line-through" : ""
            }`}
          >
            <div className="d-flex align-items-center">
              <input
                type="checkbox"
                className="form-check-input me-2"
                checked={goal.completed}
                onChange={() => onToggleGoal(goal.id)}
                style={{ width: 20, height: 20 }}
              />
              <span style={{ cursor: "pointer" }}>{goal.text}</span>
            </div>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => onDeleteGoal(goal.id)}
              title="Delete goal"
            >
              <i className="fa fa-trash" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Goals;