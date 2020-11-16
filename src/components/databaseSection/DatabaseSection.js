import React from "react";
import SubHeading from "../subHeading/SubHeading";
import LogoCard from "../logoCard/LogoCard";
import "./DatabaseSection.css";
import mongodbActive from "../../assets/images/mongodbActive.svg";
import mongodbInactive from "../../assets/images/mongodbInactive.svg";
import mysqlInactive from "../../assets/images/mysqlInactive.svg";
import postgreInactive from "../../assets/images/postgreInactive.svg";

const data = [
  {
    label: "MongoDB",
    selectedImage: <img src={mongodbActive}></img>,
    unselectedImage: <img src={mongodbInactive}></img>,
    disabled: true,
    selectedLabelColor: "#499D4A",
    selected: true,
    value: "mongodb",
  },
  {
    label: "Coming soon...",
    selectedImage: "",
    unselectedImage: <img src={mysqlInactive}></img>,
    disabled: true,
    selectedLabelColor: "",
    selected: false,
    value: "mysql",
  },
  {
    label: "Coming soon...",
    selectedImage: "",
    unselectedImage: <img src={postgreInactive}></img>,
    disabled: true,
    selectedLabelColor: "",
    selected: false,
    value: "postgres",
  },
];

const DatabaseSection = (props) => {
  return (
    <>
      <SubHeading>Select a database</SubHeading>
      <div className="language-selection">
        {data.map((e) => {
          return <LogoCard {...e}></LogoCard>;
        })}
      </div>
    </>
  );
};

export default DatabaseSection;
