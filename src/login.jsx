import React from "react";
import Logo from "./assets/logo.png";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-sm text-center">
        <div className="mb-4 flex flex-col items-center justify-center">
          <img src={Logo} alt="PLN Icon Plus" className="w-40" />
          <h1 className="text-2xl font-bold text-gray-800">ONT Management</h1>
        </div>

        <hr className="w-full bg-black mx-auto mb-2" />

        <h2 className="text-xl font-bold mb-6">Login</h2>

        <form>
          <div className="mb-4 text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />
          </div>
          <div className="mb-4 text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded transition duration-200"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
