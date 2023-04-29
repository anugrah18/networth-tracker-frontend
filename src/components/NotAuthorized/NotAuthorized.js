import React from "react";
import Locked from "../../images/locked.png";

export default function NotAuthorized() {
  return (
    <div className="flex flex-col  place-items-center my-28">
      <div>
        <img src={Locked} alt="locked" className="h-48 w-48 " />
      </div>
      <h1 className="text-4xl text-center">Access Denied</h1>
      <p className="text-lg m-5 text-center">
        You do not have permissions to view this page.
      </p>
    </div>
  );
}
