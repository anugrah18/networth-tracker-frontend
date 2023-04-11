import React, { useState } from "react";
import "./Login.css";
import logo from "../../../images/bull-green.png";
import {
  API_DOMAIN_URL,
  API_LOGIN_URL,
} from "../../../utility/backendAPILinks";
import axios from "axios";
export default function Login() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [isLoginPersistent, setIsLoginPersistent] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const emailChangeHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setEnteredPassword(e.target.value);
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      const req = {
        email: enteredEmail,
        password: enteredPassword,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post(
        `${API_DOMAIN_URL}/${API_LOGIN_URL}`,
        req,
        config
      );
      console.log(res.data);
      setError(false);
      setErrorMessage("");
    } catch (error) {
      setError(true);
      setErrorMessage(error.response.data.message);
    } finally {
      setEnteredEmail("");
      setEnteredPassword("");
    }
  };

  return (
    <div className="w-96 p-6 rounded shadow-sm z-10 bg-white">
      {error && <p className="text-red-500 font-bold">{errorMessage}</p>}
      <form>
        {/* Logo */}
        <div className="flex items-center justify-center mb-4">
          <img alt="logo" src={logo} className="h-32"></img>
        </div>
        {/* Email */}
        <label className="text-gray-700 font-bold">Email</label>
        <input
          className="w-full py-2 bg-emerald-700 text-white px-1 outline-none mb-4"
          type="email"
          placeholder="example@email.com"
          onChange={emailChangeHandler}
          value={enteredEmail}
        />
        {/* Password */}
        <label className="text-gray-700 font-bold">Password</label>
        <input
          className="w-full py-2 bg-emerald-700 text-white px-1 outline-none mb-4"
          type="password"
          placeholder="at least 8 characters"
          onChange={passwordChangeHandler}
          value={enteredPassword}
        />
        {/* Checkbox */}
        <div className="flex items-center mr-4">
          <input
            id="remember-me-checkbox"
            type="checkbox"
            value=""
            className="h-4 w-4 accent-lime-500  text-white rounded cursor-pointer"
          />
          <label
            htmlFor="remember-me-checkbox"
            className="ml-2 text-sm font-medium text-black"
          >
            Remember me
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="font-bold mt-5 bg-green-600 w-full text-white rounded hover:bg-lime-500 hover:text-gray-800 py-2"
          onClick={submitHandler}
        >
          Log in
        </button>

        {/* Forgot Password */}
        <div className="w-full pt-10 text-center text-green-600 font-bold hover:text-lime-500">
          <a href="/">Forgot Password?</a>
        </div>

        <hr className="w-64 h-0.5 mx-auto my-2 bg-gray-300 border-0 rounded md:my-10 "></hr>

        <p className="w-full mt-10 text-center">Dont have an account?</p>
        {/* Sign up */}
        <div className="w-full text-center text-green-600 font-bold hover:text-lime-500">
          <a href="/">Sign up</a>
        </div>
      </form>
    </div>
  );
}
