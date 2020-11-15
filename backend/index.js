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
      auth: true,
      entities: [
        {
          name: "username",
          required: true,
          unique: true,
          type: "String",
        },
        {
          name: "password",
          required: true,
          unique: false,
          type: "Number",
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
          type: "String",
        },
        {
          name: "productId",
          required: true,
          unique: false,
          type: "Number",
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
        if (filePath[filePath.length - 1] == "json") {
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
const createRoute = require("./utils/createRoute").createRoute;
const createApp = require("./utils/createApp").createApp;
const createServer = require("./utils/createServer").createServer;
const createConfig = require("./utils/createConfig").createConfig;
const createPackage = require("./utils/createPackage").createPackage;
const createMiddleWare = require("./utils/createMiddleware");

// CREATING ALL FILES(as of now just model file)
Object.keys(jsonData.schemas).forEach((schema) => {
  createModel(schema, projectPath, jsonData);
  createController(schema, projectPath, jsonData);
  createRoute(schema, projectPath, jsonData);
});

createApp(projectPath, jsonData);
createServer(projectPath);
createConfig(projectPath);
createPackage(projectPath, jsonData);
if (jsonData.schemas.Users && jsonData.schemas.Users.auth)
  createMiddleWare.createAuthMiddleware(projectPath, jsonData);
