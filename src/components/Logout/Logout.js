import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";

export default function Logout() {
  useEffect(() => {
    sessionStorage.removeItem("networthtracker-access-token");
    localStorage.removeItem("networthtracker-access-token");
  }, []);
  return (
    <div className="grid h-screen place-items-center">
      <h1 className="text-2xl text-center">
        You have been logged out!
        {/* Back to  Login */}
        <div className="py-3 w-full text-center text-green-600 font-bold hover:text-lime-500">
          <a href="/">
            {" "}
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="pr-2"
            ></FontAwesomeIcon>
            Back to login{" "}
          </a>
        </div>
      </h1>
    </div>
  );
}
