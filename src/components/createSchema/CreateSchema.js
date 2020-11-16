import React from "react";
import SubHeading from "../subHeading/SubHeading";
import Label from "../utils/Label";
import Input from "../utils/Input";
import "./CreateSchema.css";
import cross from "../../assets/images/close.png";
import tick from "../../assets/images/tick.png";
import pluralize from "pluralize";
const CreateSchema = (props) => {
  const isTableNameCorrect = (name) => {
    if (!name) return false;
    if (pluralize.isPlural(name) && /^\S*$/.test(name) && /^[A-Z]/.test(name))
      return true;
    else return false;
  };
  return (
    <>
      <SubHeading>Create Schema</SubHeading>
      <div className="create-schema-form-grid">
        <Label>Collection or table name:</Label>
        <div>
          <Input
            placeholder="Enter name eg: Users"
            value={props.tableName}
            onChange={props.tableNameOnChange}
          />
          {isTableNameCorrect(props.tableName) ? (
            <img src={tick} alt="tick" width="12px" />
          ) : (
            <img src={cross} alt="cross" width="12px" />
          )}
        </div>
        <Label>Entity name:</Label>
        <div>
          <Input placeholder="Enter name eg: email" />
        </div>
        <Label>Entity type:</Label>
        <div>
          <Input />
        </div>
      </div>
    </>
  );
};

export default CreateSchema;
