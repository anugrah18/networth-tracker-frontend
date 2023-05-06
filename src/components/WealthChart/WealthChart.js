import React, { useContext, useState } from "react";
import { RecordContext } from "../../contexts/RecordContext";
import { UserContext } from "../../contexts/UserContext";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import LineChart from "./LineChart";
import WealthTable from "./WealthTable";
import ToggleButton from "../ToggleButton/ToggleButton";
import { InflationContext } from "../../contexts/InflationContext";
import { calculateNetworth, monthMapping } from "../../utility/helpers";

export default function WealthChart() {
  const [displayTable, setDisplayTable] = useState(false);
  const { userState } = useContext(UserContext);
  const { recordState } = useContext(RecordContext);
  const { inflationState } = useContext(InflationContext);
  const recordData = [];
  const inflationFiltered = [];

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

  if (inflationState !== [] && recordData !== []) {
    const inflationData = inflationState;
    const inflationDataReversed = inflationData.reverse();
    let recordDateMapping = {};
    for (let i = 0; i < recordData.length; i++) {
      recordDateMapping[recordData[i].date] = parseFloat(
        calculateNetworth(
          recordData[i].asset,
          recordData[i].cash,
          recordData[i].liability
        )
      );
    }

    //Filter inflation Data based on month and year of records.
    for (let i = 0; i < inflationDataReversed.length; i++) {
      let inflationMonth = inflationDataReversed[i].month;
      let inflationYear = inflationDataReversed[i].year;
      let inflationMonthYear =
        monthMapping[inflationMonth] + "_" + inflationYear;

      if (recordDateMapping[inflationMonthYear] !== undefined) {
        inflationFiltered.push({
          inflationMonthYear,
          inflationValue: parseFloat(inflationDataReversed[i].value),
        });
      }
    }

    //Adjusting the inflation.
    if (inflationFiltered !== []) {
      const inflationDenominator = inflationFiltered[0]?.inflationValue;
      const netWorthMultiplier =
        recordDateMapping[inflationFiltered[0]?.inflationMonthYear];
      for (let i = 0; i < inflationFiltered.length; i++) {
        inflationFiltered[i].inflationValue = (
          (inflationFiltered[i].inflationValue / inflationDenominator) *
          netWorthMultiplier
        ).toFixed(2);
      }
    }
  }
  return (
    <div className="mt-10 Portfolio grid h-screen w-screen place-items-center">
      <ToggleButton
        displayText="Show Table"
        toggleButtonHandler={toggleButtonHandler}
      />
      {displayTable ? (
        <WealthTable recordData={recordData} />
      ) : (
        <LineChart
          recordData={recordData}
          inflationFiltered={inflationFiltered}
        />
      )}
    </div>
  );
}
