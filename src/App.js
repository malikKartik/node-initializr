import React, { useState } from "react";
import "./App.css";
import CentralHeading from "./components/centralHeading/CentralHeading";
import LanguageSection from "./components/languageSection/LanguageSection";
import SectionBreak from "./components/sectionBreak/SectionBreak";
import DatabaseSection from "./components/databaseSection/DatabaseSection";
import PackageSection from "./components/packageSection/PackageSection";
import CreateSchema from "./components/createSchema/CreateSchema";
import Tables from "./components/tables/Tables";
import EnvironmentVariables from "./components/environmentVariable/EnvironmentVariable";
import nodejsActive from "./assets/images/nodejsActive.svg";
import nodejsInactive from "./assets/images/nodejsInactive.svg";
import javaInactive from "./assets/images/javaInactive.svg";
const App = () => {
  const [languages, setLanguages] = useState([
    {
      label: "Node.js",
      selectedImage: <img src={nodejsActive}></img>,
      unselectedImage: <img src={nodejsInactive}></img>,
      disabled: true,
      selectedLabelColor: "#539E43",
      selected: true,
      value: "node",
    },
    {
      label: "Coming soon...",
      selectedImage: "",
      unselectedImage: <img src={javaInactive}></img>,
      disabled: true,
      selectedLabelColor: "",
      selected: false,
      value: "java",
    },
  ]);
  const [config, setConfig] = useState({
    structure: {
      src: {
        controllers: {},
        config: {},
        middlewares: {},
        models: {},
        routes: {},
      },
    },
    "server.js": null,
    "app.js": null,
    "package.json": null,
    schemas: {},
    language: "node",
    database: "mongodb",
    packages: ["express", "mongoose"],
  });

  const [packages, setPackages] = useState([
    {
      title: "Express",
      description: `Fast, unopinionated, minimalist web framework for node.`,
      value: "express",
      selected: true,
      disabled: true,
    },
    {
      title: "Mongoose",
      description: "Mongoose is a MongoDB object modeling tool.",
      value: "mongoose",
      selected: true,
      disabled: true,
    },
    {
      title: "Bcrypt",
      description: "A library to help you hash passwords.",
      value: "bcrypt",
      selected: false,
      disabled: false,
    },
    {
      title: "JWT",
      description: "An implementation of JSON Web Tokens.",
      value: "jsonwebtoken",
      selected: false,
      disabled: false,
    },
    {
      title: "Axios",
      description: "Promise based HTTP client for the browser and node.js.",
      value: "axios",
      selected: false,
      disabled: false,
    },
    {
      title: "UUID",
      description: "For the creation of RFC4122 UUIDs",
      value: "uuid",
      selected: false,
      disabled: false,
    },
    {
      title: "Yargs",
      description:
        "Yargs be a node.js library fer hearties tryin' ter parse optstrings",
      value: "yargs",
      selected: false,
      disabled: false,
    },
  ]);

  const [currentSchema, setCurrentSchema] = useState({
    schemaName: "",
    entityName: "",
    entityType: "String",
    required: false,
    unique: false,
    entities: [],
  });

  const [allSchemas, setAllSchemas] = useState([]);

  const languageSelectionHandler = (value) => {
    let tempLanguages = [...languages];
    tempLanguages.forEach((language) => {
      if (language.value === value) {
        language.selected = !language.selected;
        if (language.selected)
          setConfig({
            ...config,
            language: value,
          });
      }
    });
    setLanguages(tempLanguages);
  };

  const packageSelectionHandler = async (value) => {
    let tempPackages = [...packages];
    await tempPackages.forEach((pack) => {
      if (pack.value === value) {
        pack.selected = !pack.selected;
        if (pack.selected)
          setConfig({
            ...config,
            packages: config.packages.concat(value),
          });
        else {
          let toBeSpliced = [...config.packages];
          let index = config.packages.indexOf(value);
          if (index !== -1) {
            toBeSpliced.splice(index, 1);
            setConfig({
              ...config,
              packages: toBeSpliced,
            });
          }
        }
      }
    });
    await setPackages(tempPackages);
    console.log(config);
  };

  return (
    <div style={{ marginLeft: "5%", marginRight: "5%" }}>
      <CentralHeading></CentralHeading>
      <SectionBreak></SectionBreak>
      <LanguageSection
        data={languages}
        languageSelectionHandler={languageSelectionHandler}
      ></LanguageSection>
      <SectionBreak></SectionBreak>
      <DatabaseSection></DatabaseSection>
      <SectionBreak></SectionBreak>
      <PackageSection
        data={packages}
        packageSelectionHandler={packageSelectionHandler}
      ></PackageSection>
      <SectionBreak></SectionBreak>
      {/* {JSON.stringify(config.packages)} */}
      <CreateSchema
        currentSchema={currentSchema}
        setCurrentSchema={setCurrentSchema}
        allSchemas={allSchemas}
        setAllSchemas={setAllSchemas}
      ></CreateSchema>
      <SectionBreak></SectionBreak>
      <Tables
        allSchemas={allSchemas}
        setAllSchemas={setAllSchemas}
        currentSchema={currentSchema}
        setCurrentSchema={setCurrentSchema}
      ></Tables>
      <SectionBreak></SectionBreak>
      <EnvironmentVariables></EnvironmentVariables>
      <SectionBreak></SectionBreak>
      <SectionBreak></SectionBreak>
    </div>
  );
};

export default App;
