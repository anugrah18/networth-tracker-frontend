import React from "react";
import "./Modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

export default function SingleActionModal(props) {
  const heading = props.content.heading;
  const subHeading = props.content.subHeading;
  const buttonText = props.content.buttonText;

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(props.content.buttonLink);
  };

  return (
    <div className="Modal fixed top-0 left-0 items-center justify-center z-10">
      <div className="Dialog w-72 p-6 rounded shadow-lg z-20 bg-white">
        {/* Accepted */}
        <div className="text-green-600 text-center">
          <FontAwesomeIcon
            icon={faCircleCheck}
            className="pr-2 font-size text-6xl"
          ></FontAwesomeIcon>
        </div>

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-2xl my-4 font-bold font-sans">{heading}</h1>
        </div>

        {/* Sub Heading */}
        <div className="text-center">
          <h1 className="text-lg my-2 font-sans text-gray-500">{subHeading}</h1>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <button
            className="font-bold mt-5 bg-green-600 w-full text-white rounded hover:bg-lime-500 hover:text-gray-800 py-2"
            onClick={handleClick}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
