import React, { useState } from "react";
import "./App.css";

const App = () => {
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
  });

  const [table, setTable] = useState({ name: "", entities: [] });
  const [entity, setEntity] = useState({
    name: "",
    required: false,
    unique: false,
  });
  const [tables, setTables] = useState([]);

  return (
    <div className="App">
      <div className="config-display">
        <div>
          <h3>Select Language:</h3>
          <div
            className="to-select"
            onClick={() => setConfig({ ...config, languge: "node" })}
          >
            Nodejs
          </div>
        </div>
        <div>
          <h3>Select a library:</h3>
          <div
            className="to-select"
            onClick={() => setConfig({ ...config, framework: "express" })}
          >
            Express
          </div>
        </div>
        <div>
          <h3>Create schema:</h3>
          <br />
          {/* TODO: Check for collection name, it should be plural */}
          <label>Collection or table name:</label>
          <input
            type="text"
            value={table.name}
            onChange={(e) => setTable({ ...table, name: e.target.value })}
          />
          <br />
          <label>Entity name:</label>
          <input
            type="text"
            value={entity.name}
            onChange={(e) => setEntity({ ...entity, name: e.target.value })}
          />
          <br />

          {/* TODO: Add entity type select as dropdown */}
          <label>Required: </label>
          <input
            type="checkbox"
            checked={entity.required}
            onChange={(e) =>
              setEntity({ ...entity, required: e.target.checked })
            }
          />
          <label>Unique: </label>
          <input
            type="checkbox"
            checked={entity.unique}
            onChange={(e) => setEntity({ ...entity, unique: e.target.checked })}
          />

          <br />
          <button
            onClick={() => {
              let tempTable = { ...table };
              tempTable.entities.push(entity);
              setTable(tempTable);
              setEntity({
                name: "",
                required: false,
                unique: false,
              });
            }}
          >
            +
          </button>
          <br />
          <button
            onClick={() => {
              let tempTables = [...tables];
              tempTables.push(table);
              setTables(tempTables);
              setConfig({
                ...config,
                schemas: { ...config.schemas, [table.name]: table },
              });
              setTable({ name: "", entities: [] });
            }}
          >
            +
          </button>
        </div>
        <pre>{JSON.stringify(config, null, 4)}</pre>
      </div>
    </div>
  );
};

export default App;
