import React from "react";
import "./LogoCard.css";

const LogoCard = (props) => {
  return (
    <div
      className="logo-card-container"
      onClick={!props.disabled ? () => props.onClick(props.value) : null}
    >
      <div className="logo-card">
        <div style={{ alignSelf: "center" }}>
          {props.selected ? props.selectedImage : props.unselectedImage}
        </div>
      </div>
      <div
        className="logocard-label"
        style={{
          color: props.selected ? props.selectedLabelColor : "#CECECE",
        }}
      >
        {props.label}
      </div>
    </div>
  );
};

export default LogoCard;
