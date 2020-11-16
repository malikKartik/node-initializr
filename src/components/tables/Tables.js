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
                width="20px"
                style={{ marginRight: "20px", marginLeft: "10px" }}
              />
              <img src={editIcon} alt="edit icon" width="20px" />
            </SubHeading>
            <div>
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
          </div>
        );
      })}
    </>
  );
};

export default Tables;
