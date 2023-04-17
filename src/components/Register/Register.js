import React, { useState } from "react";
import "./Register.css";
import logo from "../../images/bull-green.png";
import {
  API_DOMAIN_URL,
  API_REGISTER_USER_URL,
} from "../../utility/backendAPILinks";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import SingleActionModal from "../Modals/SingleActionModal";

export default function Register() {
  const [errorMessage, setErrorMessage] = useState("");
  const [modalDisplay, setModalDisplay] = useState(false);
  const [modelData, setModelaData] = useState({});
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      try {
        setErrorMessage("");

        const req = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        };

        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const res = await axios.post(
          `${API_DOMAIN_URL}/${API_REGISTER_USER_URL}`,
          req,
          config
        );

        if (res.status === 200) {
          setModelaData({
            heading: "Successfully Registered",
            subHeading: `Successfully registered user profile with email : ${req.email}`,
            buttonText: "Back to login",
            buttonLink: "/",
          });
          setModalDisplay(true);

          return;
        }
      } catch (error) {
        if (error.response.status === 409) {
          setErrorMessage(`Error : ${error.response.data.message}`);
          return;
        }
        setErrorMessage(
          "Error : Could not register , please enter all fields and try again."
        );
      }
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is required")
        .email("Invalid email address"),
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password needs to be atleast 8 characters"),
      confirmPassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf(
          [Yup.ref("password"), null],
          "Confirm Password must match Password"
        ),
    }),
  });

  return (
    <div className="Register flex items-center justify-center">
      <div className="w-96 p-6 rounded shadow-sm z-10 bg-white">
        {errorMessage !== "" && (
          <p className="text-red-500 font-bold">{errorMessage}</p>
        )}
        <form onSubmit={formik.handleSubmit}>
          {/* Logo */}
          <div className="flex items-center justify-center mb-4">
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

          {/* First name*/}
          <label className="text-gray-700 font-bold">First Name</label>
          <input
            className="w-full py-2 bg-emerald-700 text-white px-1 outline-none mb-4"
            type="text"
            name="firstName"
            placeholder="first name"
            onChange={formik.handleChange}
            value={formik.values.firstName}
            onBlur={formik.handleBlur}
          />
          {/* First Name Error */}
          <div className="error text-red-500 font-bold">
            {formik.errors.firstName &&
              formik.touched.firstName &&
              formik.errors.firstName}
          </div>

          {/* Last name*/}
          <label className="text-gray-700 font-bold">Last Name</label>
          <input
            className="w-full py-2 bg-emerald-700 text-white px-1 outline-none mb-4"
            type="text"
            name="lastName"
            placeholder="last name"
            onChange={formik.handleChange}
            value={formik.values.lastName}
            onBlur={formik.handleBlur}
          />
          {/* Last Name Error */}
          <div className="error text-red-500 font-bold">
            {formik.errors.lastName &&
              formik.touched.lastName &&
              formik.errors.lastName}
          </div>

          {/* Password */}
          <label className="text-gray-700 font-bold">Password</label>
          <input
            className="w-full py-2 bg-emerald-700 text-white px-1 outline-none mb-4"
            type="password"
            name="password"
            placeholder="at least 8 characters"
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

          {/* Confirm Password */}
          <label className="text-gray-700 font-bold">Confirm Password</label>
          <input
            className="w-full py-2 bg-emerald-700 text-white px-1 outline-none mb-4"
            type="password"
            name="confirmPassword"
            placeholder="at least 8 characters"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            onBlur={formik.handleBlur}
          />

          {/* Password Error */}
          <div className="error text-red-500 font-bold">
            {formik.errors.confirmPassword &&
              formik.touched.confirmPassword &&
              formik.errors.confirmPassword}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="font-bold mt-5 bg-green-600 w-full text-white rounded hover:bg-lime-500 hover:text-gray-800 py-2"
          >
            Sign up
          </button>

          <hr className="w-64 h-0.5 mx-auto my-10 bg-gray-300 border-0 rounded md:my-10 "></hr>

          <p className="w-full mt-10 text-center">Already have an account?</p>
          {/* Login */}
          <div className="w-full text-center text-green-600 font-bold hover:text-lime-500">
            <a href="/">Log in</a>
          </div>
        </form>
      </div>
      {modalDisplay && <SingleActionModal content={modelData} />}
    </div>
  );
}
