import React from "react";

import "./Homepage.css";
import Login from "./Login/Login";

export default function Homepage() {
  return (
    <div className="Homepage flex items-center justify-center h-screen">
      <Login></Login>
    </div>
  );
}
