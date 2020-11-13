const pluralize = require("pluralize");
const beautify = require("js-beautify").js;
const fs = require("fs");

exports.createApp = (projectPath, jsonData) => {
  const appPath = `${projectPath}/app.js`;
  let imports = "";
  let routes = "";
  Object.keys(jsonData.schemas).forEach((schema) => {
    const schemaName = pluralize.singular(schema).toLocaleLowerCase();
    imports =
      imports +
      `const ${schemaName}Routes = require("./src/routes/${schemaName}.routes.js")\n`;
    routes = routes + `app.use("/api/${schemaName}s", ${schemaName}Routes);\n`;
  });

  const appContent = `
    const express = require("express");
const mongoose = require("mongoose");
const { MONGO_URI } = require("./src/config/mongodb");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Set-Cookie,Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Credentials", true);
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
      return res.status(200).json({});
    }
    next();
  });

//Importing routes
  ${imports}
//Routes
  ${routes}
  app.use((req, res, next) => {
    const error = new Error("Not found!");
    error.status = 404;
    next(error);
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message,
      },
    });
  });
  
  module.exports = app;
    `;

  fs.writeFileSync(
    appPath,
    beautify(appContent, {
      indent_size: 2,
      space_in_empty_paren: true,
    })
  );
};
