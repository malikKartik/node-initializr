import React from "react";
import "./EnvironmentVariable.css";
import SubHeading from "../subHeading/SubHeading";
import Label from "../utils/Label";
import Input from "../utils/Input";

const EnvironmentVariable = (props) => {
  return (
    <>
      <SubHeading>Environment Variables</SubHeading>
      <div className="environment-variable-form-grid">
        <Label>PORT:</Label>
        <div>
          <Input
            placeholder="Enter PORT"
            value={props.config.env.PORT}
            onChange={(e) => {
              let temp = { ...props.config };
              temp.env.PORT = e.target.value;
              props.setConfig({ ...temp });
            }}
          />
          <p className="environment-variable-input-condition">*Default 3001</p>
        </div>
        <Label>MONGODB_SRV:</Label>
        <div>
          <Input
            placeholder="Enter MONGODB_SRV"
            value={props.config.env.MONGODB_SRV}
            onChange={(e) => {
              let temp = { ...props.config };
              temp.env.MONGODB_SRV = e.target.value;
              props.setConfig({ ...temp });
            }}
          />
          <p className="environment-variable-input-condition">
            *No default value
          </p>
        </div>
        <Label>JWT_SECRET:</Label>
        <div>
          <Input
            placeholder="Enter JWT_SECRET"
            value={props.config.env.JWT_SECRET}
            onChange={(e) => {
              let temp = { ...props.config };
              temp.env.JWT_SECRET = e.target.value;
              props.setConfig({ ...temp });
            }}
          />
          <p className="environment-variable-input-condition">
            *Dafault value is "key"
          </p>
        </div>
      </div>
    </>
  );
};

export default EnvironmentVariable;
