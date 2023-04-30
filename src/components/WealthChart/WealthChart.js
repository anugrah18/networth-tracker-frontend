import React, { useContext, useState } from "react";
import { RecordContext } from "../../contexts/RecordContext";
import { UserContext } from "../../contexts/UserContext";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

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

  const calculateNetworth = (asset, cash, liability) => {
    const netWorth = (asset + cash - liability).toFixed(2);
    return netWorth;
  };

  return (
    <div className="mt-10 Portfolio grid h-screen w-screen place-items-center">
      {recordData?.length > 0 ? (
        <div className="">
          <Line
            datasetIdKey="id"
            data={{
              labels: recordData.map((data) => {
                return data.date.replace("_", "-");
              }),
              datasets: [
                {
                  id: 1,
                  label: "Net worth",
                  data: recordData.map((data) => {
                    return calculateNetworth(
                      data.asset,
                      data.cash,
                      data.liability
                    );
                  }),
                  borderColor: "rgb(16, 185, 129)",
                  backgroundColor: "rgb(16, 185, 129)",
                  tension: 0.2,
                  yAxisID: "Amount",
                },
              ],
            }}
            height={500}
            width={500}
            options={{ maintainAspectRatio: false }}
          />
        </div>
      ) : (
        <h1 className="lg:text-3xl text-2xl">No wealth records found.</h1>
      )}
    </div>
  );
}
