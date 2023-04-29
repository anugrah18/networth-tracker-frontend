import React, { useContext } from "react";

import { UserContext } from "../../../contexts/UserContext";
import NotAuthorized from "../../NotAuthorized/NotAuthorized";

const PrivateRoute = ({ component: Component, ...rest }) => {
  //check if the user is logged in
  //   const  userState  = props.userState;

  const { userState } = useContext(UserContext);

  return userState?.user !== undefined ? (
    <Component {...rest} />
  ) : (
    <NotAuthorized />
  );
};

export default PrivateRoute;
