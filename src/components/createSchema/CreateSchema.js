import React, { useState, useEffect } from "react";
import SubHeading from "../subHeading/SubHeading";
import Label from "../utils/Label";
import Input from "../utils/Input";
import "./CreateSchema.css";
import cross from "../../assets/images/close.png";
import tick from "../../assets/images/tick.png";
import pluralize from "pluralize";
import EntityTable from "./entityTable/EntityTable";
import SectionBreak from "../sectionBreak/SectionBreak";
import { toast } from "react-toastify";
const CreateSchema = (props) => {
  const [isTableNameCorrect, setIsTableNameCorrect] = useState(false);
  const isTableNameCorrectFunc = (name) => {
    if (!name) return;
    if (
      name.length > 0 &&
      pluralize.isPlural(name) &&
      /^\S*$/.test(name) &&
      /^[A-Z]/.test(name)
    )
      setIsTableNameCorrect(true);
    else setIsTableNameCorrect(false);
  };

  useEffect(() => {
    isTableNameCorrectFunc(props.currentSchema.schemaName);
    checkForAuthHandler();
    props.setCurrentSchema({
      ...props.currentSchema,
      auth: props.auth,
    });
  }, [props.currentSchema.schemaName]);

  const removeAuth = () => {
    const temp = { ...props.currentSchema };
    delete temp.auth;
    props.setCurrentSchema(temp);
  };

  const routeProtectionHandler = (e) => {
    let tempSchema = { ...props.currentSchema };
    tempSchema.routes[e.target.name].protected = e.target.checked;
    props.setCurrentSchema(tempSchema);
  };

  const checkForAuthHandler = () => {
    let found = false;
    if (props.currentSchema.schemaName === "Users") {
      props.setAuth(props.currentSchema.auth);
      return;
    }
    props.allSchemas.forEach((schema) => {
      if (schema.schemaName === "Users") {
        found = true;
        props.setAuth(schema.auth);
      }
    });
    if (!found) props.setAuth(false);
  };
  return (
    <>
      <SubHeading>Create Schema</SubHeading>
      <div className="create-schema-form-grid">
        <Label>Collection or table name:</Label>
        <div>
          <Input
            placeholder="Enter name eg: Users"
            value={props.currentSchema.schemaName}
            onChange={(e) => {
              props.setCurrentSchema({
                ...props.currentSchema,
                schemaName: e.target.value,
              });
            }}
          />
          {isTableNameCorrect ? (
            <img
              src={tick}
              alt="tick"
              width="12px"
              className="create-schema-icon"
            />
          ) : (
            <img
              src={cross}
              alt="cross"
              width="12px"
              className="create-schema-icon"
            />
          )}
          <p className="input-condition">
            *Required and collection name must start with a capital letter and
            should be plural.
          </p>
        </div>
        {props.currentSchema.schemaName === "Users" ? (
          <>
            <Label>Enable Authentication:</Label>
            <div>
              <input
                type="checkbox"
                checked={props.currentSchema.auth ? true : false}
                onChange={(e) => {
                  if (e.target.checked) {
                    toast.info("Email and password have been added!");
                    let temp = [...props.packages];
                    for (let i = 0; i < temp.length; i++) {
                      if (
                        temp[i].value === "bcrypt" ||
                        temp[i].value === "jsonwebtoken"
                      ) {
                        temp[i] = {
                          ...temp[i],
                          selected: true,
                          disabled: true,
                        };
                      }
                    }
                    console.log(temp);
                    props.setPackages(temp);
                    props.setAuth(true);
                    temp = [...props.currentSchema.entities];
                    if (
                      temp.filter(
                        (item) =>
                          item.entityName === "email" ||
                          item.entityName === "password"
                      ).length === 0
                    ) {
                      props.setCurrentSchema({
                        ...props.currentSchema,
                        entities: [
                          ...props.currentSchema.entities,
                          {
                            entityName: "email",
                            entityType: "String",
                            required: true,
                            unique: true,
                          },
                          {
                            entityName: "password",
                            entityType: "String",
                            required: true,
                            unique: true,
                          },
                        ],
                        auth: e.target.checked,
                      });
                    } else {
                      props.setCurrentSchema({
                        ...props.currentSchema,
                        auth: e.target.checked,
                      });
                    }
                  } else {
                    let temp = [...props.packages];
                    for (let i = 0; i < temp.length; i++) {
                      if (
                        temp[i].value === "bcrypt" ||
                        temp[i].value === "jsonwebtoken"
                      ) {
                        temp[i] = {
                          ...temp[i],
                          selected: false,
                          disabled: false,
                        };
                      }
                    }
                    console.log(temp);
                    props.setPackages(temp);
                    props.setAuth(false);
                    props.setCurrentSchema({
                      ...props.currentSchema,
                      auth: e.target.checked,
                    });
                  }
                }}
              />
              <p
                className="input-condition"
                style={{ marginLeft: "20px", width: "300px" }}
              >
                *For authentication to work you must add "email" ( required:
                true, unique:true ) and "password"( required: true ) entity.
              </p>
            </div>
          </>
        ) : (
          <>{removeAuth}</>
        )}
        <Label>Entity name:</Label>
        <div>
          <Input
            placeholder="Enter name eg: email"
            value={props.currentSchema.entityName}
            onChange={(e) => {
              props.setCurrentSchema({
                ...props.currentSchema,
                entityName: e.target.value,
              });
            }}
          />
          {props.currentSchema.entityName.length > 0 ? (
            <img
              src={tick}
              alt="tick"
              width="12px"
              className="create-schema-icon"
            />
          ) : (
            <img
              src={cross}
              alt="cross"
              width="12px"
              className="create-schema-icon"
            />
          )}
          <p className="input-condition">*Required.</p>
        </div>

        <Label>Entity type:</Label>
        <div>
          <Label>String</Label>
          <input
            type="radio"
            name="entityType"
            checked={props.currentSchema.entityType === "String" ? true : false}
            onChange={(e) => {
              props.setCurrentSchema({
                ...props.currentSchema,
                entityType: "String",
              });
            }}
            className="create-schema-radio"
          />
          <Label>Number</Label>
          <input
            type="radio"
            checked={props.currentSchema.entityType === "Number" ? true : false}
            onChange={(e) => {
              props.setCurrentSchema({
                ...props.currentSchema,
                entityType: "Number",
              });
            }}
            className="create-schema-radio"
            name="entityType"
          />
          <Label>Boolean</Label>
          <input
            type="radio"
            checked={
              props.currentSchema.entityType === "Boolean" ? true : false
            }
            onChange={(e) => {
              props.setCurrentSchema({
                ...props.currentSchema,
                entityType: "Boolean",
              });
            }}
            className="create-schema-radio"
            name="entityType"
          />
          <p className="input-condition">*Default value is String</p>
        </div>
        <Label>Required:</Label>
        <div>
          <input
            type="checkbox"
            checked={props.currentSchema.required}
            onChange={(e) => {
              props.setCurrentSchema({
                ...props.currentSchema,
                required: e.target.checked,
              });
            }}
          />
        </div>
        <Label>Unique:</Label>
        <div>
          <input
            type="checkbox"
            checked={props.currentSchema.unique}
            onChange={(e) => {
              props.setCurrentSchema({
                ...props.currentSchema,
                unique: e.target.checked,
              });
            }}
          />
        </div>
      </div>

      <SectionBreak></SectionBreak>
      <button
        className="button"
        onClick={() => {
          if (
            !props.currentSchema.entityName ||
            !props.currentSchema.schemaName
          )
            return;
          let temp = [...props.currentSchema.entities];
          if (
            temp.filter(
              (item) => item.entityName === props.currentSchema.entityName
            ).length > 0
          ) {
            toast.error("An entity with this name already exists!");
            return;
          }
          temp.push({
            entityName: props.currentSchema.entityName,
            entityType: props.currentSchema.entityType,
            required: props.currentSchema.required,
            unique: props.currentSchema.unique,
          });
          props.setCurrentSchema({
            ...props.currentSchema,
            entityName: "",
            entityType: "String",
            required: false,
            unique: false,
            entities: temp,
          });
        }}
      >
        Add entity
      </button>
      <SectionBreak></SectionBreak>
      <EntityTable
        entities={props.currentSchema.entities}
        currentSchema={props.currentSchema}
        setCurrentSchema={props.setCurrentSchema}
      ></EntityTable>

      <SectionBreak></SectionBreak>
      {props.currentSchema.schemaName && props.auth ? (
        <>
          <SubHeading>Select the routes you want to protect.</SubHeading>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "minmax(100px, max-content) minmax(100px, max-content) minmax(100px, max-content) minmax(100px, max-content)",
            }}
          >
            <Label>
              GET /api/{props.currentSchema.schemaName.toLowerCase()}
            </Label>{" "}
            <Label>
              <center>-</center>
            </Label>{" "}
            <Label>
              To get all {props.currentSchema.schemaName.toLowerCase()}
            </Label>
            <div style={{ paddingTop: "5px" }}>
              <input
                type="checkbox"
                name="read"
                id=""
                onChange={routeProtectionHandler}
                checked={props.currentSchema.routes.read.protected}
              />
            </div>
            <Label>
              GET /api/{props.currentSchema.schemaName.toLowerCase()}/:id
            </Label>{" "}
            <Label>
              <center>-</center>
            </Label>{" "}
            <Label>
              To get{" "}
              {pluralize.singular(props.currentSchema.schemaName.toLowerCase())}{" "}
              by Id
            </Label>
            <div style={{ paddingTop: "5px" }}>
              <input
                type="checkbox"
                name="readById"
                id=""
                onChange={routeProtectionHandler}
                checked={props.currentSchema.routes.readById.protected}
              />
            </div>
            {props.currentSchema.schemaName !== "Users" ? (
              <>
                <Label>
                  POST /api/{props.currentSchema.schemaName.toLowerCase()}
                </Label>{" "}
                <Label>
                  <center>-</center>
                </Label>{" "}
                <Label>
                  To create a{" "}
                  {pluralize.singular(
                    props.currentSchema.schemaName.toLowerCase()
                  )}
                </Label>
                <div style={{ paddingTop: "5px" }}>
                  <input
                    type="checkbox"
                    name="create"
                    id=""
                    onChange={routeProtectionHandler}
                    checked={props.currentSchema.routes.create.protected}
                  />
                </div>
              </>
            ) : null}
            <Label>
              DELETE /api/{props.currentSchema.schemaName.toLowerCase()}/:id
            </Label>{" "}
            <Label>
              <center>-</center>
            </Label>{" "}
            <Label>
              To remove a{" "}
              {pluralize.singular(props.currentSchema.schemaName.toLowerCase())}
            </Label>
            <div style={{ paddingTop: "5px" }}>
              <input
                type="checkbox"
                name="delete"
                id=""
                onChange={routeProtectionHandler}
                checked={props.currentSchema.routes.delete.protected}
              />
            </div>
            <Label>
              PATCH /api/{props.currentSchema.schemaName.toLowerCase()}
            </Label>{" "}
            <Label>
              <center>-</center>
            </Label>{" "}
            <Label>
              To update a{" "}
              {pluralize.singular(props.currentSchema.schemaName.toLowerCase())}
            </Label>
            <div style={{ paddingTop: "5px" }}>
              <input
                type="checkbox"
                name="update"
                id=""
                onChange={routeProtectionHandler}
                checked={props.currentSchema.routes.update.protected}
              />
            </div>
          </div>
        </>
      ) : null}
      <br />
      <SectionBreak></SectionBreak>
      <button
        className="button"
        onClick={() => {
          let temp = [...props.allSchemas];
          if (
            temp.filter(
              (item) => item.schemaName === props.currentSchema.schemaName
            ).length > 0
          ) {
            return;
          }
          if (props.currentSchema.schemaName === "Users") {
            temp.push({
              schemaName: props.currentSchema.schemaName,
              entities: props.currentSchema.entities,
              auth: props.currentSchema.auth,
              routes: props.currentSchema.routes,
            });
          } else {
            temp.push({
              schemaName: props.currentSchema.schemaName,
              entities: props.currentSchema.entities,
              routes: props.currentSchema.routes,
            });
          }
          props.setAllSchemas(temp);
          props.setCurrentSchema({
            schemaName: "",
            entityName: "",
            auth: false,
            entityType: "String",
            required: false,
            unique: false,
            entities: [],
            routes: {
              create: {
                present: true,
                protected: false,
              },
              read: {
                present: true,
                protected: false,
              },
              readById: {
                present: true,
                protected: false,
              },
              update: {
                present: true,
                protected: false,
              },
              delete: {
                present: true,
                protected: false,
              },
            },
          });
        }}
      >
        Add table
      </button>
    </>
  );
};

export default CreateSchema;
