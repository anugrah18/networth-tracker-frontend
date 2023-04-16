import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

import "./Homepage.css";
import Login from "./Login/Login";
import Porfolio from "./Portfolio/Porfolio";

export default function Homepage() {
  const { userState } = useContext(UserContext);
  return (
    <div className="Homepage flex items-center justify-center h-screen">
      {userState?.user == null ? <Login></Login> : <Porfolio></Porfolio>}
    </div>
  );
}
