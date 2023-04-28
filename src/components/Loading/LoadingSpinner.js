import React, { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function LoadingSpinner() {
  return (
    <div className="block mx-auto my-52 min-h-screen min-w-screen">
      <ClipLoader
        color="#059669"
        loading={true}
        size={200}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
