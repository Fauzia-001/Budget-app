import React from "react";

const Tasks = ({ tasks = [], onToggleTask }) => (
  <div className="card shadow-sm mb-4">
    <div className="card-header bg-white">
      <h5 className="mb-0">Financial Tasks</h5>
    </div>
    <ul className="list-group list-group-flush">
      {tasks.length === 0 && (
        <li className="list-group-item text-muted text-center">
          No tasks yet.
        </li>
      )}
      {tasks.map((task) => (
        <li
          key={task.id}
          className="list-group-item d-flex align-items-center"
          style={{ cursor: "pointer", opacity: task.completed ? 0.6 : 1 }}
          onClick={() => onToggleTask(task.id)}
        >
          <input
            type="checkbox"
            className="form-check-input me-2"
            checked={task.completed}
            onChange={() => onToggleTask(task.id)}
            onClick={(e) => e.stopPropagation()}
          />
          <span className={task.completed ? "text-decoration-line-through" : ""}>
            {task.text}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

export default Tasks;