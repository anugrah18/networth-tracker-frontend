import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { RecordContext } from "../../../contexts/RecordContext";
import { UserContext } from "../../../contexts/UserContext";
import { getAccessTokenFromBrowser } from "../../../utility/helpers";
import { recordsParser } from "../../../utility/recordsUtils";
import "./Porfolio.css";
import axios from "axios";
import {
  API_DOMAIN_URL,
  API_GET_ALL_RECORDS,
} from "../../../utility/backendAPILinks";
import PortfolioInfoCard from "./PortfolioInfoCard/PortfolioInfoCard";
import EmptyBox from "../../../images/EmptyBox.png";

import {
  faHouse,
  faBuildingColumns,
  faSackDollar,
  faThumbsDown,
} from "@fortawesome/free-solid-svg-icons";

export default function Porfolio() {
  const { userState } = useContext(UserContext);
  const { recordState, setRecordState } = useContext(RecordContext);
  const [recordLocalClean, setRecordLocalClean] = useState([]);

  const recordData = [];

  const navigate = useNavigate();

  const updateRecordState = async (access_token) => {
    if (access_token !== null) {
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };

      //http calls for getting records data
      try {
        const { data: recordsData } = await axios.get(
          `${API_DOMAIN_URL}/${API_GET_ALL_RECORDS}`,
          config
        );

        if (recordsData?.data !== null) {
          //Parse records into clean structured format.
          const record_data_clean = recordsParser(recordsData);

          setRecordLocalClean(record_data_clean);
          setRecordState(record_data_clean);
        }
      } catch (error) {
        return;
      }
    }
  };

  useEffect(() => {
    if (userState.user === undefined) {
      navigate("/");
    }

    const access_token = getAccessTokenFromBrowser();
    updateRecordState(access_token);
  }, []);

  //create array of objects for rendering.
  recordLocalClean.forEach(function (value, key, map) {
    let row = {
      date: key,
      cash: value.cash,
      asset: value.asset,
      liability: value.liability,
    };
    recordData.push(row);
  });

  //Get latest record data from parsed records.
  const getLatestRecordRow = (recordData) => {
    const numberOfRows = recordData.length;
    return recordData[numberOfRows - 1];
  };

  const latestRecord = getLatestRecordRow(recordData);
  const networthValue =
    latestRecord?.asset + latestRecord?.cash - latestRecord?.liability;

  return (
    <div className="mt-10 Portfolio grid h-screen w-screen place-items-center">
      <h1 className="lg:text-3xl text-2xl mt-10">
        Welcome back,{" "}
        <span className="text-emerald-500">{userState?.user?.firstName} </span>
      </h1>

      {/* <p className="md:p-5 px-5 py-3 md:py-0 md:text-xl text-lg">
        {recordData.length > 0
          ? "Here is your portfolio summary based on the records."
          : "You don't have any" +
            (
              <a className="text-emerald-500" href="/records">
                records
              </a>
            ) +
            "currently."}{" "}
      </p> */}

      {recordData.length > 0 && (
        <p className="md:p-5 px-5 py-3 md:py-0 md:text-xl text-lg">
          Here is your portfolio summary based on the records.
        </p>
      )}

      {recordData.length === 0 && (
        <p className="md:p-5 px-5 py-3 md:py-0 md:text-xl text-lg">
          You don't have any{" "}
          <span className="text-emerald-500 hover:text-green-400">
            <a href="/records">records</a>
          </span>{" "}
          currently.
        </p>
      )}

      {recordData.length == 0 ? (
        <div className="h-60 w-60 md:mb-52 mb-5">
          <img src={EmptyBox}></img>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center md:mb-10">
          <PortfolioInfoCard
            heading="Total Net Worth"
            value={networthValue}
            icon={faBuildingColumns}
            type={"positive"}
          />
          <PortfolioInfoCard
            heading="Investable Assets"
            value={latestRecord?.asset}
            icon={faHouse}
            type={"positive"}
          />
          <PortfolioInfoCard
            heading="Total Cash"
            value={latestRecord?.cash}
            icon={faSackDollar}
            type={"positive"}
          />
          <PortfolioInfoCard
            heading="Liabilities"
            value={latestRecord?.liability}
            icon={faThumbsDown}
            type={"negative"}
          />
        </div>
      )}
    </div>
  );
}
