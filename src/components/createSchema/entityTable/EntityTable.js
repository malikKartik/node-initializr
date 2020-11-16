import React from "react";
import deleteIcon from "../../../assets/images/delete.png";
import editIcon from "../../../assets/images/edit.png";
import "./EntityTable.css";

const EntityTable = (props) => {
  return (
    <>
      <div className="entity-table">
        <div className="entity-table-header">
          <p>Entity Name</p>
        </div>
        <div className="entity-table-header">
          <p>Type</p>
        </div>
        <div className="entity-table-header">
          <p>Required</p>
        </div>
        <div className="entity-table-header">
          <p>Unique</p>
        </div>
        <div className="entity-table-header">
          <p>Actions</p>
        </div>
        {props.entities.map((entity) => {
          return (
            <>
              <div className="entity-table-row">
                <p>{entity.entityName}</p>
              </div>
              <div className="entity-table-row">
                <p>{entity.entityType}</p>
              </div>
              <div className="entity-table-row">
                <p>{entity.required.toString()}</p>
              </div>
              <div className="entity-table-row">
                <p>{entity.unique.toString()}</p>
              </div>
              <div className="entity-table-row">
                <img
                  src={deleteIcon}
                  alt="delete icon"
                  width="16px"
                  onClick={() => {
                    let temp = { ...props.currentSchema };
                    temp.entities = temp.entities.filter(
                      (tempEntity) =>
                        tempEntity.entityName !== entity.entityName
                    );
                    props.setCurrentSchema({
                      ...props.currentSchema,
                      entities: temp.entities,
                    });
                  }}
                />
                <img
                  src={editIcon}
                  alt="edit icon"
                  width="16px"
                  onClick={() => {
                    let temp = { ...props.currentSchema };
                    temp.entities = temp.entities.filter(
                      (tempEntity) =>
                        tempEntity.entityName !== entity.entityName
                    );
                    props.setCurrentSchema({
                      ...props.currentSchema,
                      entityName: entity.entityName,
                      entityType: entity.entityType,
                      required: entity.required,
                      unique: entity.unique,
                      entities: temp.entities,
                    });
                  }}
                />
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default EntityTable;
