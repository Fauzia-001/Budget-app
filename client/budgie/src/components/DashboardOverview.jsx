import React, { useEffect, useRef, useMemo } from 'react';
import * as echarts from 'echarts';

const DashboardOverview = ({ userData = {}, transactions = [], tasks = [] }) => {
  const spendingChartRef = useRef(null);
  const incomeChartRef = useRef(null);

  // Calculate monthly income and expenses from transactions
  const { incomeSeries, expenseSeries, months } = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const incomeByMonth = Array(12).fill(0);
    const expenseByMonth = Array(12).fill(0);

    transactions.forEach(tx => {
      const date = new Date(tx.date);
      const monthIdx = date.getMonth();
      if (tx.type === 'income') {
        incomeByMonth[monthIdx] += tx.amount;
      } else if (tx.type === 'expense') {
        expenseByMonth[monthIdx] += tx.amount;
      }
    });

    return {
      incomeSeries: incomeByMonth,
      expenseSeries: expenseByMonth,
      months
    };
  }, [transactions]);

  // Enhanced chart options
  useEffect(() => {
    // Capture refs at the start of the effect
    const spendingChartNode = spendingChartRef.current;
    const incomeChartNode = incomeChartRef.current;

    // SPENDING CHART (Expenses by month)
    if (spendingChartNode) {
      echarts.dispose(spendingChartNode);
      const chart = echarts.init(spendingChartNode);
      chart.setOption({
        tooltip: { trigger: 'axis' },
        grid: { left: 10, right: 10, top: 10, bottom: 10 },
        xAxis: {
          type: 'category',
          data: months,
          axisLine: { lineStyle: { color: '#e5e7eb' } },
          axisLabel: { color: '#6b7280', fontWeight: 'bold' }
        },
        yAxis: {
          type: 'value',
          axisLine: { show: false },
          axisLabel: { color: '#6b7280' },
          splitLine: { lineStyle: { color: '#f3f4f6' } }
        },
        series: [{
          data: expenseSeries,
          type: 'bar',
          barWidth: '60%',
          itemStyle: {
            color: '#ef4444',
            borderRadius: [6, 6, 0, 0],
            shadowColor: 'rgba(239,68,68,0.2)',
            shadowBlur: 8
          },
          emphasis: {
            itemStyle: { color: '#b91c1c' }
          }
        }]
      });
    }

    // INCOME CHART (Income by month)
    if (incomeChartNode) {
      echarts.dispose(incomeChartNode);
      const chart = echarts.init(incomeChartNode);
      chart.setOption({
        tooltip: { trigger: 'axis' },
        grid: { left: 10, right: 10, top: 10, bottom: 10 },
        xAxis: {
          type: 'category',
          data: months,
          axisLine: { lineStyle: { color: '#e5e7eb' } },
          axisLabel: { color: '#6b7280', fontWeight: 'bold' }
        },
        yAxis: {
          type: 'value',
          axisLine: { show: false },
          axisLabel: { color: '#6b7280' },
          splitLine: { lineStyle: { color: '#f3f4f6' } }
        },
        series: [{
          data: incomeSeries,
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: { color: '#22c55e', width: 4 },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(34,197,94,0.3)' },
              { offset: 1, color: 'rgba(34,197,94,0.05)' }
            ])
          },
          itemStyle: { color: '#22c55e' },
          emphasis: {
            lineStyle: { color: '#16a34a', width: 5 }
          }
        }]
      });
    }

    return () => {
      if (spendingChartNode) echarts.dispose(spendingChartNode);
      if (incomeChartNode) echarts.dispose(incomeChartNode);
    };
  }, [incomeSeries, expenseSeries, months]);

  // UI
  return (
    <div className="row g-3 mb-4">
      {/* Current Balance */}
      <div className="col-12 col-md-6 col-lg-3">
        <div className="card h-100 border-0 shadow-sm">
          <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted">Current Balance</h6>
            <h2 className="card-title mb-0 text-success">KSh {userData.balance?.toLocaleString()}</h2>
          </div>
        </div>
      </div>

      {/* Total Income */}
      <div className="col-12 col-md-6 col-lg-3">
        <div className="card h-100 border-0 shadow-sm">
          <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted">Total Income</h6>
            <h2 className="card-title mb-0 text-success">KSh {userData.totalIncome?.toLocaleString()}</h2>
            <div ref={incomeChartRef} style={{ height: '70px', width: '100%' }} />
          </div>
        </div>
      </div>

      {/* Total Expenses */}
      <div className="col-12 col-md-6 col-lg-3">
        <div className="card h-100 border-0 shadow-sm">
          <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted">Total Expenses</h6>
            <h2 className="card-title mb-0 text-danger">KSh {userData.totalExpenses?.toLocaleString()}</h2>
            <div ref={spendingChartRef} style={{ height: '70px', width: '100%' }} />
          </div>
        </div>
      </div>

      {/* Savings Rate */}
      <div className="col-12 col-md-6 col-lg-3">
        <div className="card h-100 border-0 shadow-sm">
          <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted">Savings Rate</h6>
            <h2 className="card-title mb-0">{userData.savingsRate || 0}%</h2>
            <div className="progress mt-3" style={{ height: '6px' }}>
              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{ width: `${userData.savingsRate || 0}%` }}
                aria-valuenow={userData.savingsRate || 0}
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;