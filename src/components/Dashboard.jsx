import React, { useState } from "react";
import AgentInput from "./AgentInput";
import { getToken, logout } from "../utils/auth";
import { Toaster, toast } from "react-hot-toast";

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const token = getToken();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    window.location.href = "/"; // Redirect to login
  };

  return (
    <div className={`${darkMode ? "bg-gray-900" : "bg-gray-100"} text-white min-h-screen p-6 transition-all duration-300`}>
      <Toaster position="top-right" />
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">👋 Welcome to Dishcovery x SkyFlow</h2>
          <button
            className="text-sm px-3 py-1 rounded bg-gray-300 dark:bg-gray-700"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
        >
          Logout
        </button>

        <hr className="border-gray-300 dark:border-gray-600" />

        <AgentInput />
      </div>
    </div>
  );
};

export default Dashboard;
