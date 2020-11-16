import React from "react";
import "./utils.css";
const Input = (props) => {
  return (
    <>
      <input
        type="text"
        className="utils-input"
        placeholder={props.placeholder}
      />
    </>
  );
};

export default Input;
