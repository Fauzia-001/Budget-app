import React from 'react';

const FinancialTasks = ({ tasks, onToggleTask }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <h2 className="text-lg font-semibold mb-4">Financial Tasks</h2>
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleTask(task.id)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className={`font-medium ${
                task.completed ? 'text-gray-400 line-through' : 'text-gray-700'
              }`}>
                {task.title}
              </span>
            </div>
            <button
              onClick={() => onToggleTask(task.id)}
              className="text-gray-400 hover:text-gray-600"
            >
              <i className={`fas ${task.completed ? 'fa-undo' : 'fa-check'}`}></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinancialTasks; 