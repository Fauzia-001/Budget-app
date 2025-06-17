import React from 'react';

const WeeklySpending = () => {
  const spendingData = [
    { day: 'Mon', amount: 120 },
    { day: 'Tue', amount: 85 },
    { day: 'Wed', amount: 150 },
    { day: 'Thu', amount: 95 },
    { day: 'Fri', amount: 200 },
    { day: 'Sat', amount: 180 },
    { day: 'Sun', amount: 140 }
  ];

  const maxAmount = Math.max(...spendingData.map(item => item.amount));

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <h2 className="text-lg font-semibold mb-4">Weekly Spending</h2>
      <div className="h-48 flex items-end justify-between">
        {spendingData.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className="w-8 bg-blue-600 rounded-t-lg transition-all duration-300 hover:bg-blue-700"
              style={{
                height: `${(item.amount / maxAmount) * 100}%`,
                minHeight: '4px'
              }}
            ></div>
            <span className="text-sm text-gray-500 mt-2">{item.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklySpending; 