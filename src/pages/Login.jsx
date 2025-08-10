import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import toast from "react-hot-toast";
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useUser();

  const handleLogin = () => {
    if (!name.trim() || !password.trim()) {
      toast.error("Please enter both name and password.");
      return;
    }

    const success = login(name, password);
    if (success) {
      toast.success("Login successful!");
      navigate("/");
    } else {
      toast.error("Invalid name or password.");
    }
  };

  return (

   


    <div
    


      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(135deg, #f0f4f8, #d9e2ec)", // subtle light blue-gray gradient
      }}
    >
    


      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 animate-slideUp floating-card"
        style={{
          boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07)",
          border: "1px solid #cbd5e1", // light gray border for subtle frame
        }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 tracking-wide">
          Log In
        </h2>

        {/* Name Input */}
        <div className="relative mb-4">
          <FaUser className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        {/* Password Input */}
        <div className="relative mb-6">
          <FaLock className="absolute left-3 top-3 text-gray-400" />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition duration-200 shadow-md"
        >
          Log In
        </button>

        {/* Signup Link */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Create an account
          </Link>
        </p>
      </div>

      {/* Custom Animations */}
      <style>
        {`
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slideUp {
            animation: slideUp 0.6s ease-out;
          }
          @keyframes floatCard {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
            100% { transform: translateY(0px); }
          }
          .floating-card {
            animation: floatCard 6s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Login;
