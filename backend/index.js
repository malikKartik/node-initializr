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

const createModel = require("./utils/createModel").createModel;
const createController = require("./utils/createController").createController;
// CREATING ALL FILES(as of now just model file)
Object.keys(jsonData.schemas).forEach((schema) => {
  createModel(schema, projectPath, jsonData);
  createController(schema, projectPath, jsonData);
});
