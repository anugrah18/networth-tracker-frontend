import React, { useState } from "react";
import "./ForgotPassword.css";
import logo from "../../images/bull-green.png";
import { useParams } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  API_DOMAIN_URL,
  API_RESET_PASSWORD,
} from "../../utility/backendAPILinks";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import SingleActionModal from "../Modals/SingleActionModal";

export default function ResetPassword() {
  const [errorMessage, setErrorMessage] = useState("");
  const [modalDisplay, setModalDisplay] = useState(false);
  const [modelData, setModelaData] = useState({});

  const token = useParams().token;
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      try {
        setErrorMessage("");
        const req = {
          newPassword: values.password,
        };
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const res = await axios.post(
          `${API_DOMAIN_URL}/${API_RESET_PASSWORD}`,
          req,
          config
        );

        if (res.status === 200) {
          setModelaData({
            heading: "Password updated",
            subHeading: `${res.data.message}`,
            buttonText: "Login with new password",
            buttonLink: "/",
          });
          setModalDisplay(true);
          return;
        }

        console.log(res.data.message);
      } catch (error) {
        setErrorMessage(`Error : ${error.response.data.message}`);
        return;
      }
    },
    validationSchema: Yup.object({
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
    <div className="ForgotPassword flex items-center justify-center">
      <div className="w-96 p-6 rounded shadow-sm z-10 bg-white">
        {errorMessage !== "" && (
          <p className="text-red-500 font-bold">{errorMessage}</p>
        )}
        <form onSubmit={formik.handleSubmit}>
          {/* Logo */}
          <div className="flex items-center justify-center mb-4">
            <img alt="logo" src={logo} className="h-24"></img>
          </div>
          {/* Password */}
          <label className="text-gray-700 font-bold">New Password</label>
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
          <label className="text-gray-700 font-bold">
            Confirm New Password
          </label>
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
            Reset Password
          </button>

          {/* Back to  Login */}
          <div className="py-3 w-full text-center text-green-600 font-bold hover:text-lime-500">
            <a href="/">
              {" "}
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="pr-2"
              ></FontAwesomeIcon>
              Back to login{" "}
            </a>
          </div>
        </form>
      </div>
      {modalDisplay && <SingleActionModal content={modelData} />}
    </div>
  );
}
