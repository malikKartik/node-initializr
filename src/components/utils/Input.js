import React from "react";
import "./utils.css";
const Input = (props) => {
  return (
    <>
      <input
        type="text"
        className="utils-input"
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
      />
    </>
  );
};

export default Input;
