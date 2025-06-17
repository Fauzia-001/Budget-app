import React, { useState } from "react";

const RecentTransactions = ({ transactions = [] }) => {
  const [showAll, setShowAll] = useState(false);

  const displayed = showAll ? transactions : transactions.slice(0, 4);

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Recent Transactions</h5>
        {transactions.length > 4 && (
          <button
            className="btn btn-link btn-sm"
            onClick={() => setShowAll(!showAll)}
            style={{ textDecoration: "none" }}
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        )}
      </div>
      <ul className="list-group list-group-flush">
        {displayed.length === 0 && (
          <li className="list-group-item text-muted text-center">
            No transactions yet.
          </li>
        )}
        {displayed.map((tx) => (
          <li
            key={tx.id || tx._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <div className="fw-semibold">{tx.name}</div>
              <small className="text-muted">
                {new Date(tx.date).toLocaleDateString()}
              </small>
            </div>
            <div
              className={`fw-bold ${
                tx.type === "income" ? "text-success" : "text-danger"
              }`}
            >
              {tx.type === "income" ? "+" : "-"}KSh{" "}
              {Number(tx.amount).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentTransactions;