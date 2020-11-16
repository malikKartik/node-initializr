import React from "react";
import "./Package.css";

const Package = (props) => {
  return (
    <div
      className="package-card"
      style={{ border: props.selected ? "1px solid #F85F73" : "" }}
      onClick={!props.disabled ? () => props.onClick(props.value) : null}
    >
      <div
        className="package-card-title"
        style={{ color: props.selected ? "black" : "#A9A9A9" }}
      >
        {props.title}
      </div>
      <div
        className="package-card-description"
        style={{ color: props.selected ? "black" : "#7E7D7D" }}
      >
        {props.description}
      </div>
    </div>
  );
};

export default Package;
