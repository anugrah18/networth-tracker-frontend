import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PortfolioInfoCard(props) {
  const textColor =
    props.type === "positive" && props.value > 0
      ? "text-green-500"
      : "text-red-500";

  const valToCurrency = props.value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="block max-w-sm p-6 bg-white  rounded-lg shadow-xl hover:shadow-2xl m-5">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-600 ">
        {props.heading}
      </h5>
      <p className={`font-bold ${textColor} p-10 mx-10 text-xl`}>
        {props.value > 0}${valToCurrency}
      </p>
      <FontAwesomeIcon icon={props.icon} className="text-gray-500" />
    </div>
  );
}
