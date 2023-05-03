import React, { useState } from "react";

export default function ToggleButton(props) {
  const { displayText, toggleButtonHandler } = props;
  const [isSelected, setIsSelected] = useState(false);
  const buttonToggler = () => {
    setIsSelected(!isSelected);
    toggleButtonHandler(!isSelected);
  };
  return (
    <div className="flex w-full md:justify-center justify-left md:px-0 px-10 my-10">
      <span className="text-2xl mr-3">{displayText}</span>
      <div
        onClick={buttonToggler}
        className={`flex w-16 h-8 rounded-full transtion-all duration-500 ${
          isSelected ? "bg-emerald-600" : "bg-gray-800"
        }`}
      >
        <span
          className={`h-8 w-8  rounded-full transtion-all duration-500 ${
            isSelected ? "bg-gray-200 ml-8" : "bg-gray-200"
          }`}
        />
      </div>
    </div>
  );
}
