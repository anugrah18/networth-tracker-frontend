import React from "react";
import "./Login.css";
import logo from "../../../images/bull-green.png";
export default function Login() {
  return (
    <div className="w-96 p-6 rounded shadow-sm z-10 bg-white">
      <form>
        <div className="flex items-center justify-center mb-4">
          <img alt="logo" src={logo} className="h-32"></img>
        </div>
        <label className="text-gray-700 font-bold">Email</label>
        <input
          className="w-full py-2 bg-emerald-700 text-white px-1 outline-none mb-4"
          type="email"
          placeholder="example@email.com"
        />
        <label className="text-gray-700 font-bold">Password</label>
        <input
          className="w-full py-2 bg-emerald-700 text-white px-1 outline-none mb-4"
          type="password"
        />
        <button
          type="submit"
          className="font-bold bg-green-600 w-full text-white rounded hover:bg-lime-500 hover:text-gray-800 py-2"
        >
          Login
        </button>
      </form>
    </div>
  );
}
