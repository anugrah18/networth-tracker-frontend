import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import logo from "../../../images/bull-green.png";
import {
  API_DOMAIN_URL,
  API_LOGIN_URL,
} from "../../../utility/backendAPILinks";
import axios from "axios";
import { UserContext } from "../../../contexts/UserContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import LoadingSpinner from "../../Loading/LoadingSpinner";

export default function Login() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const req = {
          email: values.email,
          password: values.password,
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
        const access_token = res.data.token;

        const user = {
          userId: res.data.userId,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email,
          isAdmin: res.data.isAdmin,
        };

        setUserState({ user });

        if (isLoginPersistent) {
          localStorage.setItem("networthtracker-access-token", access_token);
          sessionStorage.removeItem("networthtracker-access-token");
        } else {
          localStorage.removeItem("networthtracker-access-token");
          sessionStorage.setItem("networthtracker-access-token", access_token);
        }

        setErrorMessage("");
      } catch (error) {
        setErrorMessage(
          "Error : Could not login , please enter correct credentials and try again."
        );
        sessionStorage.removeItem("networthtracker-access-token");
        localStorage.removeItem("networthtracker-access-token");
      }
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is required")
        .email("Invalid email address"),
      password: Yup.string().required("Password is required"),
    }),
  });

  const [isLoginPersistent, setIsLoginPersistent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const { userState, setUserState } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (userState?.user != null) {
      navigate("/portfolio");
    }
    setLoading(false);
  }, [userState]);

  const persistentLoginHandler = (e) => {
    setIsLoginPersistent(!isLoginPersistent);
  };

  return loading ? (
    <LoadingSpinner />
  ) : (
    <div className="w-96 md:mt-10 mt-20 p-6 rounded shadow-sm z-10 bg-white">
      {errorMessage !== "" && (
        <p className="text-red-500 font-bold">{errorMessage}</p>
      )}
      <form onSubmit={formik.handleSubmit}>
        {/* Logo */}
        <div className="flex items-center justify-center md:mb-4">
          <img alt="logo" src={logo} className="h-32"></img>
        </div>

        {/* Email */}
        <label className="text-gray-700 font-bold">Email</label>
        <input
          className="w-full py-2 bg-emerald-700 text-white px-1 outline-none mb-4"
          type="email"
          name="email"
          placeholder="example@email.com"
          onChange={formik.handleChange}
          value={formik.values.email}
          onBlur={formik.handleBlur}
        />
        {/* Email Error */}
        <div className="error text-red-500 font-bold">
          {formik.errors.email && formik.touched.email && formik.errors.email}
        </div>

        {/* Password */}
        <label className="text-gray-700 font-bold">Password</label>
        <input
          className="w-full py-2 bg-emerald-700 text-white px-1 outline-none mb-4"
          type="password"
          name="password"
          placeholder="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          onBlur={formik.handleBlur}
        />
        {/* Password Error */}
        <div className="error text-red-500 font-bold">
          {formik.errors.password &&
            formik.touched.password &&
            formik.errors.password}
        </div>

        {/* Checkbox */}
        <div className="flex items-center mr-4">
          <input
            id="remember-me-checkbox"
            type="checkbox"
            value=""
            className="h-4 w-4 accent-lime-500  text-white rounded cursor-pointer"
            onChange={persistentLoginHandler}
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
        >
          Log in
        </button>

        {/* Forgot Password */}
        <div className="w-full pt-10 text-center text-green-600 font-bold hover:text-lime-500">
          <a href="/forgot-password">Forgot Password?</a>
        </div>

        <hr className="w-64 h-0.5 mx-auto my-1 bg-gray-300 border-0 rounded md:my-10 "></hr>

        <p className="w-full mt-10 text-center">Dont have an account?</p>
        {/* Sign up */}
        <div className="w-full text-center text-green-600 font-bold hover:text-lime-500">
          <a href="/register">Sign up</a>
        </div>
      </form>
    </div>
  );
}
