import React, { useContext, useState } from "react";
import { RecordContext } from "../../contexts/RecordContext";
import { UserContext } from "../../contexts/UserContext";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import LineChart from "./LineChart";
import WealthTable from "./WealthTable";

export default function WealthChart() {
  const { userState } = useContext(UserContext);
  const { recordState } = useContext(RecordContext);
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

  return (
    <div className="mt-10 Portfolio grid h-screen w-screen place-items-center">
      {/* <LineChart recordData={recordData} /> */}
      <WealthTable recordData={recordData} />
    </div>
  );
}
