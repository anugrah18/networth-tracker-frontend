import React from "react";

export default function Users(props) {
  const { User } = props;

  //Check for admin

  return (
    <div className="grid h-screen place-items-center text-2xl">
      <h2>User is Admin</h2>
    </div>
  );
}
