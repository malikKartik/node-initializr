import React from "react";
import "./SubHeading.css";

const SubHeading = (props) => {
  return (
    <div className={props.bold ? "sub-heading-bold" : "sub-heading"}>
      {props.children}
    </div>
  );
};

export default SubHeading;
