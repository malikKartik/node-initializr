import React, { useState } from "react";
import SubHeading from "../subHeading/SubHeading";
import Package from "./package/Package";
import "./PackageSection.css";
import previous from "../../assets/images/previous.svg";
import next from "../../assets/images/next.svg";

const PackageSection = (props) => {
  const sideScroll = (element, direction, speed, distance, step) => {
    let scrollAmount = 0;
    let slideTimer = setInterval(() => {
      if (direction == "left") {
        element.scrollLeft -= step;
      } else {
        element.scrollLeft += step;
      }
      scrollAmount += step;
      if (scrollAmount >= distance) {
        window.clearInterval(slideTimer);
      }
    }, speed);
  };

  const nextScrollHandler = () => {
    const el = document.querySelector(".package-section-content");
    sideScroll(el, "right", 25, 260, 15);
  };
  const previousScrollHandler = () => {
    const el = document.querySelector(".package-section-content");
    sideScroll(el, "left", 25, 260, 15);
  };
  return (
    <div className="package-section-container">
      <SubHeading>Select packages</SubHeading>
      <div className="slider-previous" onClick={previousScrollHandler}>
        <img style={{ width: "50px" }} src={previous}></img>
      </div>
      <div className="package-section-content">
        {props.data.map((e) => {
          return (
            <Package {...e} onClick={props.packageSelectionHandler}></Package>
          );
        })}
      </div>
      <div className="slider-next" onClick={nextScrollHandler}>
        <img style={{ width: "50px" }} src={next}></img>
      </div>
    </div>
  );
};

export default PackageSection;
