import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Pagination from "../Paginate/Pagination";

export default function WealthTable(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(1);
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

  const tableDataReversed = tableData.reverse();

  //Get current records
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = tableDataReversed.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  //Change Page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="m-auto p-5">
      <h1 className="text-2xl mb-5 md:text-center">Wealth History Table</h1>
      <table className="w-full text-base text-left text-white">
        <thead className="text-base text-gray-100 uppercase bg-emerald-600 ">
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
            <th scope="col" className="md:px-6 px-10 py-3">
              Net Worth Change (%)
            </th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((row) => (
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

                <FontAwesomeIcon
                  icon={
                    row.netWorthChangePercent >= 0 ? faArrowUp : faArrowDown
                  }
                  className="ml-3"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        itemsPerPage={recordsPerPage}
        totalItems={recordData.length}
        paginate={paginate}
      />
    </div>
  );
}
