import React from "react";

const BottomNavigation = ({ activeTab, onTabChange }) => (
  <nav className="navbar fixed-bottom bg-white border-top shadow-sm" style={{ zIndex: 100 }}>
    <div className="container d-flex justify-content-between px-0">
      <button
        className={`flex-fill btn py-3 ${activeTab === "dashboard" ? "text-primary fw-bold" : "text-secondary"}`}
        style={{ border: "none", background: "none" }}
        onClick={() => onTabChange("dashboard")}
      >
        <i className="fa fa-home fa-lg d-block mb-1" />
        <span style={{ fontSize: 13 }}>Dashboard</span>
      </button>
      <button
        className={`flex-fill btn py-3 ${activeTab === "transactions" ? "text-primary fw-bold" : "text-secondary"}`}
        style={{ border: "none", background: "none" }}
        onClick={() => onTabChange("transactions")}
      >
        <i className="fa fa-list fa-lg d-block mb-1" />
        <span style={{ fontSize: 13 }}>Transactions</span>
      </button>
      <button
        className={`flex-fill btn py-3 ${activeTab === "budget" ? "text-primary fw-bold" : "text-secondary"}`}
        style={{ border: "none", background: "none" }}
        onClick={() => onTabChange("budget")}
      >
        <i className="fa fa-wallet fa-lg d-block mb-1" />
        <span style={{ fontSize: 13 }}>Budget</span>
      </button>
      <button
        className={`flex-fill btn py-3 ${activeTab === "goals" ? "text-primary fw-bold" : "text-secondary"}`}
        style={{ border: "none", background: "none" }}
        onClick={() => onTabChange("goals")}
      >
        <i className="fa fa-bullseye fa-lg d-block mb-1" />
        <span style={{ fontSize: 13 }}>Goals</span>
      </button>
      <button
        className={`flex-fill btn py-3 ${activeTab === "profile" ? "text-primary fw-bold" : "text-secondary"}`}
        style={{ border: "none", background: "none" }}
        onClick={() => onTabChange("profile")}
      >
        <i className="fa fa-user fa-lg d-block mb-1" />
        <span style={{ fontSize: 13 }}>Profile</span>
      </button>
    </div>
  </nav>
);

export default BottomNavigation;