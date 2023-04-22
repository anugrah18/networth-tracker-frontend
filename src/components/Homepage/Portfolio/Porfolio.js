import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../../contexts/UserContext";
import "./Porfolio.css";
export default function Porfolio() {
  const { userState } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (userState.user === undefined) {
      navigate("/");
    }
  }, [userState]);
  return (
    <div className="Portfolio grid h-screen place-items-center">
      <h1 className="text-4xl">
        Hi,{" "}
        <span className="text-emerald-500">{userState?.user?.firstName}</span>
      </h1>
    </div>
  );
}
