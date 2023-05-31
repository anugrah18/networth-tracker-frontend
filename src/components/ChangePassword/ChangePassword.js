import React, { useState, useEffect, useContext } from "react";
import "./ChangePassword.css";
import logo from "../../images/bull-green.png";
import {
  API_DOMAIN_URL,
  API_RESET_PASSWORD,
} from "../../utility/backendAPILinks";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import SingleActionModal from "../Modals/SingleActionModal";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { getAccessTokenFromBrowser } from "../../utility/helpers";
import { UserContext } from "../../contexts/UserContext";

export default function ChangePassword() {
  const { userState } = useContext(UserContext);
  const access_token = getAccessTokenFromBrowser();
  const [errorMessage, setErrorMessage] = useState("");
  const [modalDisplay, setModalDisplay] = useState(false);
  const [modelData, setModelaData] = useState({});
  const [loading, setLoading] = useState(true);
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
            Authorization: `Bearer ${access_token}`,
          },
        };

        setLoading(true);
        const res = await axios.post(
          `${API_DOMAIN_URL}/${API_RESET_PASSWORD}`,
          req,
          config
        );
        setLoading(false);

        if (res.status === 200) {
          setModelaData({
            heading: "Successfully Changed Password",
            subHeading: `Successfully changed password for user profile with email : ${userState?.user?.email}`,
            buttonText: "Logout",
            buttonLink: "/logout",
          });
          setModalDisplay(true);

          return;
        }
      } catch (error) {
        setLoading(false);
        if (error.response.status === 409) {
          setErrorMessage(`Error : ${error.response.data.message}`);
          return;
        }
        setErrorMessage(
          "Error : Could not change password , please enter all fields and try again."
        );
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

  useEffect(() => {
    setLoading(false);
  }, []);

  return loading ? (
    <div className="grid h-screen place-items-center">
      <LoadingSpinner />
    </div>
  ) : (
    <div className="Register flex items-center justify-center mt-10">
      <div className="w-96 p-6 rounded shadow-sm z-10 bg-white">
        {errorMessage !== "" && (
          <p className="text-red-500 font-bold">{errorMessage}</p>
        )}
        <form onSubmit={formik.handleSubmit}>
          {/* Logo */}
          <div className="flex items-center justify-center mb-4">
            <img alt="logo" src={logo} className="h-32"></img>
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
            Update password
          </button>

          <hr className="w-64 h-0.5 mx-auto my-10 bg-gray-300 border-0 rounded md:my-10 "></hr>
        </form>
      </div>
      {modalDisplay && <SingleActionModal content={modelData} />}
    </div>
  );
}
