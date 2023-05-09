import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  API_DOMAIN_URL,
  API_GET_ALL_RECORDS,
} from "../../utility/backendAPILinks";
import { getAccessTokenFromBrowser } from "../../utility/helpers";
import Pagination from "../Paginate/Pagination";

export default function RecordList() {
  const [recordData, setRecordData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const getRecords = async (access_token) => {
    if (access_token !== null) {
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };

      //http calls for getting records
      try {
        const { data } = await axios.get(
          `${API_DOMAIN_URL}/${API_GET_ALL_RECORDS}`,
          config
        );
        return data;
      } catch (error) {
        console.log(error);
        return;
      }
    }
  };

  const updateRecords = async (access_token) => {
    return await getRecords(access_token);
  };

  useEffect(() => {
    const access_token = getAccessTokenFromBrowser();
    updateRecords(access_token).then(async (records) => {
      await setRecordData(records.reverse());
    });
  }, []);

  //Get current records
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = recordData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  //Change Page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="mt-20 flex flex-col">
      <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        {recordData.length === 0 ? (
          <p className="text-center text-2xl">No records found.</p>
        ) : (
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"></div>
            <table className="min-w-full  text-white ">
              <thead className="text-base text-gray-100 uppercase bg-emerald-600 ">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider "
                  >
                    Record ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium  uppercase tracking-wider"
                  >
                    Record Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium  uppercase tracking-wider"
                  >
                    Item Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider"
                  >
                    Item Value
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium  uppercase tracking-wider"
                  >
                    Item Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium  uppercase tracking-wider"
                  >
                    Edit Record
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium  uppercase tracking-wider"
                  >
                    Delete Record
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((record) => (
                  <tr
                    className=" bg-gray-800 border-gray-700 hover:bg-green-600 hover:text-gray-800 hover:font-bold"
                    key={record.recordId}
                  >
                    <td className={`px-6 py-1 `}>{record.recordId}</td>
                    <td className={`px-6 py-1 `}>
                      {new Date(record.recordDate).toLocaleDateString()}
                    </td>
                    <td className={`px-6 py-1 `}>{record.itemDescription}</td>
                    <td className={`px-6 py-1 `}>{record.itemValue}</td>
                    <td className={`px-6 py-1 `}>
                      {record?.ItemType?.itemCategory}
                    </td>
                    <td className={`px-6 py-1 text-yellow-600`}>
                      {<FontAwesomeIcon icon={faPenToSquare} />}
                    </td>
                    <td className={`px-6 py-1 text-red-600`}>
                      {<FontAwesomeIcon icon={faTrash} />}
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
        )}
      </div>
    </div>
  );
}
