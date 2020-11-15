import React from "react";
import SubHeading from "../subHeading/SubHeading";
import LogoCard from "../logoCard/LogoCard";
import "./LanguageSection.css";

const LanguageSection = (props) => {
  return (
    <>
      <SubHeading>Select a language</SubHeading>
      <div className="language-selection">
        {props.data.map((e) => {
          return (
            <LogoCard
              {...e}
              onClick={props.languageSelectionHandler}
            ></LogoCard>
          );
        })}
      </div>
    </>
  );
};

export default LanguageSection;
