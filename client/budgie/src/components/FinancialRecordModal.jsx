import React, { useState, useEffect } from "react";

const FinancialRecordModal = ({ isOpen, type = "income", onClose, onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    type: type
  });

  // Reset form when modal opens or type changes
  useEffect(() => {
    if (isOpen) {
      setForm({
        name: "",
        category: "",
        amount: "",
        date: new Date().toISOString().split("T")[0],
        type: type
      });
    }
  }, [isOpen, type]);

  if (!isOpen) return null;

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.category || !form.amount || Number(form.amount) <= 0) return;
    onSubmit(form);
  };

  return (
    <div className="modal show fade d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.3)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-4">
          <div className="modal-header border-0 pb-0">
            <h4 className={`modal-title fw-bold ${type === "income" ? "text-success" : "text-danger"}`}>
              {type === "income" ? "Add Income" : "Add Expense"}
            </h4>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Name</label>
                <input
                  className="form-control form-control-lg"
                  type="text"
                  name="name"
                  placeholder={type === "income" ? "e.g. Salary, Bonus" : "e.g. Rent, Groceries"}
                  value={form.name}
                  onChange={handleChange}
                  required
                  style={{ borderRadius: "1rem" }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Category</label>
                <input
                  className="form-control form-control-lg"
                  type="text"
                  name="category"
                  placeholder={type === "income" ? "e.g. Job, Gift" : "e.g. Food, Utilities"}
                  value={form.category}
                  onChange={handleChange}
                  required
                  style={{ borderRadius: "1rem" }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Amount (KSh)</label>
                <input
                  className="form-control form-control-lg"
                  type="number"
                  name="amount"
                  min={0}
                  step={100}
                  placeholder="Enter amount"
                  value={form.amount}
                  onChange={handleChange}
                  required
                  style={{ fontSize: "1.25rem", borderRadius: "1rem" }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Date</label>
                <input
                  className="form-control form-control-lg"
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  style={{ borderRadius: "1rem" }}
                />
              </div>
              <div className="d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className={`btn px-4 ${type === "income" ? "btn-success" : "btn-danger"}`}>
                  {type === "income" ? "Add Income" : "Add Expense"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialRecordModal;