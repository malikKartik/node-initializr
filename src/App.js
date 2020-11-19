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
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "./components/utils/Input";
import Label from "./components/utils/Label";
const App = () => {
  const [download, setDownload] = useState(null);
  const [regenKey, setRegenKey] = useState("");
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
      "server.js": null,
      "app.js": null,
      "package.json": null,
    },
    schemas: {},
    language: "node",
    database: "mongodb",
    env: {
      PORT: "",
      MONGODB_SRV: "",
      JWT_SECRET: "",
    },
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
      }
    });
    await setPackages(tempPackages);
    console.log(config);
  };

  return (
    <div style={{ marginLeft: "5%", marginRight: "5%" }}>
      <ToastContainer />
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
        packages={packages}
        setPackages={setPackages}
      ></CreateSchema>
      <SectionBreak></SectionBreak>
      <Tables
        allSchemas={allSchemas}
        setAllSchemas={setAllSchemas}
        currentSchema={currentSchema}
        setCurrentSchema={setCurrentSchema}
      ></Tables>
      <SectionBreak></SectionBreak>
      <EnvironmentVariables
        config={config}
        setConfig={setConfig}
      ></EnvironmentVariables>
      <SectionBreak></SectionBreak>
      <button
        className="button"
        onClick={() => {
          let finalObject = { ...config };
          let schemas = {};
          allSchemas.forEach((schema) => {
            schemas[schema.schemaName] = {};
            schemas[schema.schemaName].name = schema.schemaName;
            if (schema.schemaName === "Users") {
              schemas[schema.schemaName].auth = schema.auth ? true : false;
            }
            schemas[schema.schemaName].entities = schema.entities;
          });
          let finalPackages = [];
          packages
            .filter((p) => p.selected)
            .forEach((p) => {
              finalPackages.push(p.value);
            });
          finalObject = {
            ...finalObject,
            schemas: { ...schemas },
            packages: finalPackages,
          };
          console.log(finalObject);
          axios
            .post("http://localhost:8080/ninit", finalObject)
            .then((data) => {
              toast.success("Project created!", {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              setRegenKey(data.data.pkey);
              setDownload(`http://localhost:8080/${data.data.path}.zip`);
            })
            .catch((e) => {
              console.log(e);
            });
        }}
      >
        Generate
      </button>
      <br /> <p style={{ marginLeft: "40px", marginBottom: "0px" }}>OR</p>{" "}
      <br />
      <Input placeholder="Enter the regenration key!"></Input>
      <button className="button">Regenrate</button>
      {download ? (
        <>
          <br />
          <button onClick={() => window.open(download)} className="button">
            Download
          </button>
          <br />
          <button
            className="button"
            onClick={() => {
              navigator.clipboard.writeText(regenKey).then(() => {
                toast.success("Copied to clipboard!", {
                  position: "top-left",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              });
            }}
          >
            Click to copy regenration key!
          </button>
          <Label>
            *You can use this key to regenrate the same project later!
          </Label>
        </>
      ) : null}
      <SectionBreak></SectionBreak>
    </div>
  );
};

export default App;
