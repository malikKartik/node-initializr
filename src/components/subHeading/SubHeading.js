import React from "react";
import "./SubHeading.css";

const SubHeading = (props) => {
  return <div className="sub-heading">{props.children}</div>;
};

export default SubHeading;
