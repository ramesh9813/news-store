import React from "react";

const Loader = ({ text = "Loading" }) => {
  return (
    <div className="loader">
      <div className="loader__dots">
        <span className="loader__dot"></span>
        <span className="loader__dot"></span>
        <span className="loader__dot"></span>
      </div>
      {text && <p className="loader__text">{text}</p>}
    </div>
  );
};

export default Loader;
