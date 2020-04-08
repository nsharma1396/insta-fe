import React from "react";
import ServerError from "../assets/error.svg";

function LoadError() {
  return (
    <div className="load-error">
      <img src={ServerError} alt="something went wrong" />
      <h4>There was an error while loading the page.</h4>
    </div>
  );
}

export default LoadError;
