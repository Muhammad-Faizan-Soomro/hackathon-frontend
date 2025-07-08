// src/components/Auth/Signup.jsx
import { useState } from "react";
import { signup } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const Signup = () => {
  const [form, setForm] = useState({ email: "", password: "", username: "" });
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form);
      toast.success("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-yellow-100 via-blue-100 to-white text-gray-800"} min-h-screen flex items-center justify-center p-4`}>
      <Toaster position="top-center" />

      <div className={`${darkMode ? "bg-gray-800" : "bg-white"} shadow-2xl rounded-2xl w-full max-w-md p-8`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-center w-full">
            ✈️ Dishcovery x SkyFlow
          </h2>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-4 text-sm underline"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        <p className="text-center text-sm mb-6">
          Create an account to start exploring food and flights!
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="e.g. user@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              placeholder="Choose a username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Create Account
          </button>

          <p className="text-sm text-center mt-4">
            Already have an account?{' '}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
