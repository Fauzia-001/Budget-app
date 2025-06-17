import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import DashboardOverview from './components/DashboardOverview';
import QuickActions from './components/QuickActions';
import RecentTransactions from './components/RecentTransactions';
import Tasks from './components/Tasks';
import BottomNavigation from './components/BottomNavigation';
import Calculator from './components/Calculator';
import FinancialRecordModal from './components/FinancialRecordModal';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import BudgetModal from './components/BudgetModal';
import GoalsModal from './components/GoalsModal';
import Goals from './pages/Goals';
import Transactions from './pages/Transactions';
import Budget from './pages/Budget';

const App = () => {
  const [user, setUser] = useState(null);
  const [showSignUp, setShowSignUp] = useState(false);
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });
  const [calculatorVisible, setCalculatorVisible] = useState(false);
  const [calculatorValue, setCalculatorValue] = useState('0');
  const [calculatorMemory, setCalculatorMemory] = useState(0);
  const [calculatorOperation, setCalculatorOperation] = useState('');
  const [calculatorPrevValue, setCalculatorPrevValue] = useState(0);

  // Financial record modal states
  const [isFinancialModalOpen, setIsFinancialModalOpen] = useState(false);
  const [activeFinancialTab, setActiveFinancialTab] = useState('income'); // or 'expense'
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [isGoalsModalOpen, setIsGoalsModalOpen] = useState(false);
  
  // Active tab
  const [activeTab, setActiveTab] = useState('dashboard');

  // Initialize tasks from localStorage or default
  const defaultTasks = [
    { id: 1, text: "Set your monthly budget", completed: false },
    { id: 2, text: "Add your first income", completed: false },
    { id: 3, text: "Add your first expense", completed: false },
    { id: 4, text: "Set a financial goal", completed: false }
  ];

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : defaultTasks;
  });

  // Persist tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Goals state
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem("goals");
    return saved ? JSON.parse(saved) : [];
  });

  // Persist goals to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  // Check for token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Optionally fetch user info here
      fetch('/api/user/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(() => setUser(null));
    }
  }, []);

  // Fetch transactions when user logs in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (user && user.id && token) {
      fetch('/api/transactions', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => setTransactions(data))
        .catch(() => setTransactions([]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user && user.id]);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setTransactions([]);
  };

  // Toggle task completion
  const toggleTask = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Calculator functions
  const handleCalculatorInput = (value) => {
    if (calculatorValue === '0' && value !== '.') {
      setCalculatorValue(value);
    } else {
      setCalculatorValue(calculatorValue + value);
    }
  };

  const handleCalculatorOperation = (operation) => {
    setCalculatorPrevValue(parseFloat(calculatorValue));
    setCalculatorOperation(operation);
    setCalculatorValue('0');
  };

  const calculateResult = () => {
    const current = parseFloat(calculatorValue);
    let result = 0;
    switch (calculatorOperation) {
      case '+':
        result = calculatorPrevValue + current;
        break;
      case '-':
        result = calculatorPrevValue - current;
        break;
      case '*':
        result = calculatorPrevValue * current;
        break;
      case '/':
        result = calculatorPrevValue / current;
        break;
      default:
        return;
    }
    setCalculatorValue(result.toString());
    setCalculatorOperation('');
  };

  const clearCalculator = () => {
    setCalculatorValue('0');
    setCalculatorOperation('');
    setCalculatorPrevValue(0);
  };

  const handleFinancialFormSubmit = async (formData) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    if (res.ok) {
      setTransactions(prev => [data, ...prev]);
      setIsFinancialModalOpen(false);
    } else {
      alert(data.error || 'Failed to add record');
    }
  };

  // Memory functions
  const memoryAdd = () => {
    setCalculatorMemory(prev => prev + parseFloat(calculatorValue));
  };
  const memoryRecall = () => {
    setCalculatorValue(calculatorMemory.toString());
  };
  const memoryClear = () => {
    setCalculatorMemory(0);
  };

  const handleBudgetSubmit = (budgetData) => {
    setUser(prev => {
      const updated = { ...prev, budget: Number(budgetData.amount) };
      localStorage.setItem("budget", updated.budget); // Persist budget
      localStorage.setItem("user", JSON.stringify(updated)); // Persist user object
      return updated;
    });
    setIsBudgetModalOpen(false);
  };

  const handleGoalsSubmit = (goalData) => {
    // You can POST to your backend here if needed
    alert(`Goal set: ${goalData.goal}`);
    setIsGoalsModalOpen(false);
  };

  const handleAddGoal = text => {
    setGoals(prev => [
      ...prev,
      { id: Date.now(), text, completed: false }
    ]);
  };

  const handleToggleGoal = id => {
    setGoals(prev =>
      prev.map(goal =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  const handleDeleteGoal = id => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  // Calculate current balance from all transactions
  const currentBalance = transactions.reduce((acc, tx) => {
    if (tx.type === "income") return acc + Number(tx.amount);
    if (tx.type === "expense") return acc - Number(tx.amount);
    return acc;
  }, 0);

  const totalIncome = transactions
    .filter(tx => tx.type === "income")
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const totalExpenses = transactions
    .filter(tx => tx.type === "expense")
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const savingsRate =
    totalIncome > 0
      ? Math.round(((totalIncome - totalExpenses) / totalIncome) * 100)
      : 0;

  useEffect(() => {
    localStorage.setItem("currentBalance", JSON.stringify(currentBalance));
    localStorage.setItem("totalIncome", JSON.stringify(totalIncome));
    localStorage.setItem("totalExpenses", JSON.stringify(totalExpenses));
    localStorage.setItem("savingsRate", JSON.stringify(savingsRate));
  }, [currentBalance, totalIncome, totalExpenses, savingsRate]);



  if (!user) {
    return showSignUp ? (
      <SignUp
        onSignUp={user => setUser(user)}
        switchToLogin={() => setShowSignUp(false)}
      />
    ) : (
      <Login
        onLogin={user => setUser(user)}
        switchToSignUp={() => setShowSignUp(true)}
      />
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      <Header user={user} onAddClick={() => setIsFinancialModalOpen(true)} />

      <main className="container py-4 pb-5">
        {activeTab === 'dashboard' && (
          <>
            <DashboardOverview
              userData={{
                balance: currentBalance,
                totalIncome,
                totalExpenses,
                savingsRate,
                budget: user?.budget || 0 // <-- add this line
              }}
              transactions={transactions}
              tasks={tasks}
            />
            <QuickActions
              onCalculatorToggle={() => setCalculatorVisible(!calculatorVisible)}
              onAddIncome={() => {
                setActiveFinancialTab('income');
                setIsFinancialModalOpen(true);
              }}
              onAddExpense={() => {
                setActiveFinancialTab('expense');
                setIsFinancialModalOpen(true);
              }}
              onSetBudget={() => setIsBudgetModalOpen(true)}
              onSetGoals={() => setIsGoalsModalOpen(true)}
            />
            <RecentTransactions transactions={transactions} />
            <Tasks tasks={tasks} onToggleTask={toggleTask} />
          </>
        )}
        {activeTab === 'profile' && (
          <Profile user={user} onUserUpdate={setUser} onClose={() => setActiveTab('dashboard')} />
        )}
        {activeTab === 'goals' && (
          <Goals
            goals={goals}
            onAddGoal={handleAddGoal}
            onToggleGoal={handleToggleGoal}
            onDeleteGoal={handleDeleteGoal}
          />
        )}
        {activeTab === 'transactions' && (
          <Transactions transactions={transactions} />
        )}
        {activeTab === 'budget' && (
          <Budget
            user={user}
            transactions={transactions}
          />
        )}
      </main>

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {calculatorVisible && (
        <Calculator
          value={calculatorValue}
          onInput={handleCalculatorInput}
          onOperation={handleCalculatorOperation}
          onCalculate={calculateResult}
          onClear={clearCalculator}
          onClose={() => setCalculatorVisible(false)}
          onMemoryAdd={memoryAdd}
          onMemoryRecall={memoryRecall}
          onMemoryClear={memoryClear}
        />
      )}

      {isFinancialModalOpen && (
        <FinancialRecordModal
          isOpen={isFinancialModalOpen}
          type={activeFinancialTab}
          onClose={() => setIsFinancialModalOpen(false)}
          onSubmit={handleFinancialFormSubmit}
        />
      )}
      {isBudgetModalOpen && (
        <BudgetModal
          isOpen={isBudgetModalOpen}
          onClose={() => setIsBudgetModalOpen(false)}
          onSubmit={handleBudgetSubmit}
        />
      )}
      {isGoalsModalOpen && (
        <GoalsModal
          isOpen={isGoalsModalOpen}
          onClose={() => setIsGoalsModalOpen(false)}
          onSubmit={handleGoalsSubmit}
        />
      )}

      <button onClick={handleLogout} className="btn btn-outline-secondary float-end m-2">Logout</button>
    </div>
  );
};

export default App;