import React, { useState } from "react";
import "./Register.css";
import logo from "../../images/bull-green.png";
import { API_DOMAIN_URL, API_LOGIN_URL } from "../../utility/backendAPILinks";
import axios from "axios";

export default function Register() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const emailChangeHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  const firstNameChangeHandler = (e) => {
    setEnteredFirstName(e.target.value);
  };

  const lastNameChangeHandler = (e) => {
    setEnteredLastName(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setEnteredPassword(e.target.value);
  };

  const confirmedPasswordChangeHandler = (e) => {
    setEnteredConfirmPassword(e.target.value);
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      if (enteredConfirmPassword !== enteredPassword) {
        setError(true);
        setErrorMessage(
          "Password and Confirm Password dont match, Please try again."
        );
        setEnteredConfirmPassword("");
        setEnteredPassword("");
        return;
      } else {
        setError(false);
        setErrorMessage("");
      }

      const req = {
        firstName: enteredFirstName,
        lastName: enteredLastName,
        email: enteredEmail,
        password: enteredPassword,
      };

      console.log(req);

      setError(false);
      setErrorMessage("");

      setEnteredFirstName("");
      setEnteredLastName("");
      setEnteredEmail("");
      setEnteredPassword("");
      setEnteredConfirmPassword("");
    } catch (error) {
      setError(true);
      setErrorMessage(
        "Error : Could not register , please enter all field and try again."
      );
    }
  };

  return (
    <div className="Register flex items-center justify-center">
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

          {/* First name*/}
          <label className="text-gray-700 font-bold">First Name</label>
          <input
            className="w-full py-2 bg-emerald-700 text-white px-1 outline-none mb-4"
            type="text"
            placeholder="first name"
            onChange={firstNameChangeHandler}
            value={enteredFirstName}
          />

          {/* Last name*/}
          <label className="text-gray-700 font-bold">Last Name</label>
          <input
            className="w-full py-2 bg-emerald-700 text-white px-1 outline-none mb-4"
            type="text"
            placeholder="last name"
            onChange={lastNameChangeHandler}
            value={enteredLastName}
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

          {/* Confirm Password */}
          <label className="text-gray-700 font-bold">Confirm Password</label>
          <input
            className="w-full py-2 bg-emerald-700 text-white px-1 outline-none mb-4"
            type="password"
            placeholder="at least 8 characters"
            onChange={confirmedPasswordChangeHandler}
            value={enteredConfirmPassword}
          />

          {/* Submit */}
          <button
            type="submit"
            className="font-bold mt-5 bg-green-600 w-full text-white rounded hover:bg-lime-500 hover:text-gray-800 py-2"
            onClick={submitHandler}
          >
            Sign up
          </button>

          {/* Forgot Password */}
          {/* <div className="w-full pt-10 text-center text-green-600 font-bold hover:text-lime-500">
          <a href="/">Forgot Password?</a>
        </div> */}

          <hr className="w-64 h-0.5 mx-auto my-10 bg-gray-300 border-0 rounded md:my-10 "></hr>

          <p className="w-full mt-10 text-center">Already have an account?</p>
          {/* Login */}
          <div className="w-full text-center text-green-600 font-bold hover:text-lime-500">
            <a href="/">Log in</a>
          </div>
        </form>
      </div>
    </div>
  );
}
