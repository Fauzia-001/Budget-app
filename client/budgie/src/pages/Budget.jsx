import React from "react";

const Budget = ({ user, transactions }) => {
  const budget = user?.budget || 0;

  // Calculate total expenses for the month
  const totalExpenses = transactions
    .filter(tx => tx.type === "expense")
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const remaining = budget - totalExpenses;
  const percent = budget ? Math.min(100, Math.round((totalExpenses / budget) * 100)) : 0;

  return (
    <div className="container py-4" style={{ maxWidth: 500 }}>
      <h2 className="mb-4">Budget Overview</h2>
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title">Monthly Budget</h5>
          <h2 className="text-primary mb-3">KSh {budget.toLocaleString()}</h2>
          <div className="mb-2">
            <span className="fw-bold">Spent:</span>{" "}
            <span className="text-danger">KSh {totalExpenses.toLocaleString()}</span>
          </div>
          <div className="mb-2">
            <span className="fw-bold">Remaining:</span>{" "}
            <span className={remaining < 0 ? "text-danger" : "text-success"}>
              KSh {remaining.toLocaleString()}
            </span>
          </div>
          <div className="progress" style={{ height: 12 }}>
            <div
              className={`progress-bar ${percent < 100 ? "bg-success" : "bg-danger"}`}
              role="progressbar"
              style={{ width: `${percent}%` }}
              aria-valuenow={percent}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {percent}%
            </div>
          </div>
        </div>
      </div>
      <div className="alert alert-info">
        Set your budget in the Profile or with the "Set Budget" action.
      </div>
    </div>
  );
};

export default Budget;