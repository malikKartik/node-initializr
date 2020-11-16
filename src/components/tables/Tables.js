import React from "react";
import "./Tables.css";
import SubHeading from "../subHeading/SubHeading";
import deleteIcon from "../../assets/images/delete.png";
import editIcon from "../../assets/images/edit.png";
const Tables = (props) => {
  return (
    <>
      <SubHeading>Tables or Collections</SubHeading>
      {props.allSchemas.map((schema) => {
        return (
          <div>
            <SubHeading bold={true}>
              {schema.schemaName}{" "}
              <img
                src={deleteIcon}
                alt="deleteIcon"
                width="16px"
                style={{ marginRight: "20px", marginLeft: "10px" }}
                onClick={() => {
                  let temp = [...props.allSchemas];
                  temp = temp.filter(
                    (item) => item.schemaName !== schema.schemaName
                  );
                  props.setAllSchemas(temp);
                }}
              />
              <img
                src={editIcon}
                alt="edit icon"
                width="16px"
                onClick={() => {
                  let temp = [...props.allSchemas];
                  temp = temp.filter(
                    (item) => item.schemaName !== schema.schemaName
                  );
                  props.setAllSchemas(temp);
                  props.setCurrentSchema({
                    schemaName: schema.schemaName,
                    entityName: "",
                    entityType: "String",
                    required: false,
                    unique: false,
                    entities: schema.entities,
                  });
                }}
              />
            </SubHeading>
            <center>
              <div style={{ width: "80%" }}>
                <div className="entity-table-all">
                  <div className="entity-table-all-header">
                    <p>Entity Name</p>
                  </div>
                  <div className="entity-table-all-header">
                    <p>Type</p>
                  </div>
                  <div className="entity-table-all-header">
                    <p>Required</p>
                  </div>
                  <div className="entity-table-all-header">
                    <p>Unique</p>
                  </div>
                  {schema.entities.map((entity) => {
                    return (
                      <>
                        <div className="entity-table-all-row">
                          <p>{entity.entityName}</p>
                        </div>
                        <div className="entity-table-all-row">
                          <p>{entity.entityType}</p>
                        </div>
                        <div className="entity-table-all-row">
                          <p>{entity.required.toString()}</p>
                        </div>
                        <div className="entity-table-all-row">
                          <p>{entity.unique.toString()}</p>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </center>
          </div>
        );
      })}
      {props.allSchemas.length < 1 ? <center>No tables</center> : null}
    </>
  );
};

export default Tables;
