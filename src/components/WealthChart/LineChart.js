import React from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

export default function LineChart(props) {
  const { recordData } = props;
  const calculateNetworth = (asset, cash, liability) => {
    const netWorth = (asset + cash - liability).toFixed(2);
    return netWorth;
  };

  return (
    <>
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
    </>
  );
}
