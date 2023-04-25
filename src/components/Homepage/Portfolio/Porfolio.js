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

export default function Porfolio() {
  const { userState } = useContext(UserContext);
  const { recordState, setRecordState } = useContext(RecordContext);
  const [recordClean, setRecordClean] = useState([]);

  const final_data = [];

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

          setRecordClean(record_data_clean);
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
  recordClean.forEach(function (value, key, map) {
    let row = {
      date: key,
      cash: value.cash,
      asset: value.asset,
      liability: value.liability,
    };
    final_data.push(row);
  });

  return (
    <div className="Portfolio grid h-screen place-items-center">
      <h1 className="text-4xl">
        Hi,{" "}
        <span className="text-emerald-500">{userState?.user?.firstName} </span>
        {final_data.map((x) => (
          <p className="text-2xl">
            {x.date} , Cash {x.cash}
          </p>
        ))}
      </h1>
    </div>
  );
}
