import React, { useContext } from "react";
import { Navigate } from "react-router";
import { UserContext } from "../../../contexts/UserContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  //check if the user is logged in
  const { userState } = useContext(UserContext);
  
  return userState?.user != null ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;
