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
          placeholder="at least 8 characters"
        />

        <div class="flex items-center mr-4">
          <input
            id="remember-me-checkbox"
            type="checkbox"
            value=""
            className="h-4 w-4 accent-lime-500   rounded cursor-pointer"
          />
          <label
            for="remember-me-checkbox"
            className="ml-2 text-sm font-medium text-black"
          >
            Remember me
          </label>
        </div>

        <button
          type="submit"
          className="font-bold mt-5 bg-green-600 w-full text-white rounded hover:bg-lime-500 hover:text-gray-800 py-2"
        >
          Log in
        </button>

        <div className="w-full pt-10 text-center text-green-600 font-bold hover:text-lime-500">
          <a href="/">Forgot Password?</a>
        </div>

        <hr class="w-64 h-0.5 mx-auto my-2 bg-gray-300 border-0 rounded md:my-10 "></hr>

        <p className="w-full mt-10 text-center">Dont have an account?</p>
        <div className="w-full text-center text-green-600 font-bold hover:text-lime-500">
          <a href="/">Sign up</a>
        </div>
      </form>
    </div>
  );
}
