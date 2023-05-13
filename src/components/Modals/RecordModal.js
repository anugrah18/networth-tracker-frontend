import React, { useEffect, useState } from "react";
import "./Modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

import { useFormik, Form } from "formik";
import * as Yup from "yup";

export default function RecordModal(props) {
  const heading = props.content.heading;
  const buttonText = props.content.buttonText;
  const itemTypes = props.content.itemTypes;
  const [displayModal, setDisplayModal] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      itemValue: "",
      itemDescription: "",
      itemDate: null,
      itemCategory: null,
    },
    onSubmit: async (values) => {
      try {
        setErrorMessage("");

        const req = {
          recordDate: values.itemDate,
          itemDescription: values.itemDescription,
          itemValue: String(values.itemValue),
          itemTypeId: parseInt(values.itemCategory),
        };

        console.log(req);

        return;
      } catch (error) {
        if (error.response.status === 409) {
          setErrorMessage(`Error : ${error.response.data.message}`);
          return;
        }
        setErrorMessage(
          "Error : Could not add records , please enter all fields and try again."
        );
      }
    },
  });

  const handleCross = () => {
    window.location.reload(true);
  };

  useEffect(() => {
    setDisplayModal(true);
  }, []);

  return (
    <div
      className={`Modal fixed top-0 left-0 items-center justify-center z-10 ${
        !displayModal ? "hidden" : ""
      }`}
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="Dialog w-72 p-6 rounded shadow-lg z-20 bg-white">
          {/* Heading */}
          <div className="text-center">
            <h1 className="text-2xl my-4 font-bold font-sans">{heading}</h1>
          </div>

          {/* Item Value */}
          <label className="text-gray-700 font-bold">Item Value ($)</label>
          <input
            className="w-full py-2 bg-emerald-700 text-white px-1 outline-none mb-4"
            type="number"
            step="0.01"
            name="itemValue"
            placeholder="0.00"
            onChange={formik.handleChange}
          />

          {/* Item Description */}
          <label className="text-gray-700 font-bold">Item Description</label>
          <input
            className="w-full py-2 bg-emerald-700 text-white px-1 outline-none mb-4"
            type="text"
            name="itemDescription"
            onChange={formik.handleChange}
          />

          {/* Item Date */}
          <label className="text-gray-700 font-bold">Date</label>
          <input
            className="w-full py-2 bg-emerald-700 text-white px-1 outline-none mb-4"
            type="date"
            name="itemDate"
            onChange={formik.handleChange}
          />

          {/* Item Category */}
          <label className="text-gray-700 font-bold">Category</label>
          {itemTypes && itemTypes.length > 0 ? (
            <select
              name="itemCategory"
              id="itemCategory"
              className="bg-emerald-700  border border-gray-300 text-white text-lg  rounded-lg block w-full p-2.5 px-1 py-2 focus-none outline-none"
              onChange={formik.handleChange}
            >
              <option value={undefined} key={"undefined"}>
                None
              </option>
              {itemTypes.map((itemType) => (
                <option
                  value={parseInt(itemType.itemTypeId)}
                  key={itemType.itemTypeId}
                >
                  {itemType.itemCategory}
                </option>
              ))}
            </select>
          ) : (
            <span></span>
          )}

          {/* Action Button */}
          <div className="text-center ">
            <button
              className="font-bold mt-5 bg-green-600 w-full text-white rounded hover:bg-lime-500 hover:text-gray-800 py-2"
              //   onClick={handleClick}
              type="submit"
            >
              <FontAwesomeIcon
                icon={faPlusCircle}
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
