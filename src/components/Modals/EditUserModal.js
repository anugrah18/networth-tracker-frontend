import React, { useEffect, useState } from "react";
import "./Modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

import { useFormik, Form } from "formik";
import * as Yup from "yup";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { getAccessTokenFromBrowser } from "../../utility/helpers";
import axios from "axios";
import { API_DOMAIN_URL, API_EDIT_USER } from "../../utility/backendAPILinks";

export default function EditUserModal(props) {
  const heading = props.content.heading;
  const buttonText = props.content.buttonText;
  const userDetails = props.userDetails;
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
    },
    onSubmit: async (values) => {
      try {
        setErrorMessage("");

        const req = {
          firstName: values.firstName,
          lastName: values.lastName,
        };

        const access_token = getAccessTokenFromBrowser();

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        };

        const resp = await axios.put(
          `${API_DOMAIN_URL}/${API_EDIT_USER}/${props.content.userId}`,
          req,
          config
        );

        if (resp.status === 200) {
          window.location.reload(true);
          return;
        } else {
          setErrorMessage(
            "Cannot edit user info, please check all fields and try again."
          );
        }
      } catch (error) {
        if (error?.response?.status === 409) {
          setErrorMessage(`Error : ${error.response.data.message}`);
          return;
        }
        setErrorMessage(
          "Error : Could not edit user info , please enter all fields and try again."
        );
      }
    },

    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
    }),
  });

  const handleCross = () => {
    // window.location.reload(true);
    props.modalDisplayToggle(false);
  };

  return (
    <div
      className="Modal fixed top-0 left-0 items-center justify-center z-10 
      "
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="Dialog w-72 p-6 rounded shadow-lg z-20 bg-white">
          {/* Heading */}

          <div className="text-center">
            <h1 className="text-2xl my-4 font-bold font-sans">{heading}</h1>
          </div>
          {errorMessage !== "" && (
            <p className="text-red-500 font-bold">{errorMessage}</p>
          )}

          {/* First Name */}
          <label className="text-gray-700 font-bold">
            First Name{" "}
            <span className="text-sm">
              <i> (Current : {userDetails?.firstName} )</i>
            </span>{" "}
          </label>
          <input
            className="w-full py-2 bg-emerald-700 text-white px-1 outline-none mb-2 text-sm"
            type="text"
            name="firstName"
            onChange={formik.handleChange}
          />
          {/* First Name  Error */}
          <div className="error text-red-500 font-bold">
            {formik.errors.firstName &&
              formik.touched.firstName &&
              formik.errors.firstName}
          </div>

          {/* Last Name */}
          <label className="text-gray-700 font-bold">
            Last Name{" "}
            <span className="text-sm">
              <i> (Current : {userDetails?.lastName} )</i>
            </span>{" "}
          </label>
          <input
            className="w-full py-2 bg-emerald-700 text-white px-1 outline-none mb-2 text-sm"
            type="text"
            name="lastName"
            onChange={formik.handleChange}
          />
          {/* Last Name  Error */}
          <div className="error text-red-500 font-bold">
            {formik.errors.lastName &&
              formik.touched.lastName &&
              formik.errors.lastName}
          </div>

          {/* Action Button */}
          <div className="text-center ">
            <button
              className="font-bold mt-5 bg-yellow-600 w-full text-white rounded hover:bg-yellow-500 hover:text-gray-800 py-2"
              //   onClick={handleClick}
              type="submit"
            >
              <FontAwesomeIcon
                icon={faPencil}
                className="mr-1"
              ></FontAwesomeIcon>
              {buttonText}
            </button>
          </div>

          {/* Close Button */}
          <div className="text-center ">
            <button
              className="font-bold mt-5 bg-green-600 w-full text-white rounded hover:bg-lime-500 hover:text-gray-800 py-2"
              onClick={handleCross}
            >
              <FontAwesomeIcon
                icon={faXmarkCircle}
                className="mr-1"
              ></FontAwesomeIcon>
              Close
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
