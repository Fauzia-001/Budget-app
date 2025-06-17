import React, { useState } from "react";

const BudgetModal = ({ isOpen, onClose, onSubmit }) => {
  const [amount, setAmount] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;
    onSubmit({ amount });
    setAmount("");
  };

  return (
    <div className="modal show fade d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.3)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-4">
          <div className="modal-header border-0 pb-0">
            <h4 className="modal-title fw-bold text-primary">Set Your Monthly Budget</h4>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Budget Amount (KSh)</label>
                <input
                  className="form-control form-control-lg"
                  type="number"
                  min={0}
                  step={100}
                  placeholder="Enter amount"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  required
                  autoFocus
                  style={{ fontSize: "1.25rem", borderRadius: "1rem" }}
                />
              </div>
              <div className="d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary px-4">
                  Save Budget
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetModal;