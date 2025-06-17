import React from "react";

const Transactions = ({ transactions = [] }) => (
  <div className="container py-4" style={{ maxWidth: 700 }}>
    <h2 className="mb-4">All Transactions</h2>
    <div className="table-responsive shadow-sm rounded">
      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Category</th>
            <th>Type</th>
            <th className="text-end">Amount (KSh)</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center text-muted">
                No transactions yet.
              </td>
            </tr>
          ) : (
            transactions.map(tx => (
              <tr key={tx.id || tx._id}>
                <td>{new Date(tx.date).toLocaleDateString()}</td>
                <td>{tx.name}</td>
                <td>{tx.category}</td>
                <td>
                  <span className={`badge ${tx.type === "income" ? "bg-success" : "bg-danger"}`}>
                    {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                  </span>
                </td>
                <td className={`text-end fw-bold ${tx.type === "income" ? "text-success" : "text-danger"}`}>
                  {Number(tx.amount).toLocaleString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default Transactions;