const pluralize = require("pluralize");
const beautify = require("js-beautify").js;

const jsonData = {
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
  schemas: {
    Users: {
      name: "Users",
      entities: [
        {
          name: "username",
          required: true,
          unique: true,
        },
        {
          name: "password",
          required: true,
          unique: false,
        },
      ],
    },
    Orders: {
      name: "Orders",
      entities: [
        {
          name: "orderId",
          required: true,
          unique: true,
        },
        {
          name: "productId",
          required: true,
          unique: false,
        },
      ],
    },
  },
  languge: "node",
};

// CREATING DIRECTORIES
var fs = require("fs");

const mkdirs = (obj, path) => {
  if (obj) {
    Object.keys(obj).forEach((key) => {
      let tempPath = path + `/${key}`;
      if (key.split(".").length == 1) {
        if (!fs.existsSync(tempPath)) {
          fs.mkdirSync(tempPath);
        }
        mkdirs(obj[key], tempPath);
      } else {
        const filePath = key.split(".");
        if (filePath[filePath.length - 1] == "js") {
          fs.writeFileSync(tempPath);
        }
      }
    });
  }
  return;
};

const projectPath = "./newProject";
if (!fs.existsSync(projectPath)) {
  fs.mkdirSync(projectPath);
}
mkdirs(jsonData.structure, projectPath);

// CREATING ALL FILES(as of now just model file)
Object.keys(jsonData.schemas).forEach((schema) => {
  const schemaName = pluralize.singular(schema).toLocaleLowerCase();
  const schemaPath = `${projectPath}/src/models/${schemaName}.model.js`;

  // Defining entities for the schema
  let entities = "";
  jsonData.schemas[schema].entities.forEach((entity) => {
    entities =
      entities +
      `${entity.name}:{type: String,required:${entity.required},unique:${entity.unique}},`;
  });

  // File content
  const fileContent = `const mongoose = require('mongoose')

    const ${schemaName}Schema = mongoose.Schema({
        _id:mongoose.Schema.Types.ObjectId,
        ${entities}
    })

    module.exports = mongoose.model('${
      schemaName.charAt(0).toUpperCase() + schemaName.slice(1)
    }',${schemaName}Schema)`;

  // Writing to the file
  fs.writeFileSync(
    schemaPath,
    beautify(fileContent, { indent_size: 2, space_in_empty_paren: true })
  );
});
