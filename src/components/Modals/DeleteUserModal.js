import React, { useEffect, useState } from "react";
import "./Modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

import { useFormik, Form } from "formik";
import * as Yup from "yup";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { getAccessTokenFromBrowser } from "../../utility/helpers";
import axios from "axios";
import { API_DELETE_USER, API_DOMAIN_URL } from "../../utility/backendAPILinks";

export default function DeleteUserModal(props) {
  const heading = props.content.heading;
  const buttonText = props.content.buttonText;
  const userId = props.content.userId;
  const [errorMessage, setErrorMessage] = useState("");

  const deleteUserHandler = async () => {
    try {
      setErrorMessage("");

      const access_token = getAccessTokenFromBrowser();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      };

      const resp = await axios.delete(
        `${API_DOMAIN_URL}/${API_DELETE_USER}/${userId}`,
        config
      );

      if (resp.status === 200) {
        window.location.reload(true);
        return;
      } else {
        setErrorMessage("Cannot delete user , please try again.");
      }
    } catch (error) {
      if (error?.response?.status === 409) {
        setErrorMessage(`Error : ${error.response.data.message}`);
        return;
      }
      setErrorMessage("Error : Could not delete user , please try again.");
    }
  };

  const handleCross = () => {
    // window.location.reload(true);
    props.modalDisplayToggle(false);
  };

  return (
    <div
      className="Modal fixed top-0 left-0 items-center justify-center z-10 
      "
    >
      <div className="Dialog w-72 p-6 rounded shadow-lg z-20 bg-white">
        {/* Heading */}

        <div className="text-center">
          <h1 className="text-2xl my-4 font-bold font-sans">{heading}</h1>
        </div>
        {errorMessage !== "" && (
          <p className="text-red-500 font-bold">{errorMessage}</p>
        )}

        <p className="text-2xl my-10">
          {" "}
          Are you sure you want to delete this User ?
        </p>

        {/* Action Button */}
        <div className="text-center ">
          <button
            className="font-bold mt-5 bg-red-600 w-full text-white rounded hover:bg-red-500 hover:text-gray-800 py-2"
            onClick={deleteUserHandler}
          >
            <FontAwesomeIcon icon={faTrash} className="mr-1"></FontAwesomeIcon>
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
    </div>
  );
}
