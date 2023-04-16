import React, { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import "./Porfolio.css";
export default function Porfolio() {
  const { userState } = useContext(UserContext);

  return (
    <div className="Portfolio grid h-screen place-items-center">
      <h1 className="text-4xl">
        Hi,{" "}
        <span className="text-emerald-500">{userState?.user?.firstName}</span>
      </h1>
    </div>
  );
}
