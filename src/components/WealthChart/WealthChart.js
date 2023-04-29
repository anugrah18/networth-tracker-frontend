import React, { useContext } from "react";
import { RecordContext } from "../../contexts/RecordContext";
import { UserContext } from "../../contexts/UserContext";

export default function WealthChart() {
  console.log("wealth chart");
  const { userState } = useContext(UserContext);
  const {recordState } = useContext(RecordContext)
  console.log(recordState)
  return <div>WealthChart</div>;
}
