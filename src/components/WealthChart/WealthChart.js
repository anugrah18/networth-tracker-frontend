import React, { useContext, useState } from "react";
import { RecordContext } from "../../contexts/RecordContext";
import { UserContext } from "../../contexts/UserContext";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import LineChart from "./LineChart";
import WealthTable from "./WealthTable";
import ToggleButton from "../ToggleButton/ToggleButton";
import { InflationContext } from "../../contexts/InflationContext";

export default function WealthChart() {
  const [displayTable, setDisplayTable] = useState(false);
  const { userState } = useContext(UserContext);
  const { recordState } = useContext(RecordContext);
  const { inflationState } = useContext(InflationContext);
  const recordData = [];

  //create array of objects for rendering.
  recordState.forEach(function (value, key, map) {
    let row = {
      date: key,
      cash: value.cash,
      asset: value.asset,
      liability: value.liability,
    };
    recordData.push(row);
  });

  const toggleButtonHandler = (status) => {
    setDisplayTable(status);
  };

  console.log(inflationState);
  return (
    <div className="mt-10 Portfolio grid h-screen w-screen place-items-center">
      <ToggleButton
        displayText="Show Table"
        toggleButtonHandler={toggleButtonHandler}
      />
      {displayTable ? (
        <WealthTable recordData={recordData} />
      ) : (
        <LineChart recordData={recordData} />
      )}
    </div>
  );
}
