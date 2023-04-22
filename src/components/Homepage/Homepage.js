import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import "./Homepage.css";
import Login from "./Login/Login";

export default function Homepage() {
  const { userState } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <div className="Homepage flex items-center justify-center h-screen">
      {userState?.user == null ? <Login></Login> : navigate("/portfolio")}
    </div>
  );
}
