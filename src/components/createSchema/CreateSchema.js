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
  }, [props.currentSchema.schemaName]);

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
          <p className="input-condition">*Default String</p>
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
          temp.push({
            schemaName: props.currentSchema.schemaName,
            entities: props.currentSchema.entities,
          });
          props.setAllSchemas(temp);
          props.setCurrentSchema({
            schemaName: "",
            entityName: "",
            entityType: "String",
            required: false,
            unique: false,
            entities: [],
          });
        }}
      >
        Add table
      </button>
    </>
  );
};

export default CreateSchema;
