import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex flex-col justify-center items-center text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to ChatRoom!</h1>
      <p className="text-lg mb-8 text-center">
        Your favorite place to connect, chat, and share your thoughts.
      </p>
      <p className="italic text-gray-200 mb-12 text-center">
        Created by <span className="font-semibold">Aarish Quazi</span>
      </p>
      <div className="space-x-4">
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg hover:bg-gray-100"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/register")}
          className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg hover:bg-gray-100"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default HomePage;