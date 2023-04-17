import React, { useState } from "react";
import "./ForgotPassword.css";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import logo from "../../images/bull-green.png";
import {
  API_DOMAIN_URL,
  API_FORGOT_PASSWORD,
} from "../../utility/backendAPILinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import SingleActionModal from "../Modals/SingleActionModal";

export default function ForgotPassword() {
  const [errorMessage, setErrorMessage] = useState("");
  const [modalDisplay, setModalDisplay] = useState(false);
  const [modelData, setModelaData] = useState({});
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      try {
        setErrorMessage("");
        const req = {
          email: values.email,
        };

        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const res = await axios.post(
          `${API_DOMAIN_URL}/${API_FORGOT_PASSWORD}`,
          req,
          config
        );

        if (res.status === 200) {
          setModelaData({
            heading: "Email Sent",
            subHeading: `Sent password reset link to : ${req.email}  , please check your email`,
            buttonText: "Back",
            buttonLink: "/",
          });
          setModalDisplay(true);
          return;
        }
        console.log(res.data.message);
      } catch (error) {
        if (error.response.status === 404) {
          setErrorMessage(`Error : ${error.response.data.message}`);
          return;
        }

        console.log(error);

        setErrorMessage(
          "Error : Could not send email, please enter all fields and try again."
        );
      }
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is required")
        .email("Invalid email address"),
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
          {/* Email */}
          <label className="text-gray-700 font-bold">Email</label>
          <input
            className="w-full py-2 bg-emerald-700 text-white px-1 outline-none mb-4"
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          {/* Email Error */}
          <div className="error text-red-500 font-bold">
            {formik.errors.email && formik.touched.email && formik.errors.email}
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
