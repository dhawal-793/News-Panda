import React from "react";
// import ClipLoader from "react-spinners/ClipLoader";
import loading from "../gifs/Spinner_black_3.gif";

const Loading = () => {
  return (
    <div className="text-center">
      <img src={loading} alt="Loading" />
      {/* <ClipLoader color="black" loading="true"  size={50} /> */}
    </div>
  );
};
export default Loading;
