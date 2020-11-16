import React, { useRef } from "react";
import SubHeading from "../subHeading/SubHeading";
import Package from "./package/Package";
import "./PackageSection.css";
import previous from "../../assets/images/previous.svg";
import next from "../../assets/images/next.svg";

const PackageSection = (props) => {
  const el = useRef();
  const container = useRef();

  const nextScrollHandler = () => {
    console.log(container.current.scrollWidth);
    el.current.scrollLeft += 260;
  };
  const previousScrollHandler = () => {
    el.current.scrollLeft -= 260;
  };
  return (
    <div className="package-section-container" ref={container}>
      <SubHeading>Select packages</SubHeading>
      <div className="slider-previous" onClick={previousScrollHandler}>
        <img style={{ width: "30px" }} src={previous} alt="prev"></img>
      </div>
      <div className="package-section-content" ref={el}>
        {props.data.map((e) => {
          return (
            <Package {...e} onClick={props.packageSelectionHandler}></Package>
          );
        })}
      </div>
      <div className="slider-next" onClick={nextScrollHandler}>
        <img style={{ width: "30px" }} src={next} alt="next"></img>
      </div>
    </div>
  );
};

export default PackageSection;
