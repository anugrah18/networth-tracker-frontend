import React from "react";

export default function WealthTable(props) {
  const { recordData } = props;
  const tableData = [];

  let prevnetWorth = 0.0;
  for (let i = 0; i < recordData.length; i++) {
    let netWorth =
      recordData[i].cash + recordData[i].asset - recordData[i].liability;

    let netWorthChange = i > 0 ? netWorth - prevnetWorth : 0;
    let netWorthChangePercent =
      i > 0 ? (netWorthChange / prevnetWorth) * 100 : 0;

    prevnetWorth = netWorth;

    tableData.push({
      date: recordData[i].date,
      cash: recordData[i].cash,
      asset: recordData[i].asset,
      liability: recordData[i].liability,
      netWorth: netWorth,
      netWorthChange: netWorthChange,
      netWorthChangePercent: netWorthChangePercent,
    });
  }

  console.log(tableData);
  const tableDataReversed = tableData.reverse();

  return (
    <div className="m-auto p-5">
      <table className="w-full text-sm text-left text-white ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Month
            </th>
            <th scope="col" className="px-6 py-3">
              Cash ($)
            </th>
            <th scope="col" className="px-6 py-3">
              Asset ($)
            </th>
            <th scope="col" className="px-6 py-3">
              Liability ($)
            </th>
            <th scope="col" className="px-6 py-3">
              Net Worth ($)
            </th>
            <th scope="col" className="px-6 py-3">
              Net Worth Change ($)
            </th>
            <th scope="col" className="px-6 py-3">
              Net Worth Change (%)
            </th>
          </tr>
        </thead>
        <tbody>
          {tableDataReversed.map((row) => (
            <tr className=" bg-gray-800 border-gray-700" key={row.date}>
              <th
                scope="row"
                className="px-6 py-4 font-medium  whitespace-nowrap text-gray-300"
              >
                {row.date}
              </th>
              <td className={`px-6 py-4 `}>
                {row.cash.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
              <td className={`px-6 py-4 `}>
                {row.asset.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
              <td className={`px-6 py-4 `}>
                {row.liability.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
              <td className={`px-6 py-4 `}>
                {row.netWorth.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
              <td
                className={`px-6 py-4 ${
                  row.netWorthChange >= 0 ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {row.netWorthChange.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
              <td
                className={`px-6 py-4 ${
                  row.netWorthChangePercent >= 0
                    ? "text-emerald-400"
                    : "text-red-400"
                }`}
              >
                {row.netWorthChangePercent.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
