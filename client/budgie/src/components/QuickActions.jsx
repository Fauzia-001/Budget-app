import React from 'react';

const QuickActions = ({
  onAddIncome,
  onAddExpense,
  onSetBudget,
  onSetGoals,
  onCalculatorToggle
}) => (
  <div className="d-flex gap-2 my-3 flex-wrap">
    <button className="btn btn-success" onClick={onAddIncome}>Add Income</button>
    <button className="btn btn-danger" onClick={onAddExpense}>Add Expense</button>
    <button className="btn btn-primary" onClick={onSetBudget}>Set Budget</button>
    <button className="btn btn-secondary" onClick={onCalculatorToggle}>Calculator</button>
  </div>
);

export default QuickActions;